<template>
  <nav class="sticky top-0 z-40 w-full glass border-b border-slate-200 dark:border-slate-700/50 h-16">
    <div class="px-4 h-full flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button @click="$emit('toggle-sidebar')" class="lg:hidden p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <MenuIcon class="w-6 h-6" />
        </button>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30">
            H
          </div>
          <h1 class="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 hidden sm:block">
            Health Tracker
          </h1>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <button @click="toggleTheme" class="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
          <SunIcon v-if="isDark" class="w-5 h-5" />
          <MoonIcon v-else class="w-5 h-5" />
        </button>
        <div class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600">
          <UserIcon class="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme';
import { Menu as MenuIcon, Sun as SunIcon, Moon as MoonIcon, User as UserIcon } from 'lucide-vue-next';

defineEmits(['toggle-sidebar']);
const { isDark, toggleTheme } = useTheme();
</script>
