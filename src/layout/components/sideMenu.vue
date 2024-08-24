<template>
  <a-layout-sider
    :width="250"
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    theme="light"
    class="sidebar"
  >
    <div class="logo">
      <img src="@/assets/riluo.jpg" alt="Logo" />
      <span v-if="!collapsed">My App</span>
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :items="menuItems"
    />
  </a-layout-sider>
</template>

<script setup>
import { ref, computed, watch, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import routes from "@/router/routes";

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

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
.sidebar {
  box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
}

.logo {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  background: #001529;
  overflow: hidden;
}

.logo img {
  height: 32px;
  margin-right: 8px;
}

.logo span {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-left: 8px;
  white-space: nowrap;
}

:deep(.ant-menu-item) {
  margin: 4px 0;
}

:deep(.ant-menu-item-selected) {
  background-color: #e6f7ff;
}
</style>
