<template>
  <a-layout id="layout" class="container">
    <SideMenu />
    <a-layout>
      <TopBar />
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        © 2024 riluo. All rights reserved.
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import SideMenu from './components/sideMenu.vue';
import TopBar from './components/topBar.vue';
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.footer {
  text-align: center;
  padding: 12px;
  background: #f0f2f5;
}
</style>
