<template>
  <div class="flex flex-col sm:flex-row gap-4 w-full">
    <div class="relative flex-1">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
        <SearchIcon class="w-4 h-4" />
      </div>
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        class="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-sm"
        placeholder="Search by name..."
      />
    </div>
    
    <div class="flex gap-3">
      <select
        :value="userFilter"
        @change="$emit('update:userFilter', $event.target.value)"
        class="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 outline-none shadow-sm cursor-pointer appearance-none min-w-[120px]"
      >
        <option value="">All Users</option>
        <option value="Abdulatip">Abdulatip</option>
        <option value="Retno Wati">Retno Wati</option>
      </select>
      
      <select
        :value="typeFilter"
        @change="$emit('update:typeFilter', $event.target.value)"
        class="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 outline-none shadow-sm cursor-pointer appearance-none min-w-[140px]"
      >
        <option value="">All Types</option>
        <option value="Gula Darah">Gula Darah</option>
        <option value="Asam Urat">Asam Urat</option>
        <option value="Kolesterol">Kolesterol</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { Search as SearchIcon } from 'lucide-vue-next';

defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  userFilter: {
    type: String,
    default: ''
  },
  typeFilter: {
    type: String,
    default: ''
  }
});

defineEmits(['update:searchQuery', 'update:userFilter', 'update:typeFilter']);
</script>
