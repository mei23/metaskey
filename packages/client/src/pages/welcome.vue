<template>
<div v-if="meta">
	<XSetup v-if="meta.requireSetup"/>
	<XEntrance v-else/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XSetup from './welcome.setup.vue';
import XEntrance from './welcome.entrance.a.vue';
import { instanceName } from '@/config';
import * as os from '@/os';
import * as symbols from '@/symbols';

export default defineComponent({
	components: {
		XSetup,
		XEntrance,
	},

	data() {
		return {
			[symbols.PAGE_INFO]: {
				title: instanceName,
				icon: null
			},
			meta: null
		}
	},

	created() {
		os.api('meta', { detail: true }).then(meta => {
			this.meta = meta;
		});
	}
});
</script>
