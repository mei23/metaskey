<template>
<div class="lcixvhis">
	<div class="_section reports">
		<div class="_content">
			<div class="inputs" style="display: flex;">
				<MkSelect v-model="state" style="margin: 0; flex: 1;">
					<template #label>{{ $ts.state }}</template>
					<option value="all">{{ $ts.all }}</option>
					<option value="unresolved">{{ $ts.unresolved }}</option>
					<option value="resolved">{{ $ts.resolved }}</option>
				</MkSelect>
				<MkSelect v-model="targetUserOrigin" style="margin: 0; flex: 1;">
					<template #label>{{ $ts.reporteeOrigin }}</template>
					<option value="combined">{{ $ts.all }}</option>
					<option value="local">{{ $ts.local }}</option>
					<option value="remote">{{ $ts.remote }}</option>
				</MkSelect>
				<MkSelect v-model="reporterOrigin" style="margin: 0; flex: 1;">
					<template #label>{{ $ts.reporterOrigin }}</template>
					<option value="combined">{{ $ts.all }}</option>
					<option value="local">{{ $ts.local }}</option>
					<option value="remote">{{ $ts.remote }}</option>
				</MkSelect>
			</div>
			<!-- TODO
			<div class="inputs" style="display: flex; padding-top: 1.2em;">
				<MkInput v-model="searchUsername" style="margin: 0; flex: 1;" type="text" spellcheck="false" @update:modelValue="$refs.reports.reload()">
					<span>{{ $ts.username }}</span>
				</MkInput>
				<MkInput v-model="searchHost" style="margin: 0; flex: 1;" type="text" spellcheck="false" @update:modelValue="$refs.reports.reload()" :disabled="pagination.params().origin === 'local'">
					<span>{{ $ts.host }}</span>
				</MkInput>
			</div>
			-->

			<MkPagination v-slot="{items}" ref="reports" :pagination="pagination" style="margin-top: var(--margin);">
				<XAbuseReport v-for="report in items" :key="report.id" :report="report" @resolved="resolved"/>
			</MkPagination>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import MkInput from '@/components/form/input.vue';
import MkSelect from '@/components/form/select.vue';
import MkPagination from '@/components/ui/pagination.vue';
import XAbuseReport from '@/components/abuse-report.vue';
import * as os from '@/os';
import * as symbols from '@/symbols';

export default defineComponent({
	components: {
		MkInput,
		MkSelect,
		MkPagination,
		XAbuseReport,
	},

	emits: ['info'],

	data() {
		return {
			[symbols.PAGE_INFO]: {
				title: this.$ts.abuseReports,
				icon: 'fas fa-exclamation-circle',
				bg: 'var(--bg)',
			},
			searchUsername: '',
			searchHost: '',
			state: 'unresolved',
			reporterOrigin: 'combined',
			targetUserOrigin: 'combined',
			pagination: {
				endpoint: 'admin/abuse-user-reports' as const,
				limit: 10,
				params: computed(() => ({
					state: this.state,
					reporterOrigin: this.reporterOrigin,
					targetUserOrigin: this.targetUserOrigin,
				})),
			},
		}
	},

	methods: {
		resolved(reportId) {
			this.$refs.reports.removeItem(item => item.id === reportId);
		},
	}
});
</script>

<style lang="scss" scoped>
.lcixvhis {
	margin: var(--margin);
}
</style>
