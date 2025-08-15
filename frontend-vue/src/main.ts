import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DashboardView from '../pages/DashboardView.vue'
import SettingsView from '../pages/SettingsView.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const routes = [
  { path: '/', component: DashboardView },
  { path: '/settings', component: SettingsView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const qc = new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } })
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin, { queryClient: qc })
app.mount('#app')