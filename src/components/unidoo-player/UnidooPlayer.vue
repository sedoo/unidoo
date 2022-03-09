<template>
  <v-col style="position: relative">
    <div level-selector >

     <level-selector
        v-model="entries"
        :data="data"
      ></level-selector>

    </div>

    <unidoo-simple-player
      v-if="hasData"
      class="constrained"
      :label="label"
      :entries="entries"
    >

      <template v-slot:customField>
        <slot name="customField"></slot>    
      </template>

    </unidoo-simple-player>

    <div v-else-if="noVisibleData" class="constrained placeholder">
      <div style="position: absolute; top: 0; left: 0;"><slot name="customField"></slot></div><b>{{ noVisibleDataMessage }}</b>
    </div>
    
    <div v-else class="constrained placeholder">
      <div style="position: absolute; top: 0; left: 0;"><slot name="customField"></slot></div><b>{{ noDataMessage }}</b>
    </div>

    <div v-if="isLoading" mask></div>
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

    noVisibleData:{
      type: Boolean,
      default: false
    },

    noDataMessage:{
      type: String,
      default: "No available data"
    },

    noVisibleDataMessage:{
      type: String,
      default: "Existing data, no quicklook available"
    },

    isLoading:{
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    entries: null
  }),

  computed:{
    hasData(){
      return this.data && this.data.entries && this.data.entries.length;
    },
  }

}
</script>
<style scoped>
  .constrained {
    position: relative;
    min-height: 15vh;
  }

  .placeholder{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  [level-selector]{
    margin: 0 10px;
  }

  [mask]{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    background: white;
  }
</style>
