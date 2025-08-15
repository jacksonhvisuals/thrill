<script setup lang="ts">
import { BadgeCent, Landmark, CircleGauge, Settings } from "lucide-vue-next"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { RouterLink } from "vue-router";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: CircleGauge,
  },
  {
    title: "Transactions",
    url: "#",
    icon: BadgeCent,
  },
  {
    title: "Accounts",
    url: "#",
    icon: Landmark,
  },
];

const footerItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
</script>

<template>
  <Sidebar>
  <SidebarHeader>
  <h1 class="font-bold text-xl px-2 py-2">Thrill</h1>
  </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <a :href="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
	<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem v-for="item in footerItems" :key="item.title">
					<SidebarMenuButton asChild>
            <RouterLink :to="item.url">
              <component :is="item.icon" />
              <span>{{item.title}}</span>
            </RouterLink>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
	</SidebarFooter>
  </Sidebar>
</template>
