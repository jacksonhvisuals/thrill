import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DashboardView from '../pages/DashboardView.vue'
import SettingsView from '../pages/SettingsView.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: DashboardView },
  { path: '/settings', component: SettingsView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
createApp(App).use(router).mount('#app')