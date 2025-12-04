<template>
  <div class="h-10 border-b bg-card flex items-center px-2 gap-1 overflow-x-auto shrink-0">
    <!-- 标签列表 -->
    <div
      v-for="tab in tabs.tabs"
      :key="tab.id"
      :class="[
        'flex items-center gap-1 px-3 py-1.5 rounded-t text-sm cursor-pointer transition-colors shrink-0',
        tab.path === route.path
          ? 'bg-background border-t border-x text-foreground -mb-px'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent',
      ]"
      @click="navigateTo(tab.path)"
    >
      <span class="max-w-32 truncate">{{ tab.title }}</span>
      <button
        v-if="tab.closable !== false"
        class="ml-1 p-0.5 rounded hover:bg-muted transition-colors"
        @click.stop="closeTab(tab.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- 标签操作 -->
    <div class="ml-auto flex items-center gap-1 shrink-0">
      <!-- 关闭其他 -->
      <button
        v-if="tabs.tabs.length > 1"
        class="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        title="关闭其他标签"
        @click="closeOtherTabs"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      <!-- 刷新当前 -->
      <button
        class="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        title="刷新当前页面"
        @click="refreshCurrentTab"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = useTabsStore()
const route = useRoute()
const router = useRouter()

// 关闭标签
function closeTab(id: string) {
  const closedTab = tabs.tabs.find((t) => t.id === id)
  tabs.closeTab(id)

  // 如果关闭的是当前标签，导航到最后一个标签
  if (closedTab?.path === route.path && tabs.tabs.length > 0) {
    const lastTab = tabs.tabs[tabs.tabs.length - 1]
    router.push(lastTab.path)
  }
}

// 关闭其他标签
function closeOtherTabs() {
  tabs.closeOtherTabs(route.path)
}

// 刷新当前标签
function refreshCurrentTab() {
  // 使用 Nuxt 的刷新功能
  refreshNuxtData()
}

// 监听路由变化，自动添加标签
watch(
  () => route.path,
  (newPath) => {
    const existingTab = tabs.tabs.find((t) => t.path === newPath)
    if (!existingTab) {
      tabs.addTab({
        id: generateId(),
        title: route.meta.title as string || getRouteTitle(newPath),
        path: newPath,
        closable: newPath !== '/',
      })
    }
  },
  { immediate: true }
)

// 根据路径获取标题
function getRouteTitle(path: string): string {
  const titles: Record<string, string> = {
    '/': '仪表板',
    '/users': '用户管理',
    '/messages': '消息中心',
    '/files': '文件管理',
    '/calendar': '日程安排',
    '/analytics': '数据分析',
    '/settings': '系统设置',
    '/profile': '个人资料',
    '/notifications': '通知中心',
  }
  return titles[path] || '页面'
}
</script>