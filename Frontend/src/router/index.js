import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  // Auth Pages
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/auth/SignIn.vue')
  },
  {
    path: '/auth/signin',
    name: 'AuthSignInPage',
    component: () => import('../views/auth/SignIn.vue')
  },
  {
    path: '/auth/signup',
    name: 'AuthSignUpPage',
    component: () => import('../views/auth/SignUp.vue')
  },
  {
    path: '/auth/forget-password',
    name: 'AuthForgetPasswordPage',
    component: () => import('../views/auth/ForgetPassword.vue')
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

// router.beforeEach((to, from, next) => {
  
// });

export default router
