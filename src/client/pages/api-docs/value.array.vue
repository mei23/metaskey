<template>
<div class="">
	Array of
	<div class="">
		<XValue class="" :value="array" :schemas="schemas"/>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XValue from './value.vue';
import MkContainer from '@/components/ui/container.vue';

export default defineComponent({
	name: 'XArray',

	components: {
		MkContainer,
		XValue,
	},

	props: {
		array: {
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
		};
	},

	created() {
	},
});
</script>

<style lang="scss" scoped>

</style>
