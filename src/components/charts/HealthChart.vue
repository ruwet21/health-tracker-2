<template>
  <div class="glass p-5 rounded-2xl">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <TrendingUpIcon class="w-5 h-5 text-indigo-500" />
        Health Trends
      </h2>
      
      <div class="flex gap-3">
        <select
          v-model="selectedUser"
          class="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 outline-none shadow-sm cursor-pointer"
        >
          <option value="All">All Users</option>
          <option value="Abdulatip">Abdulatip</option>
          <option value="Retno Wati">Retno Wati</option>
        </select>

        <select
          v-model="selectedType"
          class="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 outline-none shadow-sm cursor-pointer"
        >
          <option value="Gula Darah">Gula Darah</option>
          <option value="Asam Urat">Asam Urat</option>
          <option value="Kolesterol">Kolesterol</option>
        </select>

        <select
          v-model="selectedTimeRange"
          class="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 outline-none shadow-sm cursor-pointer"
        >
          <option value="1W">1 Minggu</option>
          <option value="1M">1 Bulan</option>
          <option value="6M">6 Bulan</option>
          <option value="1Y">1 Tahun</option>
          <option value="All">Semua</option>
        </select>
      </div>
    </div>

    <div class="h-72 w-full relative">
      <Line v-if="chartData.datasets.length > 0" :data="chartData" :options="chartOptions" />
      <div v-else class="absolute inset-0 flex items-center justify-center text-slate-500">
        No data available for selected filters.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TrendingUp as TrendingUpIcon } from 'lucide-vue-next';
import { Line } from 'vue-chartjs';
import { useTheme } from '../../composables/useTheme';
import { subWeeks, subMonths, subYears, isAfter, parseISO } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps({
  logs: {
    type: Array,
    required: true
  }
});

const { isDark } = useTheme();

const selectedUser = ref('All');
const selectedType = ref('Gula Darah');
const selectedTimeRange = ref('All');

// Map types to colors
const typeColors = {
  'Gula Darah': { border: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' }, // red
  'Asam Urat': { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' }, // blue
  'Kolesterol': { border: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' } // green
};

const chartData = computed(() => {
  let filtered = props.logs.filter(log => log.type === selectedType.value);
  
  if (selectedUser.value !== 'All') {
    filtered = filtered.filter(log => log.user === selectedUser.value);
  }

  // Time Range Filter
  if (selectedTimeRange.value !== 'All') {
    const now = new Date();
    let cutoffDate;
    if (selectedTimeRange.value === '1W') {
      cutoffDate = subWeeks(now, 1);
    } else if (selectedTimeRange.value === '1M') {
      cutoffDate = subMonths(now, 1);
    } else if (selectedTimeRange.value === '6M') {
      cutoffDate = subMonths(now, 6);
    } else if (selectedTimeRange.value === '1Y') {
      cutoffDate = subYears(now, 1);
    }
    
    if (cutoffDate) {
      filtered = filtered.filter(log => {
        try {
          return isAfter(parseISO(log.date), cutoffDate);
        } catch {
          return true;
        }
      });
    }
  }

  // Sort by date ascending for chart
  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = filtered.map(log => {
    try {
      // simple format
      const [y, m, d] = log.date.split('-');
      return `${d}/${m}`;
    } catch {
      return log.date;
    }
  });

  const data = filtered.map(log => log.value);
  const colors = typeColors[selectedType.value] || typeColors['Gula Darah'];

  return {
    labels,
    datasets: [
      {
        label: selectedType.value,
        data,
        borderColor: colors.border,
        backgroundColor: colors.bg,
        borderWidth: 2,
        pointBackgroundColor: colors.border,
        pointBorderColor: isDark.value ? '#1e293b' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4 // Smooth curve
      }
    ]
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: isDark.value ? '#1e293b' : '#ffffff',
      titleColor: isDark.value ? '#f8fafc' : '#0f172a',
      bodyColor: isDark.value ? '#cbd5e1' : '#475569',
      borderColor: isDark.value ? '#334155' : '#e2e8f0',
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: function(context) {
          return `${context.parsed.y} mg/dL`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: isDark.value ? '#94a3b8' : '#64748b'
      }
    },
    y: {
      grid: {
        color: isDark.value ? '#334155' : '#e2e8f0',
        drawBorder: false
      },
      ticks: {
        color: isDark.value ? '#94a3b8' : '#64748b',
        padding: 10
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
}));
</script>
