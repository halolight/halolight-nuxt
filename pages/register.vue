<template>
  <AuthShell
    left-gradient="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-600"
    left-title="创建账户"
    left-emoji="✨"
    left-description="加入我们，开始体验强大的后台管理功能，提升您的工作效率。"
    mobile-subtitle="创建账户，开始您的旅程"
    :left-features="[
      { icon: '🎁', text: '完全免费的基础功能' },
      { icon: '📊', text: '实时数据分析和报告' },
      { icon: '👥', text: '团队协作和权限管理' },
      { icon: '💬', text: '7x24 小时技术支持' },
    ]"
    :halo-colors="['from-purple-400/30 to-pink-400/30', 'from-fuchsia-400/25 to-amber-400/25', 'from-indigo-400/20 to-cyan-400/20']"
  >
    <div class="space-y-4">
      <div class="text-center">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">创建账户</h1>
        <p class="text-sm text-muted-foreground mt-2">填写以下信息完成注册</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div v-if="auth.error || localError" class="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">{{ auth.error || localError }}</div>

        <div class="space-y-2">
          <label class="text-xs font-medium text-muted-foreground">您的姓名</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input v-model="form.name" type="text" required class="w-full pl-10 pr-3 py-2.5 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="张三" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-medium text-muted-foreground">邮箱地址</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <input v-model="form.email" type="email" required class="w-full pl-10 pr-3 py-2.5 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="your@email.com" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-medium text-muted-foreground">设置密码</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required class="w-full pl-10 pr-10 py-2.5 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="••••••••" />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <svg v-if="!showPassword" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
            </button>
          </div>
          <div v-if="form.password" class="space-y-2">
            <div class="flex gap-1">
              <div v-for="level in 4" :key="level" class="h-1.5 flex-1 rounded-full transition-colors" :class="getStrengthColor(level)" />
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div v-for="rule in passwordRules" :key="rule.label" class="flex items-center gap-1 text-xs" :class="rule.test(form.password) ? 'text-green-500' : 'text-muted-foreground'">
                <svg v-if="rule.test(form.password)" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                <svg v-else class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                {{ rule.label }}
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-medium text-muted-foreground">确认密码</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" required class="w-full pl-10 pr-10 py-2.5 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="••••••••" />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <svg v-if="!showConfirmPassword" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
            </button>
          </div>
        </div>

        <label class="flex items-start gap-2 cursor-pointer group text-xs">
          <input v-model="form.agree" type="checkbox" required class="rounded border-gray-300 mt-0.5 w-4 h-4 text-primary focus:ring-primary" />
          <span class="text-muted-foreground group-hover:text-foreground transition-colors">
            我已阅读并同意
            <NuxtLink to="/terms" class="text-primary hover:text-primary/80 font-medium">服务条款</NuxtLink>
            和
            <NuxtLink to="/privacy" class="text-primary hover:text-primary/80 font-medium">隐私政策</NuxtLink>
          </span>
        </label>

        <button type="submit" :disabled="auth.loading" class="w-full h-11 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          <svg v-if="auth.loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>{{ auth.loading ? '注册中...' : '创建账户' }}</span>
          <span v-if="!auth.loading">→</span>
        </button>
      </form>

      <div class="text-center text-sm">
        <span class="text-muted-foreground">已有账户？</span>
        <NuxtLink to="/login" class="text-primary hover:text-primary/80 font-semibold ml-1">立即登录</NuxtLink>
      </div>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const localError = ref('')
const form = reactive({ name: '', email: '', password: '', confirmPassword: '', agree: false })

const passwordRules = [
  { label: '至少8个字符', test: (p: string) => p.length >= 8 },
  { label: '包含大写字母', test: (p: string) => /[A-Z]/.test(p) },
  { label: '包含小写字母', test: (p: string) => /[a-z]/.test(p) },
  { label: '包含数字', test: (p: string) => /\d/.test(p) },
]

const passwordStrength = computed(() => passwordRules.filter(rule => rule.test(form.password)).length)

function getStrengthColor(level: number) {
  if (passwordStrength.value >= level) {
    if (passwordStrength.value <= 1) return 'bg-red-500'
    if (passwordStrength.value <= 2) return 'bg-orange-500'
    if (passwordStrength.value <= 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }
  return 'bg-muted'
}

async function handleSubmit() {
  localError.value = ''
  if (!form.name || !form.email || !form.password) { localError.value = '请填写所有必填字段'; return }
  if (form.password !== form.confirmPassword) { localError.value = '两次密码输入不一致'; return }
  if (passwordStrength.value < 3) { localError.value = '密码强度不足'; return }
  if (!form.agree) { localError.value = '请同意服务条款和隐私政策'; return }
  try {
    await auth.register(form)
    toast.success('注册成功')
    await router.push('/dashboard')
  } catch {
    // 错误已在 store 中处理
  }
}

onMounted(() => { auth.clearError() })
</script>
