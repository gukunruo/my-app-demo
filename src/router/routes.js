import Layout from '@/layout/side-menu/index.vue';
import Home from '@/views/home/index.vue';
import Gantt from '@/views/gantt/index.vue';
import NotFound from '@/views/404/index.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', redirect: '/home' }, // 默认重定向到 /home
      { path: 'home', name: 'Home', component: Home },
      { path: 'gantt', name: 'Gantt', component: Gantt }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // 404 路由
];

export default routes;