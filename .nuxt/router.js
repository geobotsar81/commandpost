import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _03e5f33c = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _68df265a = () => interopDefault(import('../pages/forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _3de5a3b7 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _76907476 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _616290ea = () => interopDefault(import('../pages/verify-email.vue' /* webpackChunkName: "pages/verify-email" */))
const _50900b3c = () => interopDefault(import('../pages/commands/add.vue' /* webpackChunkName: "pages/commands/add" */))
const _044e8e80 = () => interopDefault(import('../pages/commands/user.vue' /* webpackChunkName: "pages/commands/user" */))
const _70ed21a8 = () => interopDefault(import('../pages/collections/view/_id.vue' /* webpackChunkName: "pages/collections/view/_id" */))
const _97f19bae = () => interopDefault(import('../pages/commands/update/_id.vue' /* webpackChunkName: "pages/commands/update/_id" */))
const _2cde7b3e = () => interopDefault(import('../pages/reset-password/_token.vue' /* webpackChunkName: "pages/reset-password/_token" */))
const _743e00a0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _03e5f33c,
    name: "dashboard"
  }, {
    path: "/forgot-password",
    component: _68df265a,
    name: "forgot-password"
  }, {
    path: "/login",
    component: _3de5a3b7,
    name: "login"
  }, {
    path: "/register",
    component: _76907476,
    name: "register"
  }, {
    path: "/verify-email",
    component: _616290ea,
    name: "verify-email"
  }, {
    path: "/commands/add",
    component: _50900b3c,
    name: "commands-add"
  }, {
    path: "/commands/user",
    component: _044e8e80,
    name: "commands-user"
  }, {
    path: "/collections/view/:id?",
    component: _70ed21a8,
    name: "collections-view-id"
  }, {
    path: "/commands/update/:id?",
    component: _97f19bae,
    name: "commands-update-id"
  }, {
    path: "/reset-password/:token?",
    component: _2cde7b3e,
    name: "reset-password-token"
  }, {
    path: "/",
    component: _743e00a0,
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
