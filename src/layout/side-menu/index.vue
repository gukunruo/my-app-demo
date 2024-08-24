<template>
  <a-layout id="layout" class="container">
    <a-layout-sider width="200" theme="dark" class="sidebar">
      <div class="logo">My Logo</div>
      <a-menu mode="inline" theme="dark">
        <a-menu-item v-for="route in menuRoutes" :key="route.path">
          <router-link :to="route.path">
            <component :is="route.meta?.icon" />
            {{ route.meta.title }}
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="header">
        <!-- 顶部状态栏内容 -->
        <div>Top Status Bar</div>
      </a-layout-header>

      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { reactive, computed } from "vue";
import routes from "@/router/routes"; // 假设你将路由配置放在这个路径下

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
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  height: 100vh;
}

.sidebar .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
}

.header {
  background: #fff;
  padding: 0;
  text-align: center;
  line-height: 64px;
}

.content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
}
</style>
