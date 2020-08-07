import VeeValidate from 'vee-validate'
import Vue from 'vue'
Vue.use(VeeValidate, {
  inject: false
})

VeeValidate.Validator.extend('min_letter', {
  getMessage: (_, [length]) => `This must contain at least ${length} letters`,
  validate: (value, [length]) => (value.match(/[a-z]/gi) || []).length >= length
})
VeeValidate.Validator.extend('min_digit', {
  getMessage: (_, [length]) => `This must contain at least ${length} digits`,
  validate: (value, [length]) => (value.match(/\d/g) || []).length >= length
})
VeeValidate.Validator.extend('sm_street', {
  getMessage: () =>
    `This special characters allowed are apostrophe, pound sign, period, and space`,
  validate: value => /^[A-Z\d\s£.`]*$/i.test(value)
})
VeeValidate.Validator.extend('sm_city', {
  getMessage: () =>
    `This field can only contain letters, spaces, periods, single quotes, hyphens`,
  validate: value => /^[A-Z\s.\- ']*$/i.test(value)
})
VeeValidate.Validator.extend('sm_name', {
  getMessage: () =>
    `This field can only contain letters, spaces, periods, single quotes, hyphens, comma, period`,
  validate: value => /^[A-Z\s.\-,']*$/i.test(value)
})
VeeValidate.Validator.extend('zip', {
  getMessage: () => `Zip Code can only be in the format 00000`,
  validate: value => /^\d{5}?$/i.test(value)
})
VeeValidate.Validator.extend('full_name', {
  getMessage: () => `This should be a legal full name`,
  validate: value => /([a-zA-Z]+){2,50} ([a-zA-Z]+){2,50}$/i.test(value)
})
VeeValidate.Validator.extend('password', {
  getMessage: () => `This should meet all password requirements`,
  validate: value => {
    const valid_password_length = value.length >= 8
    const contains_lowercase = /[a-z]/.test(value)
    const contains_number = /\d/.test(value)
    const contains_uppercase = /[A-Z]/.test(value)
    return (
      contains_lowercase &&
      contains_number &&
      contains_uppercase &&
      valid_password_length
    )
  }
})

const dictionary = {
  en: {
    messages: {
      required: () => 'This field is required.'
    }
  }
}

// Override and merge the dictionaries
VeeValidate.Validator.localize(dictionary)
export default VeeValidate
