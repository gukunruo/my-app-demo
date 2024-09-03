import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import ganttastic from '@infectoone/vue-ganttastic';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

// 全局使用中文
dayjs.locale('zh-cn');

const app = createApp(App)
app.use(router);
app.use(Antd);
app.use(ganttastic);
app.mount('#app')
