<template>
  <div>
    <div progress-bar v-bind:style="{ background: barColor }">
      <div progress v-bind:style="{ width: barWidth, background: barColor }"></div>
      <span detail>{{title}} {{current}}/{{max}}</span>
    </div>
  </div>
</template>

<script>
  
export default {

  props: {
    current: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: 1
    },

    title: {
      type: String,
      default: ''
    },

    barColor: {
      type: String,
      default: 'lightgrey'
    }
  },

  data: () => ({
  }),

  computed: {
    barWidth() {
      if (this.max) {
        return ((this.current / this.max) * 100) + '%';
      } else {
        return '100%';
      }
    }
  },

  methods: {
  }
}
</script>
<style scoped>
  
  [progress-bar]{
    position: relative;
    display: flex;
    justify-content: center;
    margin: 5px 0;
  }

  [progress-bar]::before{
    content: "";
    position: absolute;
    width: 100%; 
    height: 100%;  
    opacity: .7;
    background-color: rgb(255, 255,255);
  }

  [progress-bar]>[progress]{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transition: all .5s linear;
  }

  [progress-bar]>[detail]{
    z-index: 1;
  }

</style>
