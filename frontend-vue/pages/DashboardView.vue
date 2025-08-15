<template>
    <div class="p-8 pt-6">
        <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
    </div>
</template>
<script setup lang="ts">
import { connectSimpleFin, fetchBalances, fetchTransactions, type Balance, type Tx } from "./lib/api";

</script>