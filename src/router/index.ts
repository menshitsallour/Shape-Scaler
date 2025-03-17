import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('pages/AnimationPage.vue'),
    name: 'Animation',
  },
  {
    path: '/landing',
    component: () => import('pages/LandingPage.vue'),
    name: 'Landing',
  },
  {
    path: '/catalog',
    component: () => import('pages/CatalogPage.vue'),
    name: 'Catalog',
  },
];

export default route(function () {
  const Router = createRouter({
    history: createWebHistory(),
    routes,
  });

  return Router;
});
