<template>
<div class="mk-app" v-hotkey.global="keymap">
	<XSidebar ref="nav" class="sidebar"/>

	<div class="contents" ref="contents" :class="{ wallpaper }">
		<div v-if="isDesktop" class="widgets">
			<div ref="widgetsSpacer"></div>
			<XWidgets @mounted="attachSticky"/>
		</div>
	</div>

	<XCommon/>
</div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, markRaw } from 'vue';
import { faLayerGroup, faBars, faHome, faCircle, faWindowMaximize, faColumns } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { host } from '@/config';
import { search } from '@/scripts/search';
import { StickySidebar } from '@/scripts/sticky-sidebar';
import XSidebar from '@/components/sidebar.vue';
import XCommon from './_common_/common.vue';
import XHeader from './_common_/header.vue';
import XSide from './default.side.vue';
import * as os from '@/os';
import { sidebarDef } from '@/sidebar';

const DESKTOP_THRESHOLD = 1100;

export default defineComponent({
	components: {
		XCommon,
		XSidebar,
		XHeader,
		XWidgets: defineAsyncComponent(() => import('./default.widgets.vue')),
		XSide, // NOTE: dynamic importするとAsyncComponentWrapperが間に入るせいでref取得できなくて面倒になる
	},

	provide() {
		return {
			sideViewHook: this.isDesktop ? (url) => {
				this.$refs.side.navigate(url);
			} : null
		};
	},

	data() {
		return {
			host: host,
			connection: null,
			isDesktop: window.innerWidth >= DESKTOP_THRESHOLD,
			menuDef: sidebarDef,
			navHidden: false,
			widgetsShowing: false,
			wallpaper: localStorage.getItem('wallpaper') != null,
			faLayerGroup, faBars, faBell, faHome, faCircle,
		};
	},

	computed: {
		keymap(): any {
			return {
				'd': () => {
					if (this.$store.state.device.syncDeviceDarkMode) return;
					this.$store.commit('device/set', { key: 'darkMode', value: !this.$store.state.device.darkMode });
				},
				'p': os.post,
				'n': os.post,
				's': search,
				'h|/': this.help
			};
		},

		widgets(): any {
			return this.$store.state.deviceUser.widgets;
		},

		menu(): string[] {
			return this.$store.state.deviceUser.menu;
		},
	},

	created() {
		this.connection = os.stream.useSharedConnection('main');
		this.connection.on('notification', this.onNotification);
	},

	mounted() {
		this.adjustUI();

		const ro = new ResizeObserver((entries, observer) => {
			this.adjustUI();
		});

		ro.observe(this.$refs.contents);

		window.addEventListener('resize', this.adjustUI, { passive: true });

		if (!this.isDesktop) {
			window.addEventListener('resize', () => {
				if (window.innerWidth >= DESKTOP_THRESHOLD) this.isDesktop = true;
			}, { passive: true });
		}
	},

	methods: {
		changePage(page) {
			if (page == null) return;
			if (page.INFO) {
				this.pageInfo = page.INFO;
			}
		},

		adjustUI() {
			const navWidth = this.$refs.nav.$el.offsetWidth;
			this.navHidden = navWidth === 0;
			if (this.$refs.contents == null) return;
			const width = this.$refs.contents.offsetWidth;
			this.$refs.header.style.width = `${width}px`;
		},

		showNav() {
			this.$refs.nav.show();
		},

		attachSticky(el) {
			const sticky = new StickySidebar(el, this.$refs.widgetsSpacer);
			window.addEventListener('scroll', () => {
				sticky.calc(window.scrollY);
			}, { passive: true });
		},

		top() {
			window.scroll({ top: 0, behavior: 'smooth' });
		},

		help() {
			this.$router.push('/docs/keyboard-shortcut');
		},

		onTransition() {
			if (window._scroll) window._scroll();
		},

		onContextmenu(e) {
			const url = this.$route.path;
			os.contextMenu([{
				type: 'label',
				text: url,
			}, {
				icon: faColumns,
				text: this.$t('openInSideView'),
				action: () => {
					this.$refs.side.navigate(url);
				}
			}, {
				icon: faWindowMaximize,
				text: this.$t('openInWindow'),
				action: () => {
					os.pageWindow(url);
				}
			}], e);
		},

		async onNotification(notification) {
			if (this.$store.state.i.mutingNotificationTypes.includes(notification.type)) {
				return;
			}
			if (document.visibilityState === 'visible') {
				os.stream.send('readNotification', {
					id: notification.id
				});

				os.popup(await import('@/components/toast.vue'), {
					notification
				}, {}, 'closed');
			}

			os.sound('notification');
		},
	}
});
</script>

<style lang="scss" scoped>
.mk-app {
	min-height: calc(var(--vh, 1vh) * 100);
	box-sizing: border-box;

	display: flex;

	> .contents {
		width: 100%;
		min-width: 0;
		padding-top: $header-height;

		&.wallpaper {
			background: var(--wallpaperOverlay);
			//backdrop-filter: blur(4px);
		}

		> .widgets {
			padding: 0 var(--margin);
			border-left: solid 1px var(--divider);

			@media (max-width: $widgets-hide-threshold) {
				display: none;
			}
		}
	}
}
</style>

<style lang="scss">
</style>
