import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'), // Example component, replace with your actual component path
    },
    // Add more routes here
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;
