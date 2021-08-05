<template>
  <v-col style="position: relative">
    <div level-selector >

     <level-selector
        v-model="entries"
        :data="data"
      ></level-selector>

    </div>
    <div>
      <div v-if="hasData">

        <unidoo-simple-player
          class="constrained"
          :label="label"
          :entries="entries"
        ></unidoo-simple-player>

      </div>
      <v-row class="constrained placeholder" v-else-if="mask">{{ maskMessage }}</v-row>
      <v-row class="constrained placeholder" v-else>{{ noDataMessage }}</v-row>
    </div>
    <div mask v-if="mask"></div>
  </v-col>
</template>

<script>

export default {

  props: {
    label: {
      type: String,
      default: 'frame'
    },


    data:{
      type: Object,
      default: () => null
    },

    mask:{
      type: Boolean,
      default: () => false
    },

    maskMessage: {
      type: String,
      default: 'Loading ...'
    },

    noDataMessage: {
      type: String,
      default: 'no accessible data'
    }
  },

  data: () => ({
    entries: null
  }),

  computed:{
    hasData(){
      return (this.data && this.data.entries && this.data.entries.length);
    },
  }

}
</script>
<style scoped>
  .constrained {
    display: block;
    height: 610px;
  }

  [level-selector]{
    margin: 0 10px;
  }

  .placeholder{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  [mask]{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity : 0.5;
    background: white;
  }

</style>
