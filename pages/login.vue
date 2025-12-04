<template>
  <AuthShell
    left-title="欢迎回来"
    left-emoji="👋"
    left-description="登录您的账户，开始管理您的业务数据和团队协作，体验高效的工作流程。"
    mobile-subtitle="欢迎回来，请登录您的账户"
    :left-features="[
      { icon: '🚀', text: '快速部署，即刻启动' },
      { icon: '📊', text: '实时数据分析与可视化' },
      { icon: '🔒', text: '企业级安全保障' },
      { icon: '⚡', text: '极致性能体验' },
    ]"
  >
    <div class="space-y-6">
      <!-- 标题 -->
      <div class="text-center">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          登录账户
        </h1>
        <p class="text-sm text-muted-foreground mt-2">
          输入您的邮箱和密码登录
        </p>
      </div>

      <!-- 社交登录 -->
      <div class="grid grid-cols-3 gap-2 sm:gap-3">
        <button
          type="button"
          class="w-full h-11 sm:h-12 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center group"
          @click="handleSocialLogin('github')"
        >
          <svg class="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </button>
        <button
          type="button"
          class="w-full h-11 sm:h-12 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center group"
          @click="handleSocialLogin('google')"
        >
          <svg class="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" x2="12" y1="8" y2="8" /><line x1="3.95" x2="8.54" y1="6.06" y2="14" /><line x1="10.88" x2="15.46" y1="21.94" y2="14" />
          </svg>
        </button>
        <button
          type="button"
          class="w-full h-11 sm:h-12 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center group"
          @click="handleSocialLogin('wechat')"
        >
          <svg class="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />
          </svg>
        </button>
      </div>

      <!-- 分隔线 -->
      <div class="relative py-3">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-border/50" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-card px-3 text-muted-foreground font-medium">或使用邮箱登录</span>
        </div>
      </div>

      <!-- 登录表单 -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- 错误提示 -->
        <div v-if="auth.error" class="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {{ auth.error }}
        </div>

        <!-- 邮箱 -->
        <div class="space-y-2">
          <label for="email" class="text-xs font-medium text-muted-foreground">邮箱地址</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <input id="email" v-model="form.email" type="email" required class="w-full pl-10 pr-3 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/50 transition-all" placeholder="your@email.com" />
          </div>
        </div>

        <!-- 密码 -->
        <div class="space-y-2">
          <label for="password" class="text-xs font-medium text-muted-foreground">密码</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required class="w-full pl-10 pr-10 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/50 transition-all" placeholder="••••••••" />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <svg v-if="!showPassword" class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
            </button>
          </div>
        </div>

        <!-- 记住我 -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input v-model="form.remember" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <span class="text-muted-foreground group-hover:text-foreground transition-colors">记住我</span>
          </label>
          <NuxtLink to="/forgot-password" class="text-primary hover:text-primary/80 font-medium transition-colors">忘记密码？</NuxtLink>
        </div>

        <!-- 测试账号按钮 -->
        <div v-if="demoEmail && demoPassword" class="flex items-center gap-2 py-2">
          <div class="flex-1 h-px bg-border/50" />
          <button type="button" @click="fillDemoCredentials" class="h-7 px-3 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-1.5">
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            测试账号
          </button>
          <div class="flex-1 h-px bg-border/50" />
        </div>

        <!-- 提交按钮 -->
        <button type="submit" :disabled="auth.loading" class="w-full h-12 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          <svg v-if="auth.loading" class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>{{ auth.loading ? '登录中...' : '登录' }}</span>
          <span v-if="!auth.loading" class="ml-1">→</span>
        </button>
      </form>

      <!-- 注册链接 -->
      <div class="text-center text-sm">
        <span class="text-muted-foreground">还没有账户？</span>
        <NuxtLink to="/register" class="text-primary hover:text-primary/80 font-semibold transition-colors ml-1">立即注册</NuxtLink>
      </div>

      <!-- 条款链接 -->
      <p class="text-xs text-muted-foreground/70 text-center leading-relaxed">
        阅读我们的
        <NuxtLink to="/terms" class="text-primary hover:text-primary/80 font-medium transition-colors">服务条款</NuxtLink>
        和
        <NuxtLink to="/privacy" class="text-primary hover:text-primary/80 font-medium transition-colors">隐私政策</NuxtLink>
      </p>

      <!-- 测试账号提示 -->
      <p v-if="showDemoHint && demoEmail && demoPassword" class="text-xs text-muted-foreground/60 text-center">
        测试账号请点击上方"测试账号"按钮自动填充
      </p>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()
const config = useRuntimeConfig()

const showDemoHint = computed(() => config.public.showDemoHint)
const demoEmail = computed(() => config.public.demoEmail as string)
const demoPassword = computed(() => config.public.demoPassword as string)
const showPassword = ref(false)

const form = reactive({ email: '', password: '', remember: false })

function handleSocialLogin(provider: string) {
  // TODO: 实现社交登录逻辑
  void provider
}

function fillDemoCredentials() {
  if (demoEmail.value && demoPassword.value) {
    form.email = demoEmail.value
    form.password = demoPassword.value
  }
}

async function handleSubmit() {
  try {
    await auth.login(form)
    toast.success('登录成功')
    const redirect = route.query.redirect as string || '/dashboard'
    await router.push(redirect)
  } catch {
    // 错误已在 store 中处理
  }
}

onMounted(() => { auth.clearError() })
</script>
