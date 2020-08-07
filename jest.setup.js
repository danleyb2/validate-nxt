import Vue from 'vue'
import Vuetify from 'vuetify'

import { RouterLinkStub, TransitionGroupStub } from '@vue/test-utils'
import '@/plugins/mixins'
Vue.config.productionTip = false
// TODO https://github.com/vuejs/vue-test-utils/issues/532
const nuxtLinkStub = {
  name: 'NuxtLink',
  functional: true,
  render(h, { data, children }) {
    return h('router-link', data, children)
  }
}

if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = () => {}
}
Vue.component('router-link', RouterLinkStub)
Vue.component('NuxtLink', nuxtLinkStub)
Vue.component('transition-group', TransitionGroupStub)
Vue.use(Vuetify)
