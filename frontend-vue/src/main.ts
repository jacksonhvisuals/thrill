import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DashboardView from '../pages/DashboardView.vue'
import SettingsView from '../pages/SettingsView.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'

const routes = [
  { path: '/', component: DashboardView },
  { path: '/settings', component: SettingsView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')