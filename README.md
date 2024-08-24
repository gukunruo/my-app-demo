# Vue 3 + Vite

# Background

my-app-demo 测试demo

## 依赖安装（首次或者后续更新）

```
pnpm install
```

#### 为什么使用 pnpm

1. 安装更快，占用项目体积更小
2. 解决幽灵依赖问题——没有在根目录的 package.json 中依赖的包，不允许直接引用（这么做很危险，排除问题带来极大挑战）

- 安装依赖过程中，如果遇到报错 Cannot read properties of null (reading ‘pickAlgorithm‘) 可以删除 package-lock.json 重新安装依赖

### 启动开发环境

```
pnpm dev
#or
pnpm run dev
```

### 编译

```
pnpm run build
```

### Lints and fixes files 还未配置

```
pnpm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 备注



### 代码规范

- vscode 插件安装：eslint prettier stylelint
- 组件命名规范：文件夹采用xxx-zzz，文件夹下创建 index.vue 文件，作为默认组件文件，也可以有edit.vue 作为其他组件
- 组件属性定义：小驼峰 例如：customProp 组件传参：中划线分割 例如：custom-prop
- 组件事件命名：中划线分割 例如：custom-event
- 组件变量和方法命名：小驼峰 例如: getList
- 样式类名：中划线命名 例如：container-text
- 公共组件命名：以 C 开头 例如：CButton(表示 commonButton)
- 常量命名：大驼峰，例如：EditType，仅在当前页面使用的常量定义在当前页面，多处使用的常量统一定义在config/constant文件夹下
- 以下几项保持一致，统一规范
  - router/routes.js中routes结构与菜单栏结构强相关，菜单栏是根据routes结构生成（具体示例见routes.js文件）
  - views目录结构与router/routes.js文件中routes结构保持一致，文件夹命名与path一致
  - api目录结构与views目录结构一致，方便接口查找