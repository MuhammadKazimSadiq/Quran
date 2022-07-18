import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

const routes = [
  { path: '/', name: 'Home', component: () => import('./views/Home.vue')},
  { path: '/read/:id', name: 'Read', component: () => import('./views/Read.vue')},
  { path: '/search', name: 'Search', component: () => import('./views/Search.vue')},
  { path: '/bookmarks', name: 'Bookmarks', component: () => import('./views/Bookmarks.vue')},
  { path: '/settings', name: 'Settings', component: () => import('./views/Settings.vue')},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "bg-gray-200",
  linkExactActiveClass: "bg-gray-200",
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
