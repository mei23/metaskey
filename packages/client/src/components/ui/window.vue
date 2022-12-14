<template>
<transition :name="$store.state.animation ? 'window' : ''" appear @after-leave="$emit('closed')">
	<div v-if="showing" class="ebkgocck">
		<div class="body _window _shadow _narrow_" @mousedown="onBodyMousedown" @keydown="onKeydown">
			<div class="header" :class="{ mini }" @contextmenu.prevent.stop="onContextmenu">
				<span class="left">
					<slot name="headerLeft"></slot>
				</span>
				<span class="title" @mousedown.prevent="onHeaderMousedown" @touchstart.prevent="onHeaderMousedown">
					<slot name="header"></slot>
				</span>
				<span class="right">
					<slot name="headerRight"></slot>
					<button v-if="closeButton" class="_button" @click="close()"><i class="fas fa-times"></i></button>
				</span>
			</div>
			<div v-if="padding" class="body">
				<div class="_section">
					<slot></slot>
				</div>
			</div>
			<div v-else class="body">
				<slot></slot>
			</div>
		</div>
		<template v-if="canResize">
			<div class="handle top" @mousedown.prevent="onTopHandleMousedown"></div>
			<div class="handle right" @mousedown.prevent="onRightHandleMousedown"></div>
			<div class="handle bottom" @mousedown.prevent="onBottomHandleMousedown"></div>
			<div class="handle left" @mousedown.prevent="onLeftHandleMousedown"></div>
			<div class="handle top-left" @mousedown.prevent="onTopLeftHandleMousedown"></div>
			<div class="handle top-right" @mousedown.prevent="onTopRightHandleMousedown"></div>
			<div class="handle bottom-right" @mousedown.prevent="onBottomRightHandleMousedown"></div>
			<div class="handle bottom-left" @mousedown.prevent="onBottomLeftHandleMousedown"></div>
		</template>
	</div>
</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import contains from '@/scripts/contains';
import * as os from '@/os';

const minHeight = 50;
const minWidth = 250;

function dragListen(fn) {
	window.addEventListener('mousemove',  fn);
	window.addEventListener('touchmove',  fn);
	window.addEventListener('mouseleave', dragClear.bind(null, fn));
	window.addEventListener('mouseup',    dragClear.bind(null, fn));
	window.addEventListener('touchend',   dragClear.bind(null, fn));
}

function dragClear(fn) {
	window.removeEventListener('mousemove',  fn);
	window.removeEventListener('touchmove',  fn);
	window.removeEventListener('mouseleave', dragClear);
	window.removeEventListener('mouseup',    dragClear);
	window.removeEventListener('touchend',   dragClear);
}

