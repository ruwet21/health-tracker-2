<template>
  <aside class="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-soft w-64 transition-all duration-300 relative z-30">
    <div class="p-4 flex-1 overflow-y-auto mt-16 lg:mt-0">
      <!-- We add mt-16 on mobile because sidebar goes under navbar if absolute, but here we'll handle layout differently -->
      <div class="space-y-1 mt-6 lg:mt-0">
        <RouterLink 
          to="/" 
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200"
          :class="[$route.path === '/' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200']"
        >
          <LayoutDashboardIcon class="w-5 h-5" />
          <span>Dashboard</span>
        </RouterLink>
      </div>
    </div>
    <div class="p-4 border-t border-slate-200 dark:border-slate-800">
      <div class="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center text-center">
        <HeartPulseIcon class="w-8 h-8 text-rose-500 mb-2" />
        <p class="text-xs font-medium text-slate-700 dark:text-slate-300">Stay Healthy</p>
        <p class="text-[10px] text-slate-500 mt-1">Track your vitals daily</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { LayoutDashboard as LayoutDashboardIcon, HeartPulse as HeartPulseIcon } from 'lucide-vue-next';

const $route = useRoute();
</script>
