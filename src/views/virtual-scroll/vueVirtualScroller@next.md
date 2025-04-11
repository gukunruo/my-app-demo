# Vue Virtual Scroller 使用文档

## 安装

```bash
# 使用 npm
npm install vue-virtual-scroller@next

# 使用 yarn
yarn add vue-virtual-scroller@next

# 使用 pnpm
pnpm add vue-virtual-scroller@next
```

## 基础使用

### 1. 全局注册（可选）

```typescript
// main.ts
import { createApp } from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)
app.use(VueVirtualScroller)
```

### 2. 组件中使用（Setup语法糖）

```vue
<template>
  <RecycleScroller
    class="scroller"
    :items="items"
    :item-size="50"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="item">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

interface Item {
  id: number
  name: string
}

const items = ref<Item[]>([
  // 你的数据列表
])
</script>

<style scoped>
.scroller {
  height: 500px;
}
</style>
```

## 主要组件

vue-virtual-scroller 提供了三个主要组件：

1. **RecycleScroller**：最常用的虚拟滚动组件，适用于固定高度的项目
2. **DynamicScroller**：适用于可变高度的项目
3. **DynamicScrollerItem**：配合 DynamicScroller 使用，用于包装可变高度的项目

## RecycleScroller 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| items | Array | required | 要渲染的数据数组 |
| item-size | Number | required | 每个项目的固定高度（像素） |
| key-field | String | 'id' | 数据项中用作 key 的字段名 |
| direction | String | 'vertical' | 滚动方向，可选 'vertical' 或 'horizontal' |
| buffer | Number | 200 | 预渲染区域的像素大小 |
| page-mode | Boolean | false | 是否启用页面模式 |
| prerender | Number | 0 | 预渲染的项目数量 |

## DynamicScroller 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| items | Array | required | 要渲染的数据数组 |
| min-item-size | Number | required | 项目的最小高度（像素） |
| key-field | String | 'id' | 数据项中用作 key 的字段名 |

## 事件

| 事件名 | 参数 | 描述 |
|--------|------|------|
| @resize | - | 容器大小改变时触发 |
| @visible | (startIndex, endIndex) | 可见项目范围改变时触发 |
| @scroll | ({ process }) | 滚动时触发，process 表示滚动进度(0-1) |

## 常见使用场景

### 1. 固定高度列表

```vue
<template>
  <RecycleScroller
    class="scroller"
    :items="items"
    :item-size="50"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="item">{{ item.name }}</div>
  </RecycleScroller>
</template>
```

### 2. 动态高度列表

```vue
<template>
  <DynamicScroller
    class="scroller"
    :items="items"
    :min-item-size="54"
    key-field="id"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[item.message]"
      >
        <div class="item">
          <div class="name">{{ item.name }}</div>
          <div class="message">{{ item.message }}</div>
        </div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
```

### 3. 无限滚动加载

```vue
<template>
  <RecycleScroller
    class="scroller"
    :items="items"
    :item-size="50"
    @scroll="handleScroll"
  >
    <template #default="{ item }">
      <div class="item">{{ item.name }}</div>
    </template>
  </RecycleScroller>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([])
const loading = ref(false)

const handleScroll = async ({ process }) => {
  if (process > 0.8 && !loading.value) {
    loading.value = true
    // 加载更多数据
    const newItems = await loadMoreData()
    items.value = [...items.value, ...newItems]
    loading.value = false
  }
}
</script>
```

## 性能优化建议

1. **设置合适的 buffer**：
   - buffer 值过大会渲染更多不可见的项目
   - buffer 值过小可能导致滚动时出现白屏
   - 建议根据项目高度和滚动速度调整，一般在 200-400px 之间

2. **使用正确的项目大小**：
   - 对于 RecycleScroller，确保 item-size 与实际项目高度匹配
   - 对于 DynamicScroller，设置合适的 min-item-size

3. **避免不必要的重渲染**：
   - 使用 v-memo 缓存稳定的项目
   - 对于复杂项目，考虑使用 shallowRef

4. **优化项目内容**：
   - 减少每个项目的 DOM 节点数量
   - 使用 CSS containment 优化渲染性能
   - 避免在项目中使用复杂的动画

## 常见问题解决

1. **滚动位置跳动**：
   - 确保 item-size 准确设置
   - 检查是否有动态内容导致高度变化
   - 考虑使用 DynamicScroller 替代 RecycleScroller

2. **性能问题**：
   - 减少每个项目的复杂度
   - 使用 key-field 优化更新
   - 适当增加 buffer 大小

3. **白屏问题**：
   - 增加 prerender 值
   - 检查 buffer 设置
   - 确保数据加载时机正确

## 最佳实践

1. **数据管理**：
   ```typescript
   const items = ref<Item[]>([])
   const pageSize = 20
   const loading = ref(false)
   
   const loadMore = async () => {
     if (loading.value) return
     loading.value = true
     try {
       const newItems = await fetchData(pageSize)
       items.value = [...items.value, ...newItems]
     } finally {
       loading.value = false
     }
   }
   ```

2. **性能优化**：
   ```vue
   <RecycleScroller
     :items="items"
     :item-size="50"
     :buffer="200"
     page-mode
   >
     <template #default="{ item }">
       <div class="item" v-memo="[item.id, item.updated]">
         <!-- 项目内容 -->
       </div>
     </template>
   </RecycleScroller>
   ```

3. **样式设置**：
   ```css
   .scroller {
     height: 100vh;
     contain: strict;
   }
   
   .item {
     contain: content;
     will-change: transform;
   }
   ```

## 注意事项

1. 必须为容器设置固定高度或最大高度
2. 确保正确导入样式文件
3. 在使用 TypeScript 时定义好数据接口
4. 注意内存管理，及时清理不需要的数据
5. 考虑移动端的触摸事件和滚动体验
6. 在路由切换时正确处理组件销毁
7. 避免在滚动过程中进行复杂计算