export default defineComponent({
	provide: {
		inWindow: true
	},

	props: {
		padding: {
			type: Boolean,
			required: false,
			default: false
		},
		initialWidth: {
			type: Number,
			required: false,
			default: 400
		},
		initialHeight: {
			type: Number,
			required: false,
			default: null
		},
		canResize: {
			type: Boolean,
			required: false,
			default: false,
		},
		closeButton: {
			type: Boolean,
			required: false,
			default: true,
		},
		mini: {
			type: Boolean,
			required: false,
			default: false,
		},
		front: {
			type: Boolean,
			required: false,
			default: false,
		},
		contextmenu: {
			type: Array,
			required: false,
		}
	},

	emits: ['closed'],

	data() {
		return {
			showing: true,
			id: Math.random().toString(), // TODO: UUID???????????????
		};
	},

	mounted() {
		if (this.initialWidth) this.applyTransformWidth(this.initialWidth);
		if (this.initialHeight) this.applyTransformHeight(this.initialHeight);

		this.applyTransformTop((window.innerHeight / 2) - (this.$el.offsetHeight / 2));
		this.applyTransformLeft((window.innerWidth / 2) - (this.$el.offsetWidth / 2));

		// ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
		this.top();

		window.addEventListener('resize', this.onBrowserResize);
	},

	unmounted() {
		window.removeEventListener('resize', this.onBrowserResize);
	},

	methods: {
		close() {
			this.showing = false;
		},

		onKeydown(e) {
			if (e.which === 27) { // Esc
				e.preventDefault();
				e.stopPropagation();
				this.close();
			}
		},

		onContextmenu(ev: MouseEvent) {
			if (this.contextmenu) {
				os.contextMenu(this.contextmenu, ev);
			}
		},

		// ??????????????????
		top() {
			(this.$el as any).style.zIndex = os.claimZIndex(this.front ? 'middle' : 'low');
		},

		onBodyMousedown() {
			this.top();
		},

		onHeaderMousedown(e) {
			const main = this.$el as any;

			if (!contains(main, document.activeElement)) main.focus();

			const position = main.getBoundingClientRect();

			const clickX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
			const clickY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
			const moveBaseX = clickX - position.left;
			const moveBaseY = clickY - position.top;
			const browserWidth = window.innerWidth;
			const browserHeight = window.innerHeight;
			const windowWidth = main.offsetWidth;
			const windowHeight = main.offsetHeight;

			// ???????????????
			dragListen(me => {
				const x = me.touches && me.touches.length > 0 ? me.touches[0].clientX : me.clientX;
				const y = me.touches && me.touches.length > 0 ? me.touches[0].clientY : me.clientY;

				let moveLeft = x - moveBaseX;
				let moveTop = y - moveBaseY;

				// ???????????????
				if (moveTop + windowHeight > browserHeight) moveTop = browserHeight - windowHeight;

				// ???????????????
				if (moveLeft < 0) moveLeft = 0;

				// ???????????????
				if (moveTop < 0) moveTop = 0;

				// ???????????????
				if (moveLeft + windowWidth > browserWidth) moveLeft = browserWidth - windowWidth;

				this.$el.style.left = moveLeft + 'px';
				this.$el.style.top = moveTop + 'px';
			});
		},

		// ????????????????????????
		onTopHandleMousedown(e) {
			const main = this.$el as any;

			const base = e.clientY;
			const height = parseInt(getComputedStyle(main, '').height, 10);
			const top = parseInt(getComputedStyle(main, '').top, 10);

			// ???????????????
			dragListen(me => {
				const move = me.clientY - base;
				if (top + move > 0) {
					if (height + -move > minHeight) {
						this.applyTransformHeight(height + -move);
						this.applyTransformTop(top + move);
					} else { // ???????????????????????????????????????????????????
						this.applyTransformHeight(minHeight);
						this.applyTransformTop(top + (height - minHeight));
					}
				} else { // ?????????????????????
					this.applyTransformHeight(top + height);
					this.applyTransformTop(0);
				}
			});
		},

		// ????????????????????????
		onRightHandleMousedown(e) {
			const main = this.$el as any;

			const base = e.clientX;
			const width = parseInt(getComputedStyle(main, '').width, 10);
			const left = parseInt(getComputedStyle(main, '').left, 10);
			const browserWidth = window.innerWidth;

			// ???????????????
			dragListen(me => {
				const move = me.clientX - base;
				if (left + width + move < browserWidth) {
					if (width + move > minWidth) {
						this.applyTransformWidth(width + move);
					} else { // ????????????????????????????????????????????????
						this.applyTransformWidth(minWidth);
					}
				} else { // ?????????????????????
					this.applyTransformWidth(browserWidth - left);
				}
			});
		},

		// ????????????????????????
		onBottomHandleMousedown(e) {
			const main = this.$el as any;

			const base = e.clientY;
			const height = parseInt(getComputedStyle(main, '').height, 10);
			const top = parseInt(getComputedStyle(main, '').top, 10);
			const browserHeight = window.innerHeight;

			// ???????????????
			dragListen(me => {
				const move = me.clientY - base;
				if (top + height + move < browserHeight) {
					if (height + move > minHeight) {
						this.applyTransformHeight(height + move);
					} else { // ???????????????????????????????????????????????????
						this.applyTransformHeight(minHeight);
					}
				} else { // ?????????????????????
					this.applyTransformHeight(browserHeight - top);
				}
			});
		},

		// ????????????????????????
		onLeftHandleMousedown(e) {
			const main = this.$el as any;

			const base = e.clientX;
			const width = parseInt(getComputedStyle(main, '').width, 10);
			const left = parseInt(getComputedStyle(main, '').left, 10);

			// ???????????????
			dragListen(me => {
				const move = me.clientX - base;
				if (left + move > 0) {
					if (width + -move > minWidth) {
						this.applyTransformWidth(width + -move);
						this.applyTransformLeft(left + move);
					} else { // ????????????????????????????????????????????????
						this.applyTransformWidth(minWidth);
						this.applyTransformLeft(left + (width - minWidth));
					}
				} else { // ?????????????????????
					this.applyTransformWidth(left + width);
					this.applyTransformLeft(0);
				}
			});
		},

		// ???????????????????????????
		onTopLeftHandleMousedown(e) {
			this.onTopHandleMousedown(e);
			this.onLeftHandleMousedown(e);
		},

		// ???????????????????????????
		onTopRightHandleMousedown(e) {
			this.onTopHandleMousedown(e);
			this.onRightHandleMousedown(e);
		},

		// ???????????????????????????
		onBottomRightHandleMousedown(e) {
			this.onBottomHandleMousedown(e);
			this.onRightHandleMousedown(e);
		},

		// ???????????????????????????
		onBottomLeftHandleMousedown(e) {
			this.onBottomHandleMousedown(e);
			this.onLeftHandleMousedown(e);
		},

		// ???????????????
		applyTransformHeight(height) {
			if (height > window.innerHeight) height = window.innerHeight;
			(this.$el as any).style.height = height + 'px';
		},

		// ????????????
		applyTransformWidth(width) {
			if (width > window.innerWidth) width = window.innerWidth;
			(this.$el as any).style.width = width + 'px';
		},

		// Y???????????????
		applyTransformTop(top) {
			(this.$el as any).style.top = top + 'px';
		},

		// X???????????????
		applyTransformLeft(left) {
			(this.$el as any).style.left = left + 'px';
		},

		onBrowserResize() {
			const main = this.$el as any;
			const position = main.getBoundingClientRect();
			const browserWidth = window.innerWidth;
			const browserHeight = window.innerHeight;
			const windowWidth = main.offsetWidth;
			const windowHeight = main.offsetHeight;
			if (position.left < 0) main.style.left = 0;     // ???????????????
			if (position.top + windowHeight > browserHeight) main.style.top = browserHeight - windowHeight + 'px';  // ???????????????
			if (position.left + windowWidth > browserWidth) main.style.left = browserWidth - windowWidth + 'px';    // ???????????????
			if (position.top < 0) main.style.top = 0;       // ???????????????
		}
	}
});
</script>

