import { createRouter, createWebHistory } from 'vue-router'
import { mainStore } from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '林建有の主页' }
  },
  {
    path: '/qrcode',
    name: 'QRCode',
    meta: { title: '扫码体验小程序 - 林建有の主页' },
    beforeEnter: (to, from, next) => {
      // 进入 qrcode 路由时，显示二维码
      const store = mainStore()
      store.isShowQrcode = true
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  const store = mainStore()

  // 离开 qrcode 路由时，关闭二维码显示
  if (from.path === '/qrcode' && to.path !== '/qrcode') {
    store.isShowQrcode = false
  }
})

export default router
