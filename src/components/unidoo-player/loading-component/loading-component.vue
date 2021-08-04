<template>
  <span loading></span>
</template>

<script>
  
export default {

  props: {
  },

  data: () => ({
  }),

  methods: {
  }
}
</script>
<style scoped>
  
  [loading]{
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 3px solid rgba(0, 0, 0,.3);
    border-radius: 50%;
    border-top-color: rgb(0, 0, 0);
    animation: spin 0.7s ease-in-out infinite;
    -webkit-animation: spin 0.7s ease-in-out infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }

  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }

</style>
