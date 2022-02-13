export { default as AppButton } from '../../components/AppButton.vue'
export { default as AppCheckbox } from '../../components/AppCheckbox.vue'
export { default as AppInput } from '../../components/AppInput.vue'
export { default as AppLabel } from '../../components/AppLabel.vue'
export { default as AppLoader } from '../../components/AppLoader.vue'
export { default as AppLogo } from '../../components/AppLogo.vue'
export { default as AppMessage } from '../../components/AppMessage.vue'
export { default as AppModal } from '../../components/AppModal.vue'
export { default as TheFooter } from '../../components/TheFooter.vue'
export { default as TheHeader } from '../../components/TheHeader.vue'
export { default as TheMain } from '../../components/TheMain.vue'
export { default as ValidationErrors } from '../../components/validation-errors.vue'

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
