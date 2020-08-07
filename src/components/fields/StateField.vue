<template>
  <VAutocomplete
    ref="state"
    v-model="localValue"
    v-validate="'required'"
    :error-messages="errors.collect('state')"
    :items="states"
    :filter="customFilter"
    v-bind="$attrs"
    label="State"
    name="state"
    item-text="name"
    autocomplete="address-level1"
    item-value="abbreviation"
    @input="$emit('update:value', localValue)"
  />
</template>

<script>
import { UsaStates } from 'usa-states'

const usStates = new UsaStates()

export default {
  inject: ['$validator'],
  name: 'StateField',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localValue: this.value,
      states: usStates.states
    }
  },
  watch: {
    value: {
      handler: function(v) {
        this.localValue = v
      }
    }
  },
  methods: {
    customFilter(item, queryText) {
      const hasValue = val => (val != null ? val : '')
      const text = hasValue(item.name)
      const value = hasValue(item.abbreviation)
      const query = hasValue(queryText)
      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1 ||
        value
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      )
    }
  }
}
</script>
