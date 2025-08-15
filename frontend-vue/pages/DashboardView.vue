<template>
  <section class="space-y-6">
    <header class="flex items-center gap-3">
      <button @click="refetchAll" :disabled="isRefetching">Refresh</button>
      <span v-if="isRefetching">Refreshing…</span>
      <span v-else class="text-sm opacity-70">Last: {{ lastUpdated }}</span>
    </header>

    <div v-if="!hasKey" class="text-red-600">Add your SimpleFIN token in Settings.</div>

    <div v-else class="grid md:grid-cols-2 gap-6">
      <section>
        <h2 class="font-semibold mb-2">Balances</h2>
        <div v-if="balQ.isLoading">Loading…</div>
        <div v-else-if="balQ.isError" class="text-red-600">{{ (balQ.error as any)?.message }}</div>
        <ul v-else class="space-y-1">
          <li v-for="b in balQ.data" :key="b.id">
            {{ b.name }} — {{ b.balance }} {{ b.currency }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="font-semibold mb-2">Recent Transactions</h2>
        <div v-if="txQ.isLoading">Loading…</div>
        <div v-else-if="txQ.isError" class="text-red-600">{{ (txQ.error as any)?.message }}</div>
        <ul v-else class="space-y-1">
          <li v-for="t in txQ.data" :key="t.id">
            {{ new Date(t.posted*1000).toLocaleDateString() }} — {{ t.description }} — {{ t.amount }}
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { useApiKeyStore } from '@/stores/apiKey'
import { fetchBalances, fetchTransactions, type Balance, type Tx } from '@/lib/api'

const store = useApiKeyStore()
const hasKey = computed(() => !!store.tokenBase64)

const balQ = useQuery<Balance[]>({
  queryKey: ['balances'],
  queryFn: () => fetchBalances(),
  enabled: hasKey.value, // only after token connected
})

const txQ = useQuery<Tx[]>({
  queryKey: ['transactions', { limit: 25 }],
  queryFn: () => fetchTransactions(25),
  enabled: hasKey.value,
})

const qc = useQueryClient()
const isRefetching = computed(() => balQ.isFetching.value || txQ.isFetching.value)
const lastUpdated = computed(() => {
  const t = Math.max(balQ.dataUpdatedAt.value ?? 0, txQ.dataUpdatedAt.value ?? 0)
  return t ? new Date(t).toLocaleTimeString() : '—'
})

function refetchAll() {
  qc.invalidateQueries({ queryKey: ['balances'] })
  qc.invalidateQueries({ queryKey: ['transactions'] })
}
</script>
