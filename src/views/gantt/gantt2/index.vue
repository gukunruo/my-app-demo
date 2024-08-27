<template>
  <div class="gantt-container">
    <div class="controls">
      <a-slider
        :min="0"
        :max="4"
        :step="1"
        v-model:value="sliderValue"
        :marks="sliderMarks"
        @change="handleSliderChange"
      />
    </div>
    <div class="gantt-wrapper">
      <XGantt
        ref="ganttRef"
        :data="tasks"
        :columns="columns"
        :start-date="startDate"
        :end-date="endDate"
        :view-mode="currentViewMode"
        :task-height="40"
        :row-height="50"
        :column-width="60"
        @task-click="handleTaskClick"
      >
        <template #popup="{ task }">
          <div class="details-container">
            <h5>{{ task.name }}</h5>
            <p>开始: {{ task.start_date }}</p>
            <p>结束: {{ task.end_date }}</p>
            <p>角色: {{ task.role }}</p>
            <p>子需求: {{ task.subRequirements.join(", ") }}</p>
            <p>负责人: {{ task.responsible }}</p>
            <p>进度: {{ task.progress }}%</p>
          </div>
        </template>
      </XGantt>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { XGantt } from '@xpyjs/gantt';
import '@xpyjs/gantt/dist/style.css';
import dayjs from 'dayjs';
import { Slider } from 'ant-design-vue';

const ganttRef = ref(null);

const viewModes = ['quarterDay', 'halfDay', 'day', 'week', 'month'];
const currentViewMode = ref('week');

const sliderValue = ref(3);
const sliderMarks = {
  0: 'Quarter Day',
  1: 'Half Day',
  2: 'Day',
  3: 'Week',
  4: 'Month',
};

const tasks = [
  {
    id: '1',
    role: '产品',
    subRequirements: ['需求分析'],
    responsible: '张三',
    name: '需求分析',
    start_date: '2023-03-01',
    end_date: '2023-03-15',
    progress: 20,
  },
  {
    id: '2',
    role: '设计',
    subRequirements: ['UI设计', 'UX设计'],
    responsible: '李四',
    name: 'UI/UX设计',
    start_date: '2023-03-16',
    end_date: '2023-03-31',
    progress: 0,
  },
  {
    id: '3',
    role: '开发',
    subRequirements: ['前端开发', '后端开发'],
    responsible: '王五',
    name: '系统开发',
    start_date: '2023-04-01',
    end_date: '2023-05-15',
    progress: 0,
  },
  {
    id: '4',
    role: '测试',
    subRequirements: ['功能测试', '性能测试'],
    responsible: '赵六',
    name: '系统测试',
    start_date: '2023-05-16',
    end_date: '2023-05-31',
    progress: 0,
  },
];

const maxSubRequirements = computed(() => {
  return Math.max(...tasks.map((task) => task.subRequirements.length));
});

const columns = computed(() => [
  {
    name: 'role',
    label: '角色',
    width: 80,
  },
  ...Array.from({ length: maxSubRequirements.value }, (_, i) => ({
    name: `subRequirement${i + 1}`,
    label: `子需求${i + 1}`,
    width: 100,
    formatter: (task) => task.subRequirements[i] || '',
  })),
  {
    name: 'responsible',
    label: '负责人',
    width: 80,
  },
  {
    name: 'name',
    label: '任务名称',
    width: 100,
  },
]);

const startDate = dayjs().subtract(3, 'day').format('YYYY-MM-DD');
const endDate = dayjs().add(1, 'year').format('YYYY-MM-DD');

const handleSliderChange = (value) => {
  const mode = viewModes[value];
  currentViewMode.value = mode;
};

const handleTaskClick = (task) => {
  console.log('Task clicked:', task);
};
</script>

<style lang="scss">
.gantt-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.gantt-wrapper {
  flex: 1;
  overflow: hidden;
}

.x-gantt {
  height: 100%;
}

.details-container {
  padding: 10px;
  background-color: white;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.x-gantt__table-header {
  background-color: #fafafa;
  font-weight: bold;
}

.x-gantt__table-body {
  .x-gantt__table-row:nth-child(even) {
    background-color: #f9f9f9;
  }
}

.x-gantt__chart-row {
  height: 40px;
}

.x-gantt__bar {
  background-color: #1890ff;
  border-radius: 3px;

  &-progress {
    background-color: #096dd9;
  }
}

.x-gantt__bar-label {
  font-size: 12px;
  color: #fff;
}

.x-gantt__grid-header {
  fill: #fafafa;
  stroke: #f0f0f0;
}

.x-gantt__tick {
  stroke: #e8e8e8;
}

.x-gantt__today-highlight {
  fill: rgba(255, 0, 0, 0.1);
}
</style>
