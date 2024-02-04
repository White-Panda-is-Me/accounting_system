import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/login/login.vue'
import Home from '@/home/home.vue'
import Signup from '@/register/register.vue'
import Verify from '@/register/verify/verify.vue'
import Account from '@/profile/profile.vue'
import IntroduceProduct from '@/home/introduce/product.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      component: Login,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/signup/verify',
      component: Verify,
      beforeEnter: (to, from, next) => {
        if (from.path === "/signup") {
          next();
        } else {
          next("/signup");
        }
      }
    },
    {
      path: '/profile',
      component: Account,
      meta: { requiresAuth: true },
    },
    {
      path: '/introduce/product',
      component: IntroduceProduct,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = localStorage.getItem("User_token");
    if (!token) {
      next("/signin");
    } else {
      let request = new XMLHttpRequest();
      request.open("GET", "http://localhost:3000/users/me", false);
      request.setRequestHeader("Authorization", `Bearer ${token}`);
      request.send();
      if (request.status == 200){
        next();
      } else
        next("/signin");
    }
  } else {
    next();
  }
});
