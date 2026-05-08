import { reactive } from 'vue';

const toastState = reactive({
  isVisible: false,
  message: '',
  type: 'success', // 'success', 'error', 'info'
});

let timeoutId = null;

export function useToast() {
  const showToast = (message, type = 'success', duration = 3000) => {
    toastState.message = message;
    toastState.type = type;
    toastState.isVisible = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      toastState.isVisible = false;
    }, duration);
  };

  const hideToast = () => {
    toastState.isVisible = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return {
    toastState,
    showToast,
    hideToast
  };
}
