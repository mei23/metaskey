<template>
<div class="jhpkzgfz">
	<div class="kvs">
		<XValue v-for="kv in kvs" :key="kv[0]" class="kv _vMargin _shadow" :name="kv[0]" :value="kv[1]" :schemas="schemas"/>
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
	> .kvs {

		> .kv {
			::v-deep(.k) {
				font-weight: bold;
			}

			::v-deep(.v) {
				padding: 16px;
			}
		}
	}
}
</style>
