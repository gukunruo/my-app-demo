<template>
  <div>
    <h1>项目排期甘特图</h1>
    <!-- gantt模式选择区域 -->
    <div class="controls">
      <a-select
        v-model:value="currentViewMode"
        style="width: 120px"
        @change="changeViewMode"
      >
        <a-select-option v-for="mode in viewModes" :key="mode" :value="mode">
          {{ mode }}
        </a-select-option>
      </a-select>
      <a-slider
        v-model:value="sliderValue"
        :marks="sliderMarks"
        :min="0"
        :max="4"
        :step="1"
        style="width: 300px; margin: 0 60px"
        @change="handleSliderChange"
      />
    </div>
    <!-- gantt区域 -->
    <div class="gantt-container">
      <!-- 前部分列表 -->
      <a-table
        :columns="columns"
        :data-source="tasks"
        :pagination="false"
        class="gantt-table"
      >
        <template #bodyCell="{ column, record, index }">
          <!-- 角色 -->
          <template v-if="column.dataIndex === 'role'">
            {{
              index === 0 || tasks[index - 1].role !== record.role
                ? record.role
                : ""
            }}
          </template>
          <!-- 子需求 -->
          <template v-else-if="column.dataIndex.startsWith('subRequirement')">
            {{
              record.subRequirements[
                parseInt(column.dataIndex.slice(-1)) - 1
              ] || ""
            }}
          </template>
          <!-- 负责人 -->
          <template v-else-if="column.dataIndex === 'responsible'">
            {{
              index === 0 || tasks[index - 1].role !== record.role
                ? record.responsible
                : ""
            }}
          </template>
        </template>
      </a-table>
      <!-- gantt容器 -->
      <div class="gantt-chart-wrapper">
        <div ref="ganttChart" class="gantt-chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Gantt from "frappe-gantt";
import dayjs from "dayjs";

const ganttChart = ref(null);
const ganttInstance = ref(null);

const viewModes = ["Quarter Day", "Half Day", "Day", "Week", "Month"];
const currentViewMode = ref("Week");

const sliderValue = ref(3);
const sliderMarks = {
  0: "1/4天",
  1: "1/2天",
  2: "天",
  3: "周",
  4: "月",
};

// 任务数据
const tasks = [
  {
    id: "1",
    role: "产品",
    subRequirements: ["需求分析"],
    responsible: "张三",
    name: "张三",
    start: "2023-03-01",
    end: "2023-03-15",
    progress: 20,
  },
  {
    id: "2",
    role: "产品",
    subRequirements: ["需求分析"],
    responsible: "张三",
    name: "李四",
    start: "2023-03-05",
    end: "2023-03-20",
    progress: 0,
  },
  {
    id: "3",
    role: "UI",
    subRequirements: ["界面设计", "原型图"],
    responsible: "王五",
    name: "王五",
    start: "2023-03-16",
    end: "2023-03-31",
    progress: 0,
  },
  {
    id: "4",
    role: "前端",
    subRequirements: ["开发", "首页", "登录页"],
    responsible: "赵六",
    name: "赵六",
    start: "2023-04-01",
    end: "2023-04-15",
    progress: 0,
  },
  {
    id: "5",
    role: "测试",
    subRequirements: ["功能测试"],
    responsible: "钱七",
    name: "钱七",
    start: "2023-04-16",
    end: "2023-04-30",
    progress: 0,
  },
];

const maxSubRequirements = computed(() => {
  return Math.max(...tasks.map((task) => task.subRequirements.length));
});

// 动态生成列配置
const columns = computed(() => [
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
  },
  ...Array.from({ length: maxSubRequirements.value }, (_, i) => ({
    title: `子需求${i + 1}`,
    dataIndex: `subRequirement${i + 1}`,
    key: `subRequirement${i + 1}`,
  })),
  {
    title: "负责人",
    dataIndex: "responsible",
    key: "responsible",
  },
  {
    title: "参与人员",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
]);

const changeViewMode = (mode) => {
  if (ganttInstance.value) {
    ganttInstance.value.change_view_mode(mode);
  }
};

const handleSliderChange = (value) => {
  const mode = viewModes[value];
  currentViewMode.value = mode;
  changeViewMode(mode);
};

