<template>
<mk-ui>
	<span slot="header"><span style="margin-right:4px;"><fa icon="gamepad"/></span>{{ $t('@.games.game') }}</span>
	<x-games />
</mk-ui>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	components: {
		XGames: () => import('../../../../common/views/components/games/index.vue').then(m => m.default)
	}
});
</script>
