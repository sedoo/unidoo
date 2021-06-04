<template>
<span> 
  <v-snackbar v-model="snackbar" :color="type" :timeout="timeout" :centered="position == 'centered'" :top="position == 'top'" :bottom="position == 'bottom'">
      {{ message }}
    <v-btn dark text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
  </span>
</template>

<script>
import Plugin from '../plugin.js'

export default {
  components: {
  },
  data () {
    return {
      snackbar: false,
      message: '',
      type: '',
      position: 'top',
      timeout: 4000
    }
  },
  methods: {
    show (params) {
      this.message = params.message
      this.position = params.position ? params.position : this.position
      this.timeout = params.timeout ? params.timeout : this.timeout
      this.type = params.type ? params.type : this.type
      this.snackbar = true
    },

    params (params) {
      this.position = params.position ? params.position : this.position
      this.timeout = params.timeout ? params.timeout : this.timeout
      this.type = params.type ? params.type : this.type
    }
  },
  beforeMount () {
    Plugin.EventBus.$on('unidoo-alert-show', params => {
      this.show(params)
    })

    Plugin.EventBus.$on('unidoo-alert-params', params => {
      this.params(params)
    })
  }

}
</script>

<style scoped>

.v-snack:not(.v-snack--absolute) {
  z-index: 2000;
}

</style>
