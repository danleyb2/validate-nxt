<template>
  <VCard primary flat>
    <VCardTitle v-if="$slots.title">
      <slot name="title" />
    </VCardTitle>
    <VCardText>
      <slot />
    </VCardText>
    <VCardActions>
      <VLayout column>
        <VLayout>
          <VBtn
            :disabled="submitting"
            :loading="submitting"
            color="primary"
            block
            ripple
            data-cy="card-action"
            @click="action"
          >
            {{ actionButtonName }}
          </VBtn>
        </VLayout>
        <VLayout v-if="backLinkTo" justify-center>
          <NuxtLink :to="backLinkTo" class="back-link">{{
            backLinkText
          }}</NuxtLink>
        </VLayout>
      </VLayout>
    </VCardActions>
  </VCard>
</template>

<script>
import ActionValidate from '~/mixins/validatable'

export default {
  name: 'CardAction',
  inject: ['$validator'],
  mixins: [ActionValidate],
  props: {
    actionFunc: {
      type: Function,
      required: true
    },
    validate: {
      type: Boolean,
      default: true
    },
    actionButtonName: {
      type: String,
      default: 'Save'
    },
    backLinkText: {
      type: String,
      default: 'Go Back'
    },
    backLinkTo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async action() {
      if (this.validate) {
        await this.actionValidate(this.actionFunc)
      } else {
        await this.actionTrigger(this.actionFunc)
      }
    }
  }
}
</script>
