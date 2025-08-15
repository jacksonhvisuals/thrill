import { defineStore } from 'pinia'

const LS_KEY = 'myapp.apiKey'

export const useApiKeyStore = defineStore('apiKey', {
  state: () => ({
    apiKey: (localStorage.getItem(LS_KEY) || '') as string,
  }),
  actions: {
    set(key: string) {
      this.apiKey = key.trim()
      localStorage.setItem(LS_KEY, this.apiKey)
    },
    clear() {
      this.apiKey = ''
      localStorage.removeItem(LS_KEY)
    },
  },
})
