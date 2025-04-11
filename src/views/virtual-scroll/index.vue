<template>
  <div class="virtual-scroll-container">
    <RecycleScroller
      class="scroller"
      :items="items"
      :item-size="350"
      key-field="id"
      v-slot="{ item }"
    >
      <div class="card">
        <div class="card-image-wrapper">
          <img
            :src="item.imageUrl"
            :alt="item.title"
            class="card-image"
            :key="item.id"
          />
          <div class="card-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-description">{{ item.description }}</p>
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
}

.scroller {
  height: 100%;
  overflow-y: auto;
  padding: 10px;
}

.card {
  height: 350px;
  margin: 15px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card.hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card.hover .card-image {
  transform: scale(1.05);
}

.card-tags {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  font-size: 12px;
  color: #409eff;
  font-weight: 500;
  backdrop-filter: blur(4px);
}

.card-content {
  padding: 20px;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
}

.card-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.card-description {
  margin: 0 0 16px;
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid #ebeef5;
}

.create-time {
  font-size: 12px;
  color: #909399;
}

/* 自定义滚动条样式 */
.scroller::-webkit-scrollbar {
  width: 6px;
}

.scroller::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.scroller::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.scroller::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
