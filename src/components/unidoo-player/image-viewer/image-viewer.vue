<template>
  <v-col justify="center" style="display: flex; height: inherit">
    <v-row justify="center" style="height : 100%" >

      <img 
        viewer-img
        v-if="url"
        :src="url"
        aspect-ratio="1"
        :alt="title"
      />

    </v-row>

  </v-col>
</template>

<script>
  
export default {

  props: {
    url: { type: String, default: '' },
    title: { type: String, default: '' }
  },

  data: () => ({
  }),

  methods: {
  }
}
</script>
<style scoped>
  
  [viewer-img]{
    margin: auto;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: 60% 0;
  }

</style>
