<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="$emit('cancel')"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 overflow-hidden">
        <div class="mb-5 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">{{ title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ message }}</p>
        </div>
        
        <div class="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-6">
          <BaseButton variant="outline" @click="$emit('cancel')" class="sm:w-auto w-full">Cancel</BaseButton>
          <BaseButton variant="danger" @click="$emit('confirm')" :loading="loading" class="sm:w-auto w-full">Delete</BaseButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import BaseButton from './BaseButton.vue';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['confirm', 'cancel']);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
