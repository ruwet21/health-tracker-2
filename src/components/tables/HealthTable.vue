<template>
  <div class="glass rounded-2xl overflow-hidden flex flex-col">
    <div class="p-5 border-b border-slate-200 dark:border-slate-700/50">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ListIcon class="w-5 h-5 text-blue-500" />
          History
        </h2>
      </div>
      
      <FilterBar 
        v-model:searchQuery="searchQuery"
        v-model:userFilter="userFilter"
        v-model:typeFilter="typeFilter"
      />
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-600 dark:text-slate-400">
        <thead class="text-xs uppercase bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium">Name</th>
            <th scope="col" class="px-6 py-4 font-medium">Date</th>
            <th scope="col" class="px-6 py-4 font-medium">Test Type</th>
            <th scope="col" class="px-6 py-4 font-medium">Result</th>
            <th scope="col" class="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700/50">
          <tr v-if="loading" class="animate-pulse">
            <td colspan="5" class="px-6 py-8 text-center text-slate-500">Loading data...</td>
          </tr>
          <tr v-else-if="filteredLogs.length === 0" class="bg-transparent">
            <td colspan="5" class="px-6 py-12 text-center text-slate-500">
              <div class="flex flex-col items-center justify-center">
                <FolderOpenIcon class="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                <p>No records found</p>
              </div>
            </td>
          </tr>
          <tr 
            v-for="log in filteredLogs" 
            :key="log.id"
            class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <td class="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{{ log.user }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(log.date) }}</td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" :class="getTypeColor(log.type)">
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                {{ log.type }}
              </span>
            </td>
            <td class="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">{{ log.value }}</td>
            <td class="px-6 py-4 text-right">
              <button 
                @click="confirmDelete(log)"
                class="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors focus:outline-none"
                title="Delete record"
              >
                <Trash2Icon class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination could go here -->

    <ConfirmModal 
      :isOpen="isModalOpen"
      title="Delete Record"
      :message="`Are you sure you want to delete ${itemToDelete?.type} record for ${itemToDelete?.user}?`"
      :loading="isDeleting"
      @confirm="handleDelete"
      @cancel="isModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { List as ListIcon, Trash2 as Trash2Icon, FolderOpen as FolderOpenIcon } from 'lucide-vue-next';
import { format, parseISO } from 'date-fns';
import FilterBar from './FilterBar.vue';
import ConfirmModal from '../ui/ConfirmModal.vue';
import { useHealthLogs } from '../../composables/useHealthLogs';
import { useToast } from '../../composables/useToast';

const props = defineProps({
  logs: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const { deleteLog } = useHealthLogs();
const { showToast } = useToast();

const searchQuery = ref('');
const userFilter = ref('');
const typeFilter = ref('');

const isModalOpen = ref(false);
const itemToDelete = ref(null);
const isDeleting = ref(false);

const filteredLogs = computed(() => {
  return props.logs.filter(log => {
    const matchSearch = log.user.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchUser = userFilter.value ? log.user === userFilter.value : true;
    const matchType = typeFilter.value ? log.type === typeFilter.value : true;
    return matchSearch && matchUser && matchType;
  });
});

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  try {
    return format(parseISO(dateStr), 'dd MMM yyyy');
  } catch (e) {
    return dateStr;
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'Gula Darah':
      return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
    case 'Asam Urat':
      return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
    case 'Kolesterol':
      return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400';
    default:
      return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400';
  }
};

const confirmDelete = (item) => {
  itemToDelete.value = item;
  isModalOpen.value = true;
};

const handleDelete = async () => {
  if (!itemToDelete.value) return;
  
  isDeleting.value = true;
  const success = await deleteLog(itemToDelete.value.id);
  isDeleting.value = false;
  
  if (success) {
    showToast('Record deleted successfully!');
    isModalOpen.value = false;
    itemToDelete.value = null;
  } else {
    showToast('Failed to delete record.', 'error');
  }
};
</script>
