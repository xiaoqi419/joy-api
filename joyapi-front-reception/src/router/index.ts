import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('@/views/notice/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export const installRouter = (app: App) => {
  app.use(router);
};

export default router;
