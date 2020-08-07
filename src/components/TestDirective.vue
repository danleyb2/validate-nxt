<template>
  <div>
    <input type="text" v-model="value" name="input" v-validate="'required'">
    <span id="error">{{ errors.first('input') }}</span>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  data: () => ({
    value: ""
  })
};
</script>
