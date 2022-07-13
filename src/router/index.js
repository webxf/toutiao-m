import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    // 路游懒加载
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
