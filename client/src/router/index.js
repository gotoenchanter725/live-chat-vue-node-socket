import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path : '/',
    name : 'Login',
    component : Login
  },
  {
    path : '/register',
    name : 'Register',
    component : Register
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
    meta: { 
        requiresAuth: true
      }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router
