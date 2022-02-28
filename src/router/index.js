import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import MenuManage from '../components/MenuManage.vue'
import CategoryManage from '../components/CategoryManage.vue'
import Profile from '../components/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/menuManage',
    name: 'MenuManage',
    component: MenuManage,
  },
  {
    path: '/categoryManage',
    name: 'CategoryManage',
    component: CategoryManage,
  },
   {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.name === 'Dashboard' && !isAuthenticated) next({ name: 'Login' })
  if (to.name === 'MenuManage' && !isAuthenticated) next({ name: 'Login' })
  if (to.name === 'CategoryManage' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
export default router
