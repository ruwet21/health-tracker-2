<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <!-- Total Records -->
    <div class="glass p-5 rounded-2xl flex items-center gap-4">
      <div class="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
        <FilesIcon class="w-6 h-6" />
      </div>
      <div>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Records</p>
        <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ logs.length }}</p>
      </div>
    </div>

    <!-- Last Record -->
    <div class="glass p-5 rounded-2xl flex items-center gap-4">
      <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
        <ClockIcon class="w-6 h-6" />
      </div>
      <div>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Last Record</p>
        <p class="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate w-32">
          {{ lastRecordDate }}
        </p>
      </div>
    </div>

    <!-- Avg Gula Darah -->
    <div class="glass p-5 rounded-2xl flex items-center gap-4">
      <div class="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
        <ActivityIcon class="w-6 h-6" />
      </div>
      <div>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Avg Gula Darah</p>
        <div class="flex items-baseline gap-1">
          <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ avgGulaDarah }}</p>
          <span class="text-xs text-slate-500">mg/dL</span>
        </div>
      </div>
    </div>

    <!-- Avg Kolesterol -->
    <div class="glass p-5 rounded-2xl flex items-center gap-4">
      <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
        <HeartPulseIcon class="w-6 h-6" />
      </div>
      <div>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Avg Kolesterol</p>
        <div class="flex items-baseline gap-1">
          <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ avgKolesterol }}</p>
          <span class="text-xs text-slate-500">mg/dL</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Files as FilesIcon, Clock as ClockIcon, Activity as ActivityIcon, HeartPulse as HeartPulseIcon } from 'lucide-vue-next';
import { format, parseISO } from 'date-fns';

const props = defineProps({
  logs: {
    type: Array,
    required: true
  }
});

const lastRecordDate = computed(() => {
  if (props.logs.length === 0) return '-';
  const dates = props.logs.map(log => log.date).sort().reverse();
  try {
    return format(parseISO(dates[0]), 'dd MMM yyyy');
  } catch (e) {
    return dates[0];
  }
});

const calculateAverage = (type) => {
  const filtered = props.logs.filter(log => log.type === type);
  if (filtered.length === 0) return 0;
  const sum = filtered.reduce((acc, curr) => acc + Number(curr.value), 0);
  return (sum / filtered.length).toFixed(1);
};

const avgGulaDarah = computed(() => calculateAverage('Gula Darah'));
const avgKolesterol = computed(() => calculateAverage('Kolesterol'));
</script>
