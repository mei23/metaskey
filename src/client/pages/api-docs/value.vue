<template>
<div class="ezkosiua">
	<div class="header _monospace">
		<span v-if="value.$ref" class="ref">
			<button class="_textButton" @click="resolveRef = true">
				{{ value.$ref.replace('#/components/schemas/', '') }}
			</button>
		</span>
		<span class="type">{{ type }}</span>
	</div>
	<div class="body">
		<div class="description">{{ value.description }}</div>

		<div v-if="value.$ref" class="ref">
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
</div>
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
	> .header {
		> .ref {
			margin-right: 8px;
		}

		> .type {
			border: solid 1px var(--divider);
			border-radius: 4px;
			padding: 3px 6px;
		}
	}

	> .body {
		margin-top: 8px;
	}
}
</style>
