<template>
  <div selector-row>
    <div container>
      
      <span label>{{label}} : </span>

      <span line v-if="options && options.length > 0">
        <span v-for="item in options"
          value
          :key="item.value"
          :title="item.legend"
          :class="'level ' + ((availableOptions.includes(item.value)) ? 'clickable-level ' : 'disabled-level ')  + focus(item.value)"
          @click="emitInput(item.value, (availableOptions.includes(item.value)))"
        >{{item.value}}</span>
      </span>
      <span line v-else>
        <span v-for="item in availableOptions"
          value
          :key="item.value"
          :title="item.legend"
          :class="'level ' + 'clickable-level ' + focus(item.value)"
          @click="$emit('input', item.value)"
        >{{item.value}}</span>
      </span>
    
    </div>  
    
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
        if (this.value && val.includes(this.value)) {
          this.$emit('input', this.value);
        } else {
          this.$emit('input', val[0]);
        }
      }
    }
    
  },

  methods: {

    emitInput(key, available) {
      if (available) {
        this.$emit('input', key);
      }
    },

    focus(key) {
      return this.value === key ? 'level-focused' : '';
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
    flex-wrap: wrap;
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
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
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
