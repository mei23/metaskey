<template>
<div class="rfbvytqb" v-size="{ max: [500] }">
	<div class="title">{{ endpoint }}</div>
	<div class="body" v-if="ep">
		<div class="url _code">POST {{ apiUrl }}/{{ endpoint }}</div>
		<section class="description">{{ ep.spec.description }}</section>
		<MkA to="/api-console" :behavior="'window'">API console</MkA>
		<section class="params">
			<h2>Params</h2>
			<XValue :value="ep.spec.requestBody.content['application/json'].schema" :schemas="ep.schemas"/>
		</section>
		<section class="res">
			<h2>Response</h2>
			<section v-for="status in Object.keys(ep.spec.responses)" :key="status">
				<h3>{{ status }}</h3>
				<XValue v-if="ep.spec.responses[status].content" :value="ep.spec.responses[status].content['application/json'].schema" :schemas="ep.schemas"/>
			</section>
		</section>
		<section class="raw">
			<h2>Raw spec info</h2>
			<details>
				<summary>Show</summary>
				<pre class="_code">{{ JSON.stringify(ep.spec, null, '\t') }}</pre>
			</details>
		</section>
	</div>
	<div class="footer">
		<MkLink :url="`https://github.com/syuilo/misskey/blob/master/src/docs/${lang}/${doc}.md`" class="at">{{ $ts.docSource }}</MkLink>
	</div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { url, lang, apiUrl } from '@/config';
import MkLink from '@/components/link.vue';
import XValue from './value.vue';
import * as os from '@/os';

export default defineComponent({
	components: {
		MkLink,
		XValue,
	},

	props: {
		endpoint: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			INFO: computed(() => this.ep ? {
				title: this.endpoint,
				icon: faQuestionCircle,
			} : null),
			ep: null,
			lang,
			apiUrl,
		}
	},

	watch: {
		endpoint: {
			handler() {
				this.fetchDoc();
			},
			immediate: true,
		}
	},

	methods: {
		fetchDoc() {
			os.api('endpoint', {
				endpoint: this.endpoint,
				lang: lang
			}).then(ep => {
				this.ep = ep;
			});
		},
	}
});
</script>

<style lang="scss" scoped>
.rfbvytqb {
	padding: 32px;

	&.max-width_500px {
		padding: 16px;
	}

	> .title {
		font-size: 1.5em;
		font-weight: bold;
		padding: 0 0 0.75em 0;
		margin: 0 0 1em 0;
		border-bottom: solid 2px var(--divider);
	}

	> .body {
		> *:first-child {
			margin-top: 0;
		}

		> *:last-child {
			margin-bottom: 0;
		}

		> .url {
			padding: 6px 12px;
			border-radius: 4px;
			margin-bottom: 16px;
		}

		> .raw {
			> details {
				> pre {
					overflow: auto;
				}
			}
		}

		::v-deep(a) {
			color: var(--link);
		}

		::v-deep(blockquote) {
			display: block;
			margin: 8px;
			padding: 6px 0 6px 12px;
			color: var(--fg);
			border-left: solid 3px var(--fg);
			opacity: 0.7;

			p {
				margin: 0;
			}
		}

		::v-deep(h2) {
			font-size: 1.25em;
			padding: 0 0 0.5em 0;
			margin: 1.5em 0 1em 0;
			border-bottom: solid 1px var(--divider);
		}

		::v-deep(table) {
			width: 100%;
			max-width: 100%;
			overflow: auto;
		}

		::v-deep(kbd.group) {
			display: inline-block;
			padding: 2px;
			border: 1px solid var(--divider);
			border-radius: 4px;
			box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		}

		::v-deep(kbd.key) {
			display: inline-block;
			padding: 6px 8px;
			border: solid 1px var(--divider);
			border-radius: 4px;
			box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		}

		::v-deep(code) {
			display: inline-block;
			font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
			tab-size: 2;
			background: #272822;
			color: #f8f8f2;
			border-radius: 6px;
			padding: 4px 6px;
		}

		::v-deep(pre) {
			background: #272822;
			color: #f8f8f2;
			border-radius: 6px;
			padding: 12px 16px;

			> code {
				padding: 0;
			}
		}
	}

	> .footer {
		padding: 1.5em 0 0 0;
		margin: 1.5em 0 0 0;
		border-top: solid 2px var(--divider);
	}
}
</style>
