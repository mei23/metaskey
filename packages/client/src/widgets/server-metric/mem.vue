<template>
<div class="zlxnikvl">
	<XPie class="pie" :value="usage"/>
	<div>
		<p><i class="fas fa-memory"></i>RAM</p>
		<p>Total: {{ bytes(total, 1) }}</p>
		<p>Used: {{ bytes(used, 1) }}</p>
		<p>Free: {{ bytes(free, 1) }}</p>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XPie from './pie.vue';
import bytes from '@/filters/bytes';

export default defineComponent({
	components: {
		XPie
	},
	props: {
		connection: {
			required: true,
		},
		meta: {
			required: true,
		}
	},
	data() {
		return {
			usage: 0,
			total: 0,
			used: 0,
			free: 0,
		};
	},
	mounted() {
		this.connection.on('stats', this.onStats);
	},
	beforeUnmount() {
		this.connection.off('stats', this.onStats);
	},
	methods: {
		onStats(stats) {
			this.usage = stats.mem.active / this.meta.mem.total;
			this.total = this.meta.mem.total;
			this.used = stats.mem.active;
			this.free = this.meta.mem.total - stats.mem.active;
		},
		bytes
	}
});
</script>

<style lang="scss" scoped>
.zlxnikvl {
	display: flex;
	padding: 16px;

	> .pie {
		height: 82px;
		flex-shrink: 0;
		margin-right: 16px;
	}

	> div {
		flex: 1;

		> p {
			margin: 0;
			font-size: 0.8em;

			&:first-child {
				font-weight: bold;
				margin-bottom: 4px;

				> i {
					margin-right: 4px;
				}
			}
		}
	}
}
</style>
