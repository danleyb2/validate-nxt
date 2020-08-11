<template>
    <CardAction
    :action-func="signup"
    :back-link-to="{ name: 'auth-login' }"
    action-button-name="Join our referral network"
    back-link-text="Been here before? Sign in"
  >
    <template slot="title">
      Well, Hello There!
    </template>
    <VContainer grid-list-md>
      <VLayout>
        <VFlex>
          <p class="dash-trailing">
            We’re so glad you’re ready to join
            <strong>Tenant Report</strong> referral network.
          </p>
          <p>
            We've made it super easy so it'll take you almost no time at all
          </p>
        </VFlex>
      </VLayout>
      <VLayout>
        <VFlex xs6>
          <ValidateTextField
            :value.sync="firstName"
            name="firstName"
            label="First"
            autocomplete="given-name"
            validate="required|sm_name|max:50|min:2"
          />
        </VFlex>
        <VFlex xs6>
          <ValidateTextField
            :value.sync="lastName"
            name="lastName"
            label="Last"
            autocomplete="family-name"
            validate="required|sm_name|max:50|min:2"
          />
        </VFlex>
      </VLayout>
      <VLayout>
        <VFlex>
          <ValidateTextField
            :value.sync="email"
            name="email"
            type="email"
            validate="required|email"
            autocomplete="email"
            persistent-hint
            hint="We'll send information about commissions here, so please double check for typos!"
            @keyup.enter="actionValidate(signup)"
          />
        </VFlex>
      </VLayout>
      <VLayout>
        <VFlex>
          <ValidateTextField
            :value.sync="password"
            name="password"
            type="password"
            validate="required|password"
            autocomplete="new-password"
            @keyup.enter="actionValidate(signup)"
          />


        </VFlex>
      </VLayout>
    </VContainer>
  </CardAction>
</template>

<script>
import ValidateTextField from '~/components/fields/ValidateTextField'
//import PasswordValidation from '~/components/auth/PasswordValidation'
import CardAction from '~/components/templates/CardAction'
import ActionValidate from '~/mixins/validatable'

export default {
  components: { CardAction, ValidateTextField },
  $_veeValidate: { validator: 'new' },
  mixins: [ActionValidate],
  data: () => ({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }),
  methods: {
    async signup() {
      try {
        await this.$store.dispatch('hauth/signupAffiliate', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        this.$router.push({ name: 'dashboard-welcome-info-referral' })
      } catch (e) {
        // todo handle? global handler in gql strategy
      }
    }
  }
}
</script>
