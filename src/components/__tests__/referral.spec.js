import { createLocalVue, mount, shallow } from '@vue/test-utils'
import SignupReferralPage from '@/components/referral'
import VeeValidate from '~/utils/validateSetup'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(VeeValidate, {
  inject: false
})
localVue.use(Vuex)

const opts = {
  theme: {
    dark: false
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Referral Signup Page', () => {
  global.console.warn = jest.fn()
  let vuetify

  describe('Interactions', () => {
    let wrapper
    let store
    let actions
    beforeEach(async () => {
      vuetify = new Vuetify(opts)
      actions = {
        signupAffiliate: jest.fn()
      }
      store = new Vuex.Store({
        modules: {
          hauth: {
            namespaced: true,
            actions
          }
        }
      })
      wrapper = mount(SignupReferralPage, {
        localVue,
        vuetify,
        store,
        mocks: {
          $router: {
            push: jest.fn()
          }
        }
      })
      expect(wrapper.findAll('.v-input.error--text')).toHaveLength(0)
      expect(
        wrapper.findAll('.v-messages.error--text .v-messages__message')
      ).toHaveLength(0)
    })

    it('Validation Errors for Required Fields Displayed On Click', async () => {
      wrapper.find('[data-cy=card-action]').trigger('click')
      // await wrapper.vm.$validator.validate()
      await flushPromises()
      //await timeout(4000)
      //  expect(wrapper.vm.$validator.errors.items).toHaveLength(0)
      // await wrapper.vm.$forceUpdate();

      // fields highlighted
      // expect(wrapper.findAll('input')).toHaveLength(40)
      // console.log(wrapper.findAll('input'))
      // console.log(wrapper.vm.$validator.errors.items)
      expect(wrapper.findAll('.v-input.error--text')).toHaveLength(4)
      // await wrapper.vm.$nextTick()
      // await wrapper.vm.$nextTick()
      // await wrapper.vm.$nextTick()
      // await wrapper.vm.$nextTick()

      // error message shown
      const errorMessages = wrapper.findAll(
        '.v-messages.error--text .v-messages__message'
      )
      expect(errorMessages).toHaveLength(4)
      errorMessages.wrappers.forEach(wrapper => {
        expect(wrapper.text()).toContain('This field is required.')
      })
    })
  })
})
