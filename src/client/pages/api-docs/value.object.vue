<template>
<div class="jhpkzgfz">
	<div class="empty" v-if="kvs.length === 0">
		No fields
	</div>
	<div class="kvs" v-else>
		<div class="kv" v-for="kv in kvs" :key="kv[0]">
			<div class="k _monospace">{{ kv[0] }}</div>
			<XValue class="v" :value="kv[1]" :schemas="schemas"/>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XValue from './value.vue';
import MkContainer from '@/components/ui/container.vue';

export default defineComponent({
	name: 'XObject',

	components: {
		MkContainer,
		XValue,
	},

	props: {
		obj: {
			type: Object,
			required: true
		},
		schemas: {
			type: Object,
			required: true
		},
	},

	data() {
		return {
			kvs: Object.entries(this.obj)
		};
	},

	created() {
	},
});
</script>

<style lang="scss" scoped>
.jhpkzgfz {
	border: solid 1px var(--divider);
	border-radius: 4px;
	padding: 16px;

	> .kvs {
		> .kv {
			display: flex;

			&:not(:first-child) {
				margin-top: 16px;
				padding-top: 16px;
				border-top: solid 1px var(--divider);
			}

			> .k {
				font-weight: bold;
				margin-right: 1em;
				min-width: 8em;
			}

			> .v {
				flex: 1;
			}
		}
	}
}
</style>
