import $ from 'cafy';
import define from '../define';
import endpoints from '../endpoints';
import { genOpenapiSpecForEndpoint } from '../openapi/gen-spec';
import { schemas } from '../openapi/schemas';

export const meta = {
	requireCredential: false as const,

	tags: ['meta'],

	params: {
		endpoint: {
			// TODO: セキュリティリスクになりうるためバリデーションしたい
			validator: $.str,
		},
		lang: {
			// TODO: セキュリティリスクになりうるためバリデーションしたい
			validator: $.str,
			default: 'ja-JP'
		}
	},
};

export default define(meta, async (ps) => {
	if (ps.endpoint.includes('.')) return null;
	if (ps.lang.includes('.')) return null;
	const ep = endpoints.find(x => x.name === ps.endpoint);
	if (ep == null) return null;
	return {
		params: Object.entries(ep.meta.params || {}).map(([k, v]) => ({
			name: k,
			type: v.validator.name === 'ID' ? 'String' : v.validator.name
		})),
		schemas: schemas,
		spec: genOpenapiSpecForEndpoint(ep, ps.lang)
	};
});
