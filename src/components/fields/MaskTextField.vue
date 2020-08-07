<template>
  <VTextField
    v-model="displayValue"
    :error-messages="errorMessages"
    v-bind="$attrs"
    @input="onInput"
    @keyup="$emit('keyup', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script>
import { masker, tokens } from './maskit'

export default {
  name: 'MaskTextField',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    errorMessages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localValue: this.value
    }
  },
  computed: {
    maskCharacters: function() {
      let mask = this.$attrs.mask
      if (mask) {
        let preMade = null
        switch (mask) {
          case 'phone':
            preMade = '(###) ### - ####'
            break
          case 'social':
            preMade = '###-##-####'
            break
          default:
            throw Error(`Unknown Mask: ${mask}`)
        }
        return preMade
      }
      return null
    },
    displayValue: {
      get() {
        if (this.maskCharacters) {
          return masker(this.localValue, this.maskCharacters, true, tokens)
        } else {
          return this.localValue
        }
      },
      set(value) {
        if (this.maskCharacters) {
          this.localValue = masker(value, this.maskCharacters, false, tokens)
        } else {
          this.localValue = value
        }
      }
    }
  },
  methods: {
    onInput(newValue) {
      this.$emit('input', this.localValue)
    }
  }
}
</script>
