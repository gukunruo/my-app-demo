import Home from '../views/home/index.vue';
import Gantt from '../views/gantt/index.vue';

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/gantt', name: 'Gantt', component: Gantt },
];

export default routes;