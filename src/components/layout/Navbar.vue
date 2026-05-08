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
        
        <button @click="handleLogout" class="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:outline-none rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2" title="Keluar">
          <LogOutIcon class="w-5 h-5" />
          <span class="text-sm font-medium hidden sm:block">Keluar</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme';
import { useAuth } from '../../composables/useAuth';
import { useRouter } from 'vue-router';
import { Menu as MenuIcon, Sun as SunIcon, Moon as MoonIcon, LogOut as LogOutIcon } from 'lucide-vue-next';

defineEmits(['toggle-sidebar']);
const { isDark, toggleTheme } = useTheme();
const { logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.push('/login');
};
</script>
