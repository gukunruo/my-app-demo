<!-- eslint-disable n/no-extraneous-import -->
<script setup>
import { computed, ref } from 'vue';

import { XGantt, XGanttColumn, XGanttSlider } from '@xpyjs/gantt';

import '@xpyjs/gantt/dist/index.css';

const options = {
  cellHeight: 40,
  cellWidth: 50,
  dataKey: 'id',
  endDate: new Date().setDate(30),
  showCurrentTime: true,
  startDate: new Date().setDate(1),
  titleHeight: 40,
};

const dataList = ref([
  {
    endDate: new Date().setDate(30),
    id: 'project',
    name: '用户管理系统开发',
    requirement: '用户管理系统',
    startDate: new Date().setDate(1),
    children: [
      {
        id: 'product',
        name: '产品',
        requirement: '用户管理系统',
        children: [
          {
            id: 'product-1',
            name: '需求分析',
            startDate: new Date().setDate(1),
            endDate: new Date().setDate(5),
            requirement: '用户管理系统',
            subRequirement: '需求文档',
            responsible: '张三',
            participant: '张三',
            o: { t1: 'task-product-1', t2: 'task-product-3' },
          },
          {
            id: 'product-2',
            name: '产品设计',
            startDate: new Date().setDate(6),
            endDate: new Date().setDate(10),
            requirement: '用户管理系统',
            subRequirement: '产品原型',
            responsible: '张三',
            participant: '张三',
            o: { t1: 'task-product-2' },
          },
        ],
      },
      {
        id: 'ui',
        name: 'UI设计',
        requirement: '用户管理系统',
        children: [
          {
            id: 'ui-1',
            name: '界面设计',
            startDate: new Date().setDate(6),
            endDate: new Date().setDate(15),
            requirement: '用户管理系统',
            subRequirement: 'UI设计稿',
            responsible: '李四',
            participant: '李四',
            o: { t1: 'task-ui-1' },
          },
        ],
      },
      {
        id: 'frontend',
        name: '前端开发',
        requirement: '用户管理系统',
        children: [
          {
            id: 'frontend-1',
            name: '登录页面开发',
            startDate: new Date().setDate(11),
            endDate: new Date().setDate(20),
            requirement: '用户管理系统',
            subRequirement: '登录功能',
            responsible: '王五',
            participant: '王五',
            o: { t1: 'task-frontend-1' },
          },
          {
            id: 'frontend-2',
            name: '用户列表页面开发',
            startDate: new Date().setDate(16),
            endDate: new Date().setDate(25),
            requirement: '用户管理系统',
            subRequirement: '用户列表',
            responsible: '赵六',
            participant: '赵六',
            o: { t1: 'task-frontend-2' },
          },
        ],
      },
      {
        id: 'backend',
        name: '服务端开发',
        requirement: '用户管理系统',
        children: [
          {
            id: 'backend-1',
            name: 'API开发',
            startDate: new Date().setDate(11),
            endDate: new Date().setDate(25),
            requirement: '用户管理系统',
            subRequirement: '后端API',
            responsible: '钱七',
            participant: '钱七',
            o: { t1: 'task-backend-1' },
          },
        ],
      },
      {
        id: 'testing',
        name: '测试',
        requirement: '用户管理系统',
        children: [
          {
            id: 'testing-1',
            name: '功能测试',
            startDate: new Date().setDate(26),
            endDate: new Date().setDate(30),
            requirement: '用户管理系统',
            subRequirement: '系统测试',
            responsible: '孙八',
            participant: '孙八',
            o: { t1: 'task-testing-1' },
          },
        ],
      },
    ],
  },
]);

// 计算数据的最大深度
const maxDepth = computed(() => {
  let maxDepth = 0;
  const stack = dataList.value.map((item) => ({ depth: 1, item }));

  while (stack.length > 0) {
    const { depth, item } = stack.pop();
    maxDepth = Math.max(maxDepth, depth);

    if (item.children && item.children.length > 0) {
      stack.push(
        ...item.children.map((child) => ({ depth: depth + 1, item: child })),
      );
    }
  }

  return maxDepth;
});

const getParticipant = (row) => {
  // 方案：隐藏父层级的参与人员
  return row.participant || '';

  // 方案：展示父层级参与人员
  // if (row.participant) {
  //   return row.participant;
  // }
  // if (row.participants && row.participants.length > 0) {
  //   return row.participants.join(',');
  // }
  // return '';
};
</script>

<template>
  <div>
    <h1>用户管理系统开发甘特图</h1>
    <XGantt :data="dataList" :options="options">
      <XGanttColumn label="任务/角色" prop="name" width="200" />
      <XGanttColumn label="需求" prop="requirement" width="150" />
      <XGanttColumn
        v-if="maxDepth >= 2"
        label="子需求"
        prop="subRequirement"
        width="150"
      />
      <XGanttColumn label="负责人" prop="responsible" width="100" />
      <XGanttColumn label="参与人员" prop="participant" width="100">
        <template #default="{ row }">
          {{ getParticipant(row) }}
        </template>
      </XGanttColumn>
      <XGanttSlider move prop="o.t1" >
        <!-- <div><button>3333</button></div> -->
      </XGanttSlider>
    </XGantt>
  </div>
</template>

<style scoped>
/* 可以添加自定义样式 */
</style>
