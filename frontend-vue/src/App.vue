<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
	<SidebarProvider>
	<AppSidebar />
	<main class="w-full py-2">
		<SidebarTrigger />
		<RouterView />
	</main>
	</SidebarProvider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
