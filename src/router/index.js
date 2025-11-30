import Example from '@/views/Example.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/example',
    },
    {
      path: '/example',
      name: 'Example',
      component: Example,
    },
  ],
});

export default router;
