<template>
  <a-layout-header class="header">
    <div class="header-left">
      <a-button class="menu-fold-btn" @click="toggleSidebar">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>{{ currentRoute }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="header-right">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar src="src/assets/riluo.jpg" />
          <span class="username">riluo</span>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <UserOutlined />
              Profile
            </a-menu-item>
            <a-menu-item key="1">
              <SettingOutlined />
              Settings
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <LogoutOutlined />
              Logout
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggle']);

const route = useRoute();
const currentRoute = computed(() => route.meta.title || 'Current Page');

const toggleSidebar = () => {
  emit('toggle');
};
</script>

<style scoped>
.header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.header-left, .header-right {
  display: flex;
  align-items: center;
}

.menu-fold-btn {
  font-size: 18px;
  margin-right: 24px;
}

.username {
  margin-left: 8px;
}

:deep(.ant-breadcrumb) {
  line-height: 64px;
}
</style>
