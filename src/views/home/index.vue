<template>
  <div class="home-container">
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card>
          <h1 class="welcome-text">欢迎回来，{{ username }}！</h1>
          <p class="sub-text">这里是您的个人仪表板概览</p>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="mt-4">
      <a-col :xs="24" :sm="12" :md="6" v-for="stat in stats" :key="stat.title">
        <a-card>
          <statistic
            :title="stat.title"
            :value="stat.value"
            :precision="stat.precision"
            :valueStyle="stat.valueStyle"
          >
            <template #prefix>
              <component :is="stat.icon" />
            </template>
            <template #suffix>
              <span v-if="stat.suffix">{{ stat.suffix }}</span>
            </template>
          </statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="mt-4">
      <a-col :span="16">
        <a-card title="最近活动">
          <a-timeline>
            <a-timeline-item
              v-for="activity in recentActivities"
              :key="activity.id"
            >
              {{ activity.text }}
            </a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="快速操作">
          <a-button-group>
            <a-button
              type="primary"
              v-for="action in quickActions"
              :key="action.text"
              @click="action.onClick"
            >
              {{ action.text }}
            </a-button>
          </a-button-group>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons-vue";

const username = ref("日落");

const stats = [
  {
    title: "项目总数",
    value: 78,
    icon: ProjectOutlined,
    valueStyle: { color: "#3f8600" },
  },
  {
    title: "团队成员",
    value: 12,
    icon: TeamOutlined,
    valueStyle: { color: "#cf1322" },
  },
  {
    title: "完成任务",
    value: 156,
    icon: ClockCircleOutlined,
    valueStyle: { color: "#234ebd" },
  },
  {
    title: "活跃用户",
    value: 323,
    icon: UserOutlined,
    suffix: "人",
    valueStyle: { color: "#faad14" },
  },
];

const recentActivities = [
  { id: 1, text: '张三完成了任务 "优化首页设计"' },
  { id: 2, text: '李四加入了项目 "客户管理系统"' },
  { id: 3, text: '王五更新了文档 "产品规划2023"' },
  { id: 4, text: "系统自动备份完成" },
];

const quickActions = [
  { text: "新建项目", onClick: () => console.log("新建项目") },
  { text: "添加任务", onClick: () => console.log("添加任务") },
  { text: "生成报告", onClick: () => console.log("生成报告") },
];
</script>

<style scoped>
.home-container {
  padding: 24px;
}

.welcome-text {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.sub-text {
  font-size: 16px;
  color: #8c8c8c;
}

.mt-4 {
  margin-top: 16px;
}
</style>
