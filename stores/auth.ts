/**
 * 认证状态管理
 */

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  permissions: string[]
}

export interface LoginPayload {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // 用户信息
    user: null as User | null,
    // 认证令牌
    token: '',
    // 加载状态
    loading: false,
    // 错误信息
    error: '',
  }),

  getters: {
    // 是否已认证
    isAuthenticated: (state) => Boolean(state.token),

    // 用户首字母
    initials: (state) => {
      if (!state.user) return 'HL'
      return state.user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    },

    // 是否有权限
    hasPermission: (state) => (permission: string) => {
      if (!state.user) return false
      if (state.user.permissions.includes('*')) return true
      return state.user.permissions.includes(permission)
    },

    // 是否有任一权限
    hasAnyPermission: (state) => (permissions: string[]) => {
      if (!state.user) return false
      if (state.user.permissions.includes('*')) return true
      return permissions.some((p) => state.user!.permissions.includes(p))
    },

    // 是否有全部权限
    hasAllPermissions: (state) => (permissions: string[]) => {
      if (!state.user) return false
      if (state.user.permissions.includes('*')) return true
      return permissions.every((p) => state.user!.permissions.includes(p))
    },
  },

  actions: {
    // 登录
    async login(payload: LoginPayload) {
      this.loading = true
      this.error = ''

      try {
        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, 600))

        // 获取运行时配置
        const config = useRuntimeConfig()
        const demoEmail = config.public.demoEmail
        const demoPassword = config.public.demoPassword

        // 验证演示账号
        if (payload.email !== demoEmail || payload.password !== demoPassword) {
          throw new Error('邮箱或密码错误')
        }

        // 设置用户信息
        this.user = {
          id: '1',
          name: `${config.public.brandName} Admin`,
          email: payload.email,
          avatar: '',
          role: 'Administrator',
          permissions: ['*'],
        }
        this.token = 'mock-token-' + Date.now()

        return this.user
      } catch (e) {
        this.error = e instanceof Error ? e.message : '登录失败'
        throw e
      } finally {
        this.loading = false
      }
    },

    // 注册
    async register(payload: RegisterPayload) {
      this.loading = true
      this.error = ''

      try {
        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, 800))

        // 验证密码
        if (payload.password !== payload.confirmPassword) {
          throw new Error('两次输入的密码不一致')
        }

        if (payload.password.length < 6) {
          throw new Error('密码长度不能少于6位')
        }

        // 模拟注册成功
        this.user = {
          id: '2',
          name: payload.name,
          email: payload.email,
          avatar: '',
          role: 'User',
          permissions: ['dashboard:view', 'profile:edit'],
        }
        this.token = 'mock-token-' + Date.now()

        return this.user
      } catch (e) {
        this.error = e instanceof Error ? e.message : '注册失败'
        throw e
      } finally {
        this.loading = false
      }
    },

    // 登出
    logout() {
      this.user = null
      this.token = ''
      this.error = ''
    },

    // 清除错误
    clearError() {
      this.error = ''
    },

    // 刷新用户信息
    async refreshUser() {
      if (!this.token) return null

      try {
        // 模拟刷新用户信息
        await new Promise((resolve) => setTimeout(resolve, 200))
        return this.user
      } catch {
        this.logout()
        return null
      }
    },

    // 忘记密码
    async forgotPassword(email: string) {
      this.loading = true
      this.error = ''

      try {
        // 模拟发送重置邮件
        await new Promise((resolve) => setTimeout(resolve, 600))

        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          throw new Error('请输入有效的邮箱地址')
        }

        return { success: true, message: '重置链接已发送到您的邮箱' }
      } catch (e) {
        this.error = e instanceof Error ? e.message : '发送失败'
        throw e
      } finally {
        this.loading = false
      }
    },

    // 重置密码
    async resetPassword(token: string, password: string, confirmPassword: string) {
      this.loading = true
      this.error = ''

      try {
        // 模拟重置密码
        await new Promise((resolve) => setTimeout(resolve, 600))

        // 验证密码
        if (password !== confirmPassword) {
          throw new Error('两次输入的密码不一致')
        }

        if (password.length < 6) {
          throw new Error('密码长度不能少于6位')
        }

        return { success: true, message: '密码重置成功' }
      } catch (e) {
        this.error = e instanceof Error ? e.message : '重置失败'
        throw e
      } finally {
        this.loading = false
      }
    },
  },

  persist: {
    key: 'halolight-auth',
    pick: ['user', 'token'],
  },
})