<template>
  <div selector-row>
    <v-row container>
      
      <span label>{{label}} : </span>

      <span line v-if="options && options.length > 0">
        <span v-for="key in options"
          value
          :key="key"
          :class="'level ' + ((availableOptions.includes(key)) ? 'clickable-level ' : 'disabled-level ')  + focus(key)"
          @click="emitInput(key, (availableOptions.includes(key)))"
        >{{key}}</span>
      </span>
      <span line v-else>
        <span v-for="key in availableOptions"
          value
          :key="key"
          :class="'level ' + 'clickable-level ' + focus(key)"
          @click="$emit('input', key)"
        >{{key}}</span>
      </span>
    
    </v-row>  
    
  </div>
</template>

<script>

export default {

  props: {
    label: {
      type: String,
      default: ''
    },   

    value: {
      type: String,
      default: ''
    },

    options: {
      type: Array,
      default: () => []
    },

    availableOptions: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    availableOptions(val) {
      if (val.length) {
        this.$emit('input', val[0]);
      }
    }
    
  },

  methods: {

    emitInput(key, available){
      if(available){
        this.$emit('input', key);
      }
    },

    focus(key) {
      return this.value == key ? 'level-focused' : '';
    }
  }

}
</script>
<style scoped>
  [selector-row] {
    margin: 5px 0;
  }

  [selector-row] [container]{
    display: flex;
    justify-items: center;
    align-items: center;
  }

  [container] [line]{
    display: flex;
    flex-flow: row wrap;
  }

  [container] [label]{
    margin-right: 10px;
    width: 100%;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .level {
    padding: 2px 15px;
    margin-right: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
    font-size: .8rem;
  }

  .disabled-level {
    background: white;
    opacity: 0.4;
  }
  
  .clickable-level {
    background: #f5f5f5;
  }

  .clickable-level:hover {
    background: #CCC;
    cursor: pointer;
  }

  .level-focused{
    background: var(--theme-color, rgb(38, 134, 197));
    color: #FFF;
  }

</style>

