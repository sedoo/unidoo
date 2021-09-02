<template>
<v-dialog v-model="confirmDialog" persistent :width="width">
      <v-card>
        <v-card-title :class="titleClasses">{{title}}</v-card-title>
        <v-card-text>{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="confirmDialog=false">Cancel</v-btn>
          <v-btn color="primary" @click="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import Plugin from '../plugin.js'

export default {
  components: {
  },
  data () {
    return {
      confirmDialog: false,
      message: 'Do you confirm this action ?',
      title: 'Confirmation',
      titleClasses: 'headline',
      width: '500px',
      callback: {}
    }
  },
  methods: {
    confirm: function() {
      this.confirmDialog = false
      this.callback()
    },

    show (params) {
      if (params.message) {
        this.message = params.message
      }

      if (params.title) {
        this.title = params.title
      }

      if (params.callback) {
        this.callback = params.callback
      }

      if (params.titleClasses) {
        this.titleClasses = params.titleClasses
      }

      if (params.width) {
        this.width = params.width
      }

      this.confirmDialog = true
    },

    params (params) {
     
    }
  },
  beforeMount () {
    Plugin.EventBus.$on('unidoo-confirm-dialog-show', params => {
      this.show(params)
    })

    Plugin.EventBus.$on('unidoo-confirm-dialog-params', params => {
      this.params(params)
    })
  }

}
</script>

<style scoped>
</style>
