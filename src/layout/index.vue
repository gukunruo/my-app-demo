<template>
  <a-layout id="layout" class="container">
    <!-- 左侧菜单栏 -->
    <SideMenu :collapsed="collapsed" />
    <!-- 右侧 -->
    <a-layout>
      <!-- 顶部状态栏 -->
      <TopBar :collapsed="collapsed" @toggle="toggleSidebar" />
      <!-- 内容区 -->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!-- 底部状态栏 -->
      <a-layout-footer class="footer">
        © 2024 riluo. All rights reserved.
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import SideMenu from "./components/sideMenu.vue";
import TopBar from "./components/topBar.vue";

const collapsed = ref(false);

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}

.content {
  margin: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.footer {
  text-align: center;
  padding: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
