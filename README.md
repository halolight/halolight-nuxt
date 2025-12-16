# Halolight Nuxt | Admin Pro

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/halolight/halolight-nuxt/blob/main/LICENSE)
[![Nuxt](https://img.shields.io/badge/Nuxt-3.10-%2300DC82.svg)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3.5-%2342b883.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-%233178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-%2306B6D4.svg)](https://tailwindcss.com/)

基于 Nuxt 3 + Vue 3 的现代化中文后台管理系统，具备全栈能力、自动导入和卓越的开发体验。

- 在线预览：<https://halolight-nuxt.h7ml.cn>
- GitHub：<https://github.com/halolight/halolight-nuxt>

## 功能亮点

- **Nuxt 3 + Vue 3**：文件路由、自动导入、SSR/SSG
- **全栈能力**：内置 Nitro 服务端，支持 API 路由
- **自动导入**：组件、组合式函数、Vue API 自动导入
- **TypeScript**：完整类型安全支持
- **Tailwind CSS**：原子化样式
- **Pinia**：状态管理 + 持久化
- **命令面板**：`⌘/Ctrl + K` 快速导航
- **数据获取**：`useFetch`、`useAsyncData`

## 目录结构

```
├── nuxt.config.ts    # Nuxt 配置
├── app.vue           # 应用根组件
├── pages/            # 页面路由
├── components/       # 自动导入组件
├── composables/      # 组合式函数
├── layouts/          # 布局组件
├── middleware/       # 路由中间件
├── plugins/          # 插件
├── stores/           # Pinia 状态管理
├── utils/            # 工具函数
└── public/           # 静态资源
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 生产构建
pnpm build

# 静态生成
pnpm generate

# 预览构建产物
pnpm preview

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
pnpm lint:fix

# 运行测试
pnpm test
pnpm test:run
pnpm test:coverage
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并配置：

```env
NUXT_PUBLIC_API_BASE=/api
NUXT_PUBLIC_MOCK=true
NUXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NUXT_PUBLIC_DEMO_PASSWORD=123456
NUXT_PUBLIC_SHOW_DEMO_HINT=true
NUXT_PUBLIC_APP_TITLE=Admin Pro
NUXT_PUBLIC_BRAND_NAME=Halolight
```

## 演示账号

- 邮箱：`admin@halolight.h7ml.cn`
- 密码：`123456`

## 技术栈

| 类别 | 技术 |
|------|------|
| 核心框架 | Nuxt 3.10 + Vue 3.5 |
| 类型系统 | TypeScript 5.7 |
| 构建工具 | Vite (内置) |
| 样式 | Tailwind CSS (CDN) |
| 状态管理 | Pinia |
| 服务端 | Nitro |

## 页面路由

| 路径 | 页面 | 布局 |
|------|------|------|
| `/login` | 登录 | auth |
| `/register` | 注册 | auth |
| `/forgot-password` | 忘记密码 | auth |
| `/reset-password` | 重置密码 | auth |
| `/terms` | 服务条款 | auth |
| `/privacy` | 隐私政策 | auth |
| `/dashboard` | 仪表盘 | default |
| `/users` | 用户管理 | default |
| `/messages` | 消息中心 | default |
| `/analytics` | 数据分析 | default |
| `/profile` | 个人中心 | default |
| `/settings` | 系统设置 | default |

## 数据获取

```vue
<script setup lang="ts">
const { data: users } = await useFetch('/api/users')
const { data: posts } = await useAsyncData('posts', () => $fetch('/api/posts'))
</script>
```

## 状态管理

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

## 许可证

[MIT](LICENSE)
