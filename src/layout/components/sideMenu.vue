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
      v-model:openKeys="openKeys"
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
  return routes.flatMap(route => {
    if (route.children) {
      return route.children.filter(child => child.meta && child.meta.isMenu);
    }
    return route.meta && route.meta.isMenu ? [route] : [];
  });
};

const menuRoutes = computed(() => getMenuRoutes(routes));

const createMenuItem = (route) => {
  const menuItem = {
    key: route.path,
    icon: route.meta?.icon ? h(route.meta.icon) : null,
    label: h(RouterLink, { to: route.path }, () => route.meta.title),
  };

  if (route.children && route.children.length > 0) {
    menuItem.children = route.children.map(createMenuItem);
  }

  return menuItem;
};

const menuItems = computed(() => menuRoutes.value.map(createMenuItem));

const selectedKeys = ref([route.path]);
const openKeys = ref([]);

watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath];
    const parentPath = newPath.substring(0, newPath.lastIndexOf('/'));
    if (parentPath) {
      openKeys.value = [parentPath];
    }
  },
  { immediate: true }
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
