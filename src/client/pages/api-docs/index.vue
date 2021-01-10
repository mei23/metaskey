<template>
<div class="smzyuecx">
	<div class="tags">
		<button v-for="tag in tags" :key="tag" class="tag _button">
			{{ tag }}
		</button>
	</div>

	<ul>
		<li v-for="endpoint in endpoints" :key="endpoint.name">
			<MkA :to="`/api-docs/endpoints/${endpoint.name}`">{{ endpoint.name }}</MkA>
		</li>
	</ul>
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
			tags: [],
			faQuestionCircle
		}
	},

	created() {
		os.api('endpoints').then(endpoints => {
			this.endpoints = endpoints;

			const tags = new Set();
			for (const endpoint of this.endpoints) {
				if (endpoint.tags) {
					for (const tag of endpoint.tags) {
						tags.add(tag);
					}
				}
			}

			this.tags = Array.from(tags);
		});
	},
});
</script>

<style lang="scss" scoped>
.smzyuecx {
	> .tags {
		> .tag {
			display: inline-block;
			border: solid 1px var(--divider);
			border-radius: 6px;
			padding: 12px 16px;
			margin: 8px;
		}
	} 
}
</style>
