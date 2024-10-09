<!-- eslint-disable no-console -->
<!-- eslint-disable n/no-extraneous-import -->
<script setup>
import { computed, ref } from 'vue';

import { XGantt, XGanttColumn, XGanttSlider } from '@xpyjs/gantt';
import { message } from 'ant-design-vue';

import '@xpyjs/gantt/dist/index.css';

const unit = ref('day'); // month、week、day、hour

const themeColor = ref('#cfd8f5');

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0); // 设置时间为0点

const dataList = ref([
  // {
  //   endDate: currentDate.setDate(30),
  //   id: 'project',
  //   name: '用户管理系统开发',
  //   requirement: '用户管理系统',
  //   startDate: currentDate.setDate(1),
  //   children: [
  {
    id: 'product',
    name: '产品',
    requirement: '用户管理系统',
    responsible: '',
    children: [
      {
        id: 'product-1',
        name: '需求分析',
        startDate: currentDate.setDate(1),
        endDate: currentDate.setDate(5),
        requirement: '用户管理系统',
        subRequirement: '需求文档',
        responsible: '张三',
        participant: '张三',
        o: { t1: 'task-product-1', t2: 'task-product-3' },
      },
      {
        id: 'product-2',
        name: '产品设计',
        startDate: currentDate.setDate(6),
        endDate: currentDate.setDate(10),
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
        startDate: currentDate.setDate(6),
        endDate: currentDate.setDate(15),
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
        startDate: currentDate.setDate(11),
        endDate: currentDate.setDate(20),
        requirement: '用户管理系统',
        subRequirement: '登录功能',
        responsible: '王五',
        participant: '王五',
        o: { t1: 'task-frontend-1' },
      },
      {
        id: 'frontend-2',
        name: '用户列表页面开发',
        startDate: currentDate.setDate(16),
        endDate: currentDate.setDate(25),
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
        startDate: currentDate.setDate(11),
        endDate: currentDate.setDate(25),
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
        startDate: currentDate.setDate(26),
        endDate: currentDate.setDate(30),
        requirement: '用户管理系统',
        subRequirement: '系统测试',
        responsible: '孙八',
        participant: '孙八',
        o: { t1: 'task-testing-1' },
      },
    ],
  },
  //   ],
  // },
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
  // const a = row.participant || '';
  // debugger;
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

const handleRowClick = (row) => {
  console.log(row);
};
const handleRowDoubleClick = (row) => {
  console.log(row);
};
const handleSliderClick = (row) => {
  message.info('点击了滑块');
  console.log(row);
};
</script>
<!-- https://xpyjs.github.io/gantt/docs/root.html#move-slider 使用文档 -->
<template>
  <div>
    <h1>用户管理系统开发甘特图</h1>
    <XGantt
      :data="dataList"
      :primary-color="themeColor"
      :unit="unit"
      data-id="id"
      highlight-date
      locale="zh"
      row-height="45"
      show-today
      show-weekend
      @row-click="handleRowClick"
      @row-dbl-click="handleRowDoubleClick"
    >
      <XGanttColumn empty-data="" label="角色" prop="name" width="180" />
      <XGanttColumn
        v-if="maxDepth <= 2"
        empty-data=""
        label="需求"
        prop="requirement"
        width="120"
      />
      <XGanttColumn v-else empty-data="" label="需求">
        <XGanttColumn
          empty-data=""
          label="需求"
          prop="requirement"
          width="120"
        />
        <XGanttColumn
          empty-data=""
          label="子需求"
          prop="subRequirement"
          width="120"
        />
      </XGanttColumn>
      <XGanttColumn
        empty-data=""
        label="负责人"
        prop="responsible"
        width="100"
      />
      <XGanttColumn
        empty-data=""
        label="参与人员"
        prop="participant"
        width="100"
      >
        <template #default="{ row }">
          {{ getParticipant(row) }}
        </template>
      </XGanttColumn>
      <XGanttSlider
        :allow-link="false"
        :bg-color="themeColor"
        empty-data=""
        height="80%"
        linked-resize
        move
        move-by-unit
        prop="o.t1"
        resize-left
        resize-right
        @click="handleSliderClick"
      >
        <template #default="{ row }">
          <div style="height: 100%; line-height: normal; color: #fff">
            {{ row.name }}
          </div>
        </template>
      </XGanttSlider>
    </XGantt>
  </div>
</template>

<style scoped></style>
