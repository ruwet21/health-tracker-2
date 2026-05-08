import { ref, onMounted, watch } from 'vue';

const isDark = ref(false);

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const initTheme = () => {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDark.value = true;
    } else {
      isDark.value = false;
    }
  };

  watch(isDark, (val) => {
    if (val) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });

  // Call init on component mount when used globally
  onMounted(() => {
    if(typeof window !== 'undefined') initTheme();
  });

  return {
    isDark,
    toggleTheme,
    initTheme
  };
}
