import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/add',
    name: 'AddShoes',
    component: () => import('../views/AddShoes.vue')
  },
  {
    path: '/:id',
    name: 'EditShoes',
    component: () => import('../views/EditShoes.vue')
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: () => import('../views/AdminView.vue')
  }
    
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
