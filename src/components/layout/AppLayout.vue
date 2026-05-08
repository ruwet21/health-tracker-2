<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    
    <div class="flex flex-1 overflow-hidden relative">
      <!-- Mobile Sidebar Backdrop -->
      <Transition name="fade">
        <div 
          v-if="sidebarOpen" 
          @click="sidebarOpen = false"
          class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 lg:hidden"
        ></div>
      </Transition>
      
      <!-- Sidebar -->
      <div 
        class="fixed inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <Sidebar />
      </div>
      
      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto w-full">
        <div class="p-4 lg:p-8 max-w-7xl mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
    
    <Toast />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Toast from '../ui/Toast.vue';

const sidebarOpen = ref(false);
const route = useRoute();

// Close sidebar on route change on mobile
watch(() => route.path, () => {
  sidebarOpen.value = false;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
