export const AppButton = () => import('../../components/AppButton.vue' /* webpackChunkName: "components/app-button" */).then(c => wrapFunctional(c.default || c))
export const AppCheckbox = () => import('../../components/AppCheckbox.vue' /* webpackChunkName: "components/app-checkbox" */).then(c => wrapFunctional(c.default || c))
export const AppCollection = () => import('../../components/AppCollection.vue' /* webpackChunkName: "components/app-collection" */).then(c => wrapFunctional(c.default || c))
export const AppCommand = () => import('../../components/AppCommand.vue' /* webpackChunkName: "components/app-command" */).then(c => wrapFunctional(c.default || c))
export const AppInput = () => import('../../components/AppInput.vue' /* webpackChunkName: "components/app-input" */).then(c => wrapFunctional(c.default || c))
export const AppLabel = () => import('../../components/AppLabel.vue' /* webpackChunkName: "components/app-label" */).then(c => wrapFunctional(c.default || c))
export const AppLoader = () => import('../../components/AppLoader.vue' /* webpackChunkName: "components/app-loader" */).then(c => wrapFunctional(c.default || c))
export const AppLogo = () => import('../../components/AppLogo.vue' /* webpackChunkName: "components/app-logo" */).then(c => wrapFunctional(c.default || c))
export const AppMessage = () => import('../../components/AppMessage.vue' /* webpackChunkName: "components/app-message" */).then(c => wrapFunctional(c.default || c))
export const AppModalCollection = () => import('../../components/AppModalCollection.vue' /* webpackChunkName: "components/app-modal-collection" */).then(c => wrapFunctional(c.default || c))
export const AppModalCommand = () => import('../../components/AppModalCommand.vue' /* webpackChunkName: "components/app-modal-command" */).then(c => wrapFunctional(c.default || c))
export const AppModalMessage = () => import('../../components/AppModalMessage.vue' /* webpackChunkName: "components/app-modal-message" */).then(c => wrapFunctional(c.default || c))
export const AppPaginatedCommands = () => import('../../components/AppPaginatedCommands.vue' /* webpackChunkName: "components/app-paginated-commands" */).then(c => wrapFunctional(c.default || c))
export const AppPagination = () => import('../../components/AppPagination.vue' /* webpackChunkName: "components/app-pagination" */).then(c => wrapFunctional(c.default || c))
export const AppToast = () => import('../../components/AppToast.vue' /* webpackChunkName: "components/app-toast" */).then(c => wrapFunctional(c.default || c))
export const TheMain = () => import('../../components/TheMain.vue' /* webpackChunkName: "components/the-main" */).then(c => wrapFunctional(c.default || c))
export const TheSideMenu = () => import('../../components/TheSideMenu.vue' /* webpackChunkName: "components/the-side-menu" */).then(c => wrapFunctional(c.default || c))
export const ValidationErrors = () => import('../../components/validation-errors.vue' /* webpackChunkName: "components/validation-errors" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
