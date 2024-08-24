<template>
  <a-layout-sider width="200" theme="dark" class="sidebar">
    <div class="logo">My Logo</div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :items="menuItems"
    />
  </a-layout-sider>
</template>

<script setup>
import { ref, computed, watch, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import routes from "@/router/routes";

const router = useRouter();
const route = useRoute();

const getMenuRoutes = (routes) => {
  return routes.reduce((acc, route) => {
    if (route.children) {
      acc.push(...getMenuRoutes(route.children));
    }
    if (route.meta && route.meta.isMenu) {
      acc.push(route);
    }
    return acc;
  }, []);
};

const menuRoutes = computed(() => getMenuRoutes(routes));

const menuItems = computed(() =>
  menuRoutes.value.map((route) => ({
    key: route.path,
    icon: route.meta?.icon ? h(route.meta.icon) : null,
    label: h(RouterLink, { to: route.path }, () => route.meta.title),
  }))
);

const selectedKeys = ref([route.path]);

watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath];
  }
);
</script>

<style scoped>
.sidebar .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
}
</style>
