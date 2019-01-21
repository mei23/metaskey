<template>
<component :is="ui ? 'mk-ui' : 'div'">
	<x-games />
</component>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	components: {
		XGames: () => import('../../../../common/views/components/games/index.vue').then(m => m.default)
	},
	props: {
		ui: {
			default: false
		}
	}
});
</script>
