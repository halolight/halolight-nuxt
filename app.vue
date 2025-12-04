<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { setupMock } from '~/utils/mock'

// 全局初始化
const config = useRuntimeConfig()

// 初始化主题
const { initTheme } = useTheme()

// 初始化 Mock 数据（客户端）
onMounted(() => {
  initTheme()
  if (config.public.mock) {
    setupMock()
  }
})
</script>