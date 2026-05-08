<template>
  <Transition name="toast">
    <div v-if="toastState.isVisible" class="fixed top-4 right-4 z-50 flex items-center p-4 rounded-xl shadow-lg glass" :class="typeClasses[toastState.type]">
      <div class="mr-3">
        <svg v-if="toastState.type === 'success'" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <svg v-else-if="toastState.type === 'error'" class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </div>
      <div>
        <p class="font-medium">{{ toastState.message }}</p>
      </div>
      <button @click="hideToast" class="ml-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { useToast } from '../../composables/useToast';

const { toastState, hideToast } = useToast();

const typeClasses = {
  success: 'border-green-500/50 bg-green-50/90 dark:bg-green-900/20 text-green-800 dark:text-green-200',
  error: 'border-red-500/50 bg-red-50/90 dark:bg-red-900/20 text-red-800 dark:text-red-200',
  info: 'border-blue-500/50 bg-blue-50/90 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
