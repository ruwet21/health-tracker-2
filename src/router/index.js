import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Login from '../pages/Login.vue';
import { useAuth } from '../composables/useAuth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    }
  ]
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const { user, isAuthReady } = useAuth();
  
  // Wait for auth to be ready is usually handled in main.js
  // But if it's already ready, we can check state immediately
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  
  if (requiresAuth && !user.value) {
    next('/login');
  } else if (requiresGuest && user.value) {
    next('/');
  } else {
    next();
  }
});

export default router;