<style lang="scss" scoped>
.window-enter-active, .window-leave-active {
	transition: opacity 0.2s, transform 0.2s !important;
}
.window-enter-from, .window-leave-to {
	pointer-events: none;
	opacity: 0;
	transform: scale(0.9);
}

.ebkgocck {
	position: fixed;
	top: 0;
	left: 0;

	> .body {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		contain: content;
		width: 100%;
    height: 100%;

		> .header {
			--height: 50px;

			&.mini {
				--height: 38px;
			}

			display: flex;
			position: relative;
			z-index: 1;
			flex-shrink: 0;
			user-select: none;
			height: var(--height);
			border-bottom: solid 1px var(--divider);

			> .left, > .right {
				> ::v-deep(button) {
					height: var(--height);
					width: var(--height);

					&:hover {
						color: var(--fgHighlighted);
					}
				}
			}

			> .left {
				min-width: 16px;
			}

			> .title {
				flex: 1;
				position: relative;
				line-height: var(--height);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				cursor: move;
			}
		}

		> .body {
			flex: 1;
			overflow: auto;
		}
	}

	> .handle {
		$size: 8px;

		position: absolute;

		&.top {
			top: -($size);
			left: 0;
			width: 100%;
			height: $size;
			cursor: ns-resize;
		}

		&.right {
			top: 0;
			right: -($size);
			width: $size;
			height: 100%;
			cursor: ew-resize;
		}

		&.bottom {
			bottom: -($size);
			left: 0;
			width: 100%;
			height: $size;
			cursor: ns-resize;
		}

		&.left {
			top: 0;
			left: -($size);
			width: $size;
			height: 100%;
			cursor: ew-resize;
		}

		&.top-left {
			top: -($size);
			left: -($size);
			width: $size * 2;
			height: $size * 2;
			cursor: nwse-resize;
		}

		&.top-right {
			top: -($size);
			right: -($size);
			width: $size * 2;
			height: $size * 2;
			cursor: nesw-resize;
		}

		&.bottom-right {
			bottom: -($size);
			right: -($size);
			width: $size * 2;
			height: $size * 2;
			cursor: nwse-resize;
		}

		&.bottom-left {
			bottom: -($size);
			left: -($size);
			width: $size * 2;
			height: $size * 2;
			cursor: nesw-resize;
		}
	}
}
</style>
