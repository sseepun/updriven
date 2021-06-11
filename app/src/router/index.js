import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  // Auth Pages
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/auth/SignUp.vue')
  },
  {
    path: '/auth/signup',
    name: 'AuthSignUpPage',
    component: () => import('../views/auth/SignUp.vue')
  },
  
  // User Pages
  {
    path: '/user/dashboard/:username?',
    name: 'UserDashboardPage',
    component: () => import('../views/user/Dashboard.vue')
  },
  {
    path: '/user/profile',
    name: 'UserProfilePage',
    component: () => import('../views/user/Profile.vue')
  },
  {
    path: '/user/chat',
    name: 'UserChatPage',
    component: () => import('../views/user/Chat.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