onMounted(() => {
  const start = dayjs().subtract(3, "day").format("YYYY-MM-DD");
  const end = dayjs().add(1, "year").format("YYYY-MM-DD");

  // 初始化甘特图
  ganttInstance.value = new Gantt(ganttChart.value, tasks, {
    header_height: 50,
    column_width: 30,
    step: 24,
    view_modes: viewModes,
    bar_height: 34,
    bar_corner_radius: 3,
    arrow_curve: 5,
    padding: 18,
    view_mode: currentViewMode.value,
    date_format: "YYYY-MM-DD",
    start: start,
    end: end,
    language: "zh", // or 'es', 'it', 'ru', 'ptBr', 'fr', 'tr', 'zh', 'de', 'hu'
    custom_popup_html: function (task) {
      const startDate = dayjs(task.start).format("YYYY-MM-DD");
      const endDate = dayjs(task.end).format("YYYY-MM-DD");
      return `
        <div class="details-container">
          <h5>${task.name}</h5>
          <p>开始: ${startDate}</p>
          <p>结束: ${endDate}</p>
          <p>角色: ${task.role}</p>
          <p>子需求: ${task.subRequirements.join(", ")}</p>
          <p>负责人: ${task.responsible}</p>
        </div>
      `;
    },
    on_date_change: function (task, start, end) {
      // 更新任务日期的逻辑
      console.log(`Task ${task.name} changed. New dates: ${start} to ${end}`);
    },
    on_progress_change: function (task, progress) {
      // 更新任务进度的逻辑
      console.log(`Task ${task.name} progress changed to ${progress}%`);
    },
    on_view_change: function (mode) {
      // 视图模式改变时的逻辑
      console.log(`View mode changed to ${mode}`);
    },
  });

  // 添加拖动切换模式功能
  let isDragging = false;
  let isScrolling = false;
  let startX, startY, startScrollLeft, startScrollTop;
  const ganttChartWrapper = ganttChart.value.closest(".gantt-chart-wrapper");

  ganttChartWrapper.addEventListener("mousedown", (e) => {
    startX = e.pageX - ganttChartWrapper.offsetLeft;
    startY = e.pageY - ganttChartWrapper.offsetTop;
    startScrollLeft = ganttChartWrapper.scrollLeft;
    startScrollTop = ganttChartWrapper.scrollTop;

    // 检查是否点击在任务上
    if (e.target.closest(".bar-wrapper")) {
      isDragging = true;
    } else {
      isScrolling = true;
    }

    ganttChartWrapper.style.cursor = "grabbing";
  });

  ganttChartWrapper.addEventListener("mousemove", (e) => {
    if (!isScrolling) return;

    const x = e.pageX - ganttChartWrapper.offsetLeft;
    const y = e.pageY - ganttChartWrapper.offsetTop;
    const walkX = (x - startX) * 2;
    const walkY = (y - startY) * 2;

    ganttChartWrapper.scrollLeft = startScrollLeft - walkX;
    ganttChartWrapper.scrollTop = startScrollTop - walkY;
  });

  ganttChartWrapper.addEventListener("mouseup", () => {
    isDragging = false;
    isScrolling = false;
    ganttChartWrapper.style.cursor = "default";
  });

  ganttChartWrapper.addEventListener("mouseleave", () => {
    isDragging = false;
    isScrolling = false;
    ganttChartWrapper.style.cursor = "default";
  });
});
</script>

<style lang="scss">
@import "frappe-gantt/dist/frappe-gantt.css";

.controls {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.gantt-container {
  display: flex;
  max-width: 100%;
  height: calc(100vh - 200px);
}

.gantt-table {
  flex: 0 0 auto;
  width: auto;
  min-width: 500px;
  overflow-y: auto;
}

.gantt-chart-wrapper {
  flex: 1 1 auto;
  overflow-x: auto;
  overflow-y: hidden; // 改为 hidden，因为垂直滚动已经在 .gantt-chart 中处理
  min-width: 0; // 允许容器缩小到小于其内容宽度
  width: 100%; // 确保占满剩余宽度
}

.gantt-chart {
  height: 100%;
  min-width: 100%;
  width: max-content; // 允许内容扩展beyond容器宽度
  overflow-y: auto;
}

.details-container {
  padding: 10px;
  background-color: white;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.gantt-container {
  font: 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

.gantt .bar-label {
  font-size: 11px;
}

.gantt .bar-label.big {
  font-size: 14px;
}

.gantt .bar-wrapper {
  height: 34px;
}

.gantt .lower-text {
  top: 17px;
}

.gantt .upper-text {
  top: -20px;
}

.ant-table-thead > tr > th {
  padding: 16px 8px;
  height: 60px;
}

.ant-table-tbody > tr > td {
  padding: 8px;
  height: 34px;
}

.gantt .grid-header {
  fill: #fafafa;
  stroke: #f0f0f0;
}

.gantt .grid-row {
  fill: #ffffff;
}

.gantt .row-line {
  stroke: #f0f0f0;
}

.gantt .tick {
  stroke: #e8e8e8;
}

// 拖动条
.gantt .bar {
  fill: #1890ff;
}

.gantt .bar-progress {
  fill: #096dd9;
}

.gantt .bar-invalid {
  fill: #ff4d4f;
}

.gantt .bar-label {
  fill: #000000;
}

.gantt .arrow {
  fill: none;
  stroke: #999;
  stroke-width: 1.5px;
}

// 确保表头固定
.ant-table-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}
</style>
