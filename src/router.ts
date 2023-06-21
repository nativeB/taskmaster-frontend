import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { check } from './api';

async function requireAuth(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    //api call to check if user is authenticated
    const token = localStorage.getItem('token');
    if(!token) {
        next('/login');
        return;
    }

    const isAuthenticated = await check();
    if (isAuthenticated) {
      // User is authenticated, allow navigation
      next();
    } else {
      // User is not authenticated, redirect to login or show an error page
      next('/login'); // Replace '/login' with your login route path
    }
}
  

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'), 
      beforeEnter: requireAuth,
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;
