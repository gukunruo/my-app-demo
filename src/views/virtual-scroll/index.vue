<template>
  <div class="virtual-scroll-container">
    <RecycleScroller
      class="scroller"
      :items="items"
      :item-size="300"
      key-field="id"
      v-slot="{ item }"
    >
      <div class="card">
        <img :src="item.imageUrl" :alt="item.title" class="card-image" />
        <div class="card-content">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-description">{{ item.description }}</p>
          <div class="card-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
          <div class="card-footer">
            <span class="create-time">{{ item.createTime }}</span>
          </div>
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>

<!--
  默认情况下，vue-virtual-scroller 不会自动限制初始加载的数据量
  它会加载你传入 items 数组中的所有数据（比如你传入100条，就会加载100条）
  但是它会通过虚拟滚动技术，只渲染可视区域内的项目

  items 滚动条中显示的项目列表
  direction 滚动方向 默认 vertical 垂直滚动 也可设置 horizontal 水平滚动
  item-size 显示项目的高度 默认 null（可变尺寸模式 性能不好）
  key-field 表示唯一标识
  v-slot="{ item }" 获取当前渲染项目数据的方式
-->

<script setup lang="ts">
import { ref } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { mockData } from './data'

const items = ref(mockData)
</script>

<style scoped>
.virtual-scroll-container {
  height: calc(100vh - 100px);
  width: 100%;
  padding: 20px;
}

.scroller {
  height: 100%;
  overflow-y: auto;
}

.card {
  margin: 10px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.card-description {
  margin: 0 0 16px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.create-time {
  font-size: 12px;
  color: #999;
}
</style>
