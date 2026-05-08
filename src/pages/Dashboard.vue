<template>
  <AppLayout>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Health Overview</h1>
      <p class="text-slate-500 dark:text-slate-400">Track and monitor health metrics for your family.</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 flex items-center gap-3 text-red-600 dark:text-red-400">
      <AlertCircleIcon class="w-5 h-5 flex-shrink-0" />
      <p class="text-sm">{{ error }}</p>
    </div>

    <SummaryCards :logs="logs" />

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
      <div class="xl:col-span-2">
        <HealthChart :logs="logs" />
      </div>
      <div>
        <HealthForm />
      </div>
    </div>

    <div class="mb-6">
      <HealthTable :logs="logs" :loading="isLoading" />
    </div>
  </AppLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import { AlertCircle as AlertCircleIcon } from 'lucide-vue-next';
import AppLayout from '../components/layout/AppLayout.vue';
import SummaryCards from '../components/SummaryCards.vue';
import HealthChart from '../components/charts/HealthChart.vue';
import HealthForm from '../components/forms/HealthForm.vue';
import HealthTable from '../components/tables/HealthTable.vue';
import { useHealthLogs } from '../composables/useHealthLogs';

const { logs, isLoading, error, fetchLogs } = useHealthLogs();

onMounted(() => {
  fetchLogs();
});
</script>
