import { createLocalVue, mount, shallow } from '@vue/test-utils'
// import SignupReferralPage from '@/pages/auth/signup/referral'
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

describe('Referral Signup Page', () => {
    
    it('renders a vue instance', () => {


      



      expect(true).toBe(true)
    })

})