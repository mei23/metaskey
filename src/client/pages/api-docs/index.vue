<template>
<div>
	<main class="_section">
		<div class="_content">
			<ul>
				<li v-for="endpoint in endpoints" :key="endpoint">
					<MkA :to="`/api-docs/endpoints/${endpoint}`">{{ endpoint }}</MkA>
				</li>
			</ul>
		</div>
	</main>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { url, lang } from '@/config';
import * as os from '@/os';

export default defineComponent({
	data() {
		return {
			INFO: {
				title: 'Misskey API',
				icon: faQuestionCircle
			},
			endpoints: [],
			faQuestionCircle
		}
	},

	created() {
		os.api('endpoints').then(endpoints => {
			this.endpoints = endpoints;
		});
	},
});
</script>
