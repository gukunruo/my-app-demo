<template>
  <a-layout id="layout" class="container">
    <SideMenu />
    <a-layout>
      <TopBar />
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import SideMenu from './components/sideMenu.vue';
import TopBar from './components/topBar.vue';
</script>

<style scoped>
.container {
  height: 100vh;
}

.content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
}
</style>
