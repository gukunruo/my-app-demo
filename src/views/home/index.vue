<template>
  <div class="personal-space">
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card class="welcome-card">
          <div class="user-info">
            <a-avatar :size="64" :src="userAvatar" />
            <div class="user-details">
              <h1>{{ username }}的个人空间</h1>
              <p>{{ userRole }} | 上次登录: {{ lastLogin }}</p>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="mt-4">
      <a-col :span="14">
        <a-card title="我的任务" :bodyStyle="{ height: '500px', overflow: 'auto' }">
          <a-list item-layout="horizontal" :data-source="tasks">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :description="item.dueDate">
                  <template #title>
                    <a-checkbox v-model:checked="item.completed">{{ item.title }}</a-checkbox>
                  </template>
                </a-list-item-meta>
                <template #extra>
                  <a-tag :color="item.priority === 'high' ? 'red' : item.priority === 'medium' ? 'orange' : 'green'">
                    {{ item.priority }}
                  </a-tag>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card title="快速笔记" :bodyStyle="{ height: '500px', display: 'flex', flexDirection: 'column' }">
          <div :style="{flex: '1', display: 'flex', flexDirection: 'column'}">
            <a-textarea
              v-model:value="quickNote"
              :rows="6"
              placeholder="在这里写下你的想法..."
              :style="{marginBottom: '16px', flex: '1'}"
            />
            <div :style="{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}">
              <a-button type="primary" @click="saveNote">保存笔记</a-button>
              <a-select
                v-model:value="selectedCategory"
                style="width: 120px"
                placeholder="选择分类"
              >
                <a-select-option value="work">工作</a-select-option>
                <a-select-option value="personal">个人</a-select-option>
                <a-select-option value="ideas">创意</a-select-option>
              </a-select>
            </div>
          </div>
          <a-divider>已保存的笔记</a-divider>
          <div style="flex: 1; overflow-y: auto">
            <a-list :data-source="savedNotes">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta :description="item.date">
                    <template #title>
                      <div style="display: flex; alignItems: center; justifyContent: space-between">
                        <span>{{ item.content.substring(0, 20) + '...' }}</span>
                        <a-tag color="blue">{{ item.category }}</a-tag>
                      </div>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="mt-4">
      <a-col :span="12">
        <a-card title="近期日程">
          <a-calendar :fullscreen="false" @select="onSelect" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="我的项目" :bodyStyle="{ height: '300px', overflow: 'auto' }">
          <a-list :data-source="projects">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #title>
                    <a :href="item.link">{{ item.name }}</a>
                  </template>
                  <template #description>
                    <div>{{ item.description }}</div>
                    <a-progress :percent="item.progress" size="small" :status="getProgressStatus(item.progress)" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';

// 欢迎卡片
const username = ref('日落');
const userRole = ref('前端开发工程师');
const userAvatar = ref('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png');
const lastLogin = ref('');

const formatDate = (date) => {
  const pad = (n) => n < 10 ? '0' + n : n;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// 任务
const tasks = ref([]);
const generateTasks = () => {
  const today = new Date();
  return [
    { id: 1, title: '完成项目方案', completed: false, dueDate: formatDate(today), priority: 'high' },
    { id: 2, title: '代码审查', completed: true, dueDate: formatDate(addDays(today, 1)), priority: 'medium' },
    { id: 3, title: '团队会议', completed: false, dueDate: formatDate(addDays(today, 2)), priority: 'low' },
    { id: 4, title: '优化性能', completed: false, dueDate: formatDate(addDays(today, 3)), priority: 'high' },
  ];
};
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// 快速笔记
const quickNote = ref('');
const savedNotes = ref([]);
const selectedCategory = ref('work');
const saveNote = () => {
  if (quickNote.value.trim()) {
    savedNotes.value.unshift({
      content: quickNote.value,
      date: formatDate(new Date()),
      category: selectedCategory.value
    });
    quickNote.value = '';
    message.success('笔记已保存');
  } else {
    message.warning('笔记内容不能为空');
  }
};

// 项目
const projects = ref([
  { id: 1, name: '客户管理系统', description: '开发进行中', progress: 60, link: '#' },
  { id: 2, name: '数据分析平台', description: '即将开始', progress: 0, link: '#' },
  { id: 3, name: '移动应用重构', description: '已完成80%', progress: 80, link: '#' },
]);
const getProgressStatus = (progress) => {
  if (progress === 100) return 'success';
  if (progress >= 80) return 'active';
  return 'normal';
};

// 日期选择
const onSelect = (date) => {
  message.info(`您选择了 ${date.format('YYYY-MM-DD')}`);
};

onMounted(() => {
  // 在组件挂载时设置登录时间
  lastLogin.value = formatDate(new Date());
  tasks.value = generateTasks();
});
</script>

<style scoped>
.personal-space {
  padding: 24px;
}

.welcome-card {
  background: linear-gradient(135deg, #13c2c2 0%, #52c41a 100%);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.user-info {
  display: flex;
  align-items: center;
}

.user-details {
  margin-left: 16px;
}

.user-details h1 {
  color: white;
  margin-bottom: 4px;
}

.user-details p {
  color: rgba(255, 255, 255, 0.85);
}

.mt-2 {
  margin-top: 8px;
}

.mt-4 {
  margin-top: 16px;
  padding: 8px;
}
</style>
