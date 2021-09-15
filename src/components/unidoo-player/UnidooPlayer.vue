<template>
  <v-col style="position: relative">
    <div level-selector >

     <level-selector
        v-model="entries"
        :data="data"
      ></level-selector>

    </div>
    
    <unidoo-simple-player
      constrained
      :label="label"
      :entries="entries"
    ></unidoo-simple-player>

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
  [constrained] {
    display: block;
  }

  [level-selector]{
    margin: 0 10px;
  }
</style>
