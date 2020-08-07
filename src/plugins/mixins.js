import Vue from 'vue'

Vue.mixin({
  methods: {
    $invalid() {
      const keys = Object.keys(this.fields)
      return keys.length === 0 || keys.some(key => this.fields[key].invalid)
    },
    $scrollToFirstError() {
      const field = this.$validator.errors.items[0].field
      this.$el
        .querySelector('[data-vv-name="' + field + '"]')
        .scrollIntoView({ block: 'center', inline: 'nearest' })
    },
    async $getAddressByZip(zip) {
      if (/^\d{5}(-\d{4})?$/i.test(zip)) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&language=en&components=country:US&key=${this.$env.GOOGLE_MAP_APIKEY}`,
            {
              method: 'get'
            }
          )
          const jsonResponse = await response.json()
          if (jsonResponse.status === 'OK') {
            let address = jsonResponse.results[0].address_components.reduce(
              (comps, comp) => {
                let attr = comp.types[0]
                attr = attr === 'administrative_area_level_2' ? 'county' : attr
                attr = attr === 'administrative_area_level_1' ? 'state' : attr
                comps[attr + '_long'] = comp.long_name
                comps[attr + '_short'] = comp.short_name
                return comps
              },
              {}
            )
            return {
              state: address['state_short'],
              city: address['locality_short']
            }
          }
        } catch (err) {
          this.$sentry.captureException(err)
        }
        return false
      }
      return false
    }
  }
})

Vue.filter('shortDate', value => {
  if (!value) return ''
  value = value.toString()
  return new Date(value).toLocaleDateString('en', {
    day: 'numeric',
    month: 'short'
  })
})
