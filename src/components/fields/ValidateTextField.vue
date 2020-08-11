<template>
  <MaskTextField
    :id="name"
    v-model.trim="localValue"
    v-validate="validate"
    :name="name"
    :label="labelDisplay"
    :data-vv-name="name"
    :error-messages="
      field && (field.dirty || field.validated) && errors.has(fieldName)
        ? errors.collect(fieldName)
        : undefined
    "
    :data-vv-as="labelDisplay"
    v-bind="$attrs"
    :data-vv-scope="scope"
    data-vv-validate-on="blur"
    @input="$emit('update:value', localValue)"
    @keyup="$emit('keyup', $event)"
  />
</template>

<script>
import MaskTextField from './MaskTextField'

export default {
  inject: ['$validator'],
  name: 'ValidateTextField',
  components: { MaskTextField },
  props: {
    scope: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    validate: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localValue: this.value
    }
  },
  computed: {
    labelDisplay() {
      return this.label === null
        ? this.name[0].toUpperCase() + this.name.slice(1)
        : this.label
    },
    fieldName() {
      if (this.scope) {
        return `${this.scope}.${this.name}`
      } else {
        return this.name
      }
    },
    field() {
      // console.log(this.errors.items);
      //  console.log(this.fields);
      // for (let i = 0; i < this.fields.length; i++) {
      //   const f = this.fields[i];
      //   console.log(`${f.name} ${f.valid} ${f.validate} `);
        
      // }
      

      if (this.scope) {
        return (this.fields[`$` + this.scope] || {})[this.name]
      } else {
        return this.fields[this.name]
      }
    }
  },
  watch: {
    value: {
      handler: function(v) {
        this.localValue = v
      }
    }
  }
}
</script>
