import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _538e4f3e = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _3f308392 = () => interopDefault(import('../pages/forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _26904d36 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _70da37e6 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _74cd0a8b = () => interopDefault(import('../pages/verify-email.vue' /* webpackChunkName: "pages/verify-email" */))
const _ad477286 = () => interopDefault(import('../pages/reset-password/_token.vue' /* webpackChunkName: "pages/reset-password/_token" */))
const _5ce8aa1f = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _538e4f3e,
    name: "dashboard"
  }, {
    path: "/forgot-password",
    component: _3f308392,
    name: "forgot-password"
  }, {
    path: "/login",
    component: _26904d36,
    name: "login"
  }, {
    path: "/register",
    component: _70da37e6,
    name: "register"
  }, {
    path: "/verify-email",
    component: _74cd0a8b,
    name: "verify-email"
  }, {
    path: "/reset-password/:token?",
    component: _ad477286,
    name: "reset-password-token"
  }, {
    path: "/",
    component: _5ce8aa1f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
