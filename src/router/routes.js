import Layout from '@/layout/index.vue';
import { HomeOutlined } from '@ant-design/icons-vue';

const routes = [
	{
		path: '/',
		component: Layout,
		redirect: '/home', // 默认重定向到 /home
		children: [
			// 首页路由
			{
				path: '/home',
				name: 'Home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页',
					isMenu: true,
					icon: HomeOutlined,
				},
			},
			// Gantt 路由
			{
				path: '/gantt',
				name: 'Gantt',
				meta: { title: '甘特图', isMenu: true, icon: HomeOutlined },
				children: [
					{
						path: '/gantt-demo1',
						name: 'Gantt1',
						component: () => import('@/views/gantt/index.vue'),
						meta: {
							title: '甘特图1',
							isMenu: true,
							icon: HomeOutlined,
						},
					},
					{
						path: '/gantt-demo2',
						name: 'Gantt2',
						component: () => import('@/views/gantt/index.vue'),
						meta: {
							title: '甘特图2',
							isMenu: true,
							icon: HomeOutlined,
						},
					},
				]
			}
		]
	},
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/404/index.vue') } // 404 路由
];

export default routes;

/**
 * 配置项说明示例
 * routes结构与菜单栏匹配，层级应与菜单栏结构相符合，假设菜单栏为：a菜单下有b,c菜单，b菜单有自己的编辑，则结构如下
 * {
		path: '/a',  ---- 根节点路由，必须用'/'开头
		name: 'A',
		component: Layout,   ---- 根节点路由，需要配置外层结构为目标组件
		redirect: '/a/b',   ---- 由于该路由本质是没有内容的，重定向到当前第一个路由
		meta: {
			title: 'a管理', ---- 显示在菜单栏的文字名称
			isChildMenu: true, ---- 对于父节点不是菜单但子节点是菜单的需要设置该参数，参考home
			isMenu: true,  ---- 是否是菜单栏，需要明确为true才会被展示在菜单栏
			icon: BankOutlined, ---- 展示在菜单左侧的icon
			keepAlive: true,  ---- 是否保活
			notInTabs: true, --- 不展示在顶部标签栏tabs，比如现有的编辑器页面
		},
		children: [
			{
				path: 'b',  ---- 子节点的路由开头不要有'/'，带'/'则会导致外层路由无效，无法匹配菜单
				---- 其他配置同上
			}，
			{
				path: 'b/edit',  ---- 需要与b在同一层级，且在b的路由下
				---- 其他配置同上
			}
		]
	}
 */