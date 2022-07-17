import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

import Home from './views/Home.vue'
import Chapter from './views/Chapter.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/chapter/:id', component: Chapter },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  linkActiveClass: "bg-gray-300",
  linkExactActiveClass: "bg-gray-300",
})

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
