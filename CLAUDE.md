# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Halolight Nuxt 是一个基于 Nuxt 3 + Vue 3 的现代化中文后台管理系统，具备全栈能力和卓越的开发体验。

- **在线预览**: https://halolight-nuxt.h7ml.cn
- **GitHub**: https://github.com/halolight/halolight-nuxt

## 技术栈速览

- **核心框架**: Nuxt 3.10 + Vue 3.5
- **构建工具**: Vite (内置)
- **路由**: Nuxt 文件路由 (基于 Vue Router)
- **样式**: Tailwind CSS (CDN)
- **状态管理**: Pinia
- **类型**: TypeScript

## 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 生产构建
pnpm generate     # 静态站点生成 (SSG)
pnpm preview      # 预览构建产物
pnpm postinstall  # 生成类型 (nuxt prepare)
pnpm typecheck    # 类型检查
pnpm lint         # 代码检查
pnpm lint:fix     # 代码检查并修复
pnpm test         # 运行测试 (watch 模式)
pnpm test:run     # 运行测试 (单次)
pnpm test:coverage # 运行测试并生成覆盖率报告
```

## 目录结构

```
├── nuxt.config.ts    # Nuxt 配置
├── app.vue           # 应用根组件
├── pages/            # 页面路由
│   ├── index.vue     # / 首页（重定向到登录）
│   ├── login.vue     # 登录页
│   ├── register.vue  # 注册页
│   ├── forgot-password.vue
│   ├── reset-password.vue
│   ├── terms.vue     # 服务条款
│   ├── privacy.vue   # 隐私政策
│   ├── dashboard/    # 仪表盘
│   ├── users/        # 用户管理
│   ├── messages/     # 消息中心
│   ├── analytics/    # 数据分析
│   ├── profile/      # 个人中心
│   └── settings/     # 系统设置
├── components/       # 自动导入组件
│   └── common/       # 通用组件
│       ├── AppHeader.vue
│       ├── AppSidebar.vue
│       ├── AppFooter.vue
│       ├── AppTabs.vue
│       ├── CommandMenu.vue
│       └── ToastContainer.vue
├── composables/      # 组合式函数
│   ├── useTheme.ts
│   ├── useToast.ts
│   └── useCommandMenu.ts
├── layouts/          # 布局组件
│   ├── default.vue   # 管理后台布局
│   └── auth.vue      # 认证页面布局
├── middleware/       # 路由中间件
│   └── auth.global.ts
├── plugins/          # 插件
│   └── pinia-persist.client.ts
├── stores/           # Pinia 状态管理
│   ├── auth.ts
│   ├── dashboard.ts
│   ├── layout.ts
│   ├── tabs.ts
│   └── ui-settings.ts
├── utils/            # 工具函数
│   ├── index.ts
│   └── mock.ts       # Mock 数据
├── assets/css/       # 样式文件
│   ├── main.css
│   └── tailwind.css
├── tests/            # 测试文件
│   └── unit/
├── .github/          # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
└── public/           # 静态资源
```

## 路由约定

- `pages/index.vue` - / 路由
- `pages/login.vue` - /login 路由
- `pages/users/[id].vue` - /users/:id 动态路由
- `pages/posts/[...slug].vue` - /posts/* 通配符路由

## 布局系统

```vue
<script setup lang="ts">
// 指定页面使用的布局
definePageMeta({
  layout: 'auth',  // 使用 auth 布局
})
</script>
```

- `default` 布局：管理后台（带侧边栏、头部、标签页）
- `auth` 布局：认证页面（登录、注册等）

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NUXT_PUBLIC_API_BASE` | API 基础 URL | `/api` |
| `NUXT_PUBLIC_MOCK` | 是否启用 Mock | `true` |
| `NUXT_PUBLIC_DEMO_EMAIL` | 演示账号邮箱 | `admin@halolight.h7ml.cn` |
| `NUXT_PUBLIC_DEMO_PASSWORD` | 演示账号密码 | `123456` |
| `NUXT_PUBLIC_SHOW_DEMO_HINT` | 显示演示提示 | `true` |
| `NUXT_PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |
| `NUXT_PUBLIC_BRAND_NAME` | 品牌名称 | `Halolight` |

## 状态管理 (Pinia)

```typescript
// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref('')

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  async function login(credentials: LoginCredentials) {
    // 登录逻辑
  }

  return { user, token, isAuthenticated, login }
})
```

## 数据获取

```vue
<script setup lang="ts">
// useFetch - 组合式数据获取（SSR 友好）
const { data, pending, error, refresh } = await useFetch('/api/users')

// useAsyncData - 自定义异步数据
const { data: posts } = await useAsyncData('posts', () => $fetch('/api/posts'))
</script>
```

## 自动导入

Nuxt 自动导入以下内容：

- **Vue API**: `ref`, `computed`, `watch`, `onMounted` 等
- **Nuxt 组合式函数**: `useFetch`, `useRoute`, `useState`, `useRuntimeConfig` 等
- **components/** 目录下的组件
- **composables/** 目录下的函数
- **stores/** 目录下的 Pinia stores

## 代码规范

- **`<script setup>`**: 使用组合式 API 和 `<script setup>` 语法
- **自动导入**: 无需手动 import Vue/Nuxt API
- **类型安全**: 使用 TypeScript
- **文件命名**: 组件使用 PascalCase，页面使用 kebab-case

## 注意事项

- **Tailwind CSS**: 使用 CDN 方式加载（避免 PostCSS import.meta 兼容问题）
- **SSR 兼容**: 避免在服务端访问 `window`/`document`
- **数据获取**: 使用 `useFetch`/`useAsyncData` 而非直接 `fetch`
- **状态共享**: 使用 `useState` 在 SSR 中安全共享状态

## 与其他 Halolight 项目的对照

| 功能 | Nuxt 版本 | Vue 版本 | Next.js 版本 |
|------|----------|----------|--------------|
| 响应式 | ref/reactive | ref/reactive | useState |
| 数据获取 | useFetch | Axios | SWR/React Query |
| 路由 | 文件路由 | Vue Router | App Router |
| 状态管理 | Pinia | Pinia | Zustand |
| SSR | 内置 | 需配置 | 内置 |
