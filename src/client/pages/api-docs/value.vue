<template>
<MkContainer :body-togglable="true" class="ezkosiua">
	<template #header>
		<div class="header _monospace">
			<span class="name">{{ name }}</span>
			<span class="type">{{ type }}</span>
		</div>
	</template>
	<div class="body">
		<div class="description">{{ value.description }}</div>

		<div v-if="value.$ref" class="ref">
			<button class="_textButton" @click="resolveRef = true">
				{{ value.$ref.replace('#/components/schemas/', '') }}
			</button>
			<div v-if="resolveRef">
				<XValue :value="schemas[value.$ref.replace('#/components/schemas/', '')]" :schemas="schemas"/>
			</div>
		</div>
		<div v-else-if="value.type === 'object'">
			<XObject :obj="value.properties || {}" :schemas="schemas"/>
		</div>
		<div v-else-if="value.type === 'array'">
			<XArray :array="value.items" :schemas="schemas"/>
		</div>
		<div v-else-if="value.type === 'string'">
		</div>
		<div v-else>
			unknown
		</div>
	</div>
</MkContainer>
</template>

<script lang="ts">
import Button from '@/components/ui/button.vue';
import { defineComponent, defineAsyncComponent } from 'vue';
import MkContainer from '@/components/ui/container.vue';

function getType(value) {
	let t = value.type === 'array' ? `${getType(value.items)}[]` : value.type;
	if (value.nullable) t = `(${t} | null)`;
	return t;
}

export default defineComponent({
	name: 'XValue',

	components: {
		MkContainer,
		XObject: defineAsyncComponent(() => import('./value.object.vue')),
		XArray: defineAsyncComponent(() => import('./value.array.vue')),
		Button,
	},

	props: {
		value: {
			type: Object,
			required: true
		},
		schemas: {
			type: Object,
			required: true
		},
		name: {
			type: String,
			required: false
		},
	},

	data() {
		return {
			resolveRef: false,
			type: getType(this.value)
		};
	},

	created() {
	},
});
</script>

<style lang="scss" scoped>
.ezkosiua {
	::v-deep(.header) {
		> .name {
			font-weight: bold;
			margin-right: 1em;

			&:empty {
				display: none;
			}
		}

		> .type {
			border: solid 1px var(--divider);
			border-radius: 4px;
			padding: 3px 6px;
		}
	}

	::v-deep(.body) {
		padding: 16px;
	}
}
</style>
