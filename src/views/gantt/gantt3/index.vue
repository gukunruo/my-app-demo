<template>
  <div class="project-schedule">
    <h1>项目排期甘特图</h1>
    <div class="controls">
      <a-select
        v-model:value="currentPrecision"
        style="width: 120px"
        @change="changePrecision"
      >
        <a-select-option
          v-for="precision in precisions"
          :key="precision"
          :value="precision"
        >
          {{ precisionLabels[precision] }}
        </a-select-option>
      </a-select>
    </div>
    <div class="schedule-container">
      <div class="table-container">
        <a-table
          :columns="columns"
          :data-source="tasks"
          :pagination="false"
          :row-class-name="() => 'custom-row'"
        >
        <template #headerCell="{ column }">
      <div :style="{ height: '47px', lineHeight: '47px' }">
        {{ column.title }}
      </div>
    </template>
      </a-table>
      </div>
      <div class="gantt-container">
        <g-gantt-chart
          :chart-start="chartStart"
          :chart-end="chartEnd"
          :precision="currentPrecision"
          bar-start="startDate"
          bar-end="endDate"
          :date-format="dateFormat"
          :grid-width="1440"
          :handle-width="10"
          :bar-height="30"
          :row-height="50"
          @bar-event="onBarEvent"
        >
          <g-gantt-row
            v-for="task in tasks"
            :key="task.id"
            :label="task.name"
            :bars="[task]"
          />
        </g-gantt-chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const chartStart = ref("2023-03-01");
const chartEnd = ref("2023-05-31");

const precisions = ["month", "week", "day"];
const currentPrecision = ref("week");
const precisionLabels = {
  month: "月",
  week: "周",
  day: "日"
};

const dateFormat = "YYYY-MM-DD";

const columns = [
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
    width: 80,
    ellipsis: true,
  },
  {
    title: "子需求1",
    dataIndex: "subRequirement1",
    key: "subRequirement1",
    width: 80,
    ellipsis: true,
  },
  {
    title: "子需求2",
    dataIndex: "subRequirement2",
    key: "subRequirement2",
    width: 80,
    ellipsis: true,
  },
  {
    title: "负责人",
    dataIndex: "responsible",
    key: "responsible",
    width: 60,
    ellipsis: true,
  },
  {
    title: "参与人员",
    dataIndex: "name",
    key: "name",
    width: 80,
    ellipsis: true,
  },
];

const tasks = ref([
  {
    id: "1",
    role: "产品经理",
    subRequirement1: "需求分析",
    subRequirement2: "用户调研",
    responsible: "张三",
    name: "张三",
    startDate: "2023-03-01",
    endDate: "2023-03-15",
    ganttBarConfig: {
      id: "task-1",
      label: "张三",
      hasHandles: true,
      style: { background: "#e09b69", borderRadius: "5px" },
    },
  },
  {
    id: "2",
    role: "产品经理",
    subRequirement1: "需求分析",
    subRequirement2: "用户调研",
    responsible: "张三",
    name: "李四",
    startDate: "2023-03-05",
    endDate: "2023-03-20",
    ganttBarConfig: {
      id: "task-2",
      label: "李四",
      hasHandles: true,
      style: { background: "#e09b69", borderRadius: "5px" },
    },
  },
  {
    id: "3",
    role: "UI设计师",
    subRequirement1: "界面设计",
    subRequirement2: "交互设计",
    responsible: "李四",
    name: "王五",
    startDate: "2023-03-10",
    endDate: "2023-03-25",
    ganttBarConfig: {
      id: "task-3",
      label: "王五",
      hasHandles: true,
      style: { background: "#7db0dd", borderRadius: "5px" },
    },
  },
  {
    id: "4",
    role: "前端开发",
    subRequirement1: "页面开发",
    subRequirement2: "功能实现",
    responsible: "王五",
    name: "赵六",
    startDate: "2023-03-20",
    endDate: "2023-04-15",
    ganttBarConfig: {
      id: "task-4",
      label: "赵六",
      hasHandles: true,
      style: { background: "#4caf50", borderRadius: "5px" },
    },
  },
  {
    id: "5",
    role: "测试工程师",
    subRequirement1: "功能测试",
    subRequirement2: "性能测试",
    responsible: "赵六",
    name: "钱七",
    startDate: "2023-04-10",
    endDate: "2023-04-25",
    ganttBarConfig: {
      id: "task-5",
      label: "钱七",
      hasHandles: true,
      style: { background: "#ff9800", borderRadius: "5px" },
    },
  },
]);

const changePrecision = (precision) => {
  currentPrecision.value = precision;
};

const onBarEvent = (event) => {
  if (event.type === "change") {
    const { element, changes } = event;
    changes.newStart = new Date(changes.newStart).toISOString().split("T")[0];
    changes.newEnd = new Date(changes.newEnd).toISOString().split("T")[0];

    const start = new Date(changes.newStart);
    const end = new Date(changes.newEnd);
    if (end <= start) {
      changes.newEnd = new Date(start.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
    }

    const task = tasks.value.find(
      (t) => t.id === element.ganttBarConfig.id.replace("task-", "")
    );
    if (task) {
      task.startDate = changes.newStart;
      task.endDate = changes.newEnd;
    }
  }
};
</script>

<style scoped lang="scss">
.project-schedule {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.schedule-container {
  display: flex;
  height: calc(100vh - 200px);
  overflow: hidden;
}

.table-container {
  flex: 0.8;
  min-width: 20%;
  overflow-x: auto;
}

.gantt-container {
  flex: auto;
  overflow-x: auto;
  overflow-y: hidden;
}

:deep(.custom-row) {
  line-height: 17px;
}

:deep(.ant-table-body) {
  overflow-y: auto !important;
  max-height: calc(100vh - 250px) !important;
}
</style>
