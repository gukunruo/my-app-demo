// router.js
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'; // 引入 routes.js 中的路由配置

const router = createRouter({
  history: createWebHistory(),
  routes // 使用引入的路由配置
});

export default router;
