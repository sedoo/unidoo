<template>
  <div selector>
    <v-col level-selector v-if="levels && data">

      <v-row v-for="(key) in levelKeys"
        :key="key"
      >
        <level-selector-row
          v-model="selector[key]"
          :label="levels[key].label"
          :availableOptions="availableOptions[key]"
          :options="getAllOptions(key)"
        ></level-selector-row>

      </v-row>
    </v-col>
  </div>
</template>

<script>
const SEPARATOR = '$$$$';

export default {

  props: {
    data: {
      default: null
    },   

    value: {
      type: Array
    },

    showUnavailable:{
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    levels: null,
    selector: null,
    levelOptions: null, // tree used to update options
    options: null,
    entries:  null,
    levelKeys: null,
    availableOptions: null
  }),
 
  watch: {
    data(val) {
      this.initData(val);
    },

    selector: {
      handler(val) {
        this.loadSelector(val);
      },
      deep: true
    },
    
  },

  mounted(){
    this.initData(this.data);
  },

  methods: {

    initData(data) {
      if(data){
        if(data.entries && data.entries.length){
          if(data.levels){
            this.initLevels(data.levels, data.entries);
          } else {
            this.$emit('input', this.sort(data.entries));
          }
        } else {
          this.$emit('input', []);
        }
      } else {
        this.$emit('input', []);
      }
    },

    loadSelector(val){
      // update options by level
      if (val) {
        if (!this.availableOptions) {
          this.availableOptions = {};
        }
        const keys = Object.keys(val);
        keys.sort();
        const self = this;
        keys.forEach(k => {
          const values = self.optionsFromLevel(k);
          if (JSON.stringify(values) != JSON.stringify(self.availableOptions[k])) {
            self.availableOptions[k] = values;
          }
        })
      }
      // return data from entries map and selector value
      this.$emit('input', this.sort(this.entries[this.getLevelIdFromSelector(val)]));
    },

   initLevels(levels, entries){

      if(levels.length > 0 && entries.length > 0){
        this.levelKeys = [];
        this.levels = {};
        this.entries = {};
        this.levelOptions = {};

        levels.forEach(l => {
          this.levelKeys.push(l.name);
          this.levels[l.name] = { label : l.label };
        });

        this.levelKeys.sort();
        
        // init default selector using first entry
        let defaultSelector = {};
        entries[0].levels.forEach(l => {
          defaultSelector[l.name] = l.value;
        });

        // init options tree
        let tempOptions = {};
        entries.forEach(entry => {
          if(entry.levels){
            
            
            let entryLevels = [...entry.levels];
            entryLevels.sort((a, b) => b.name.localeCompare(a.name));            

            let branch = null;
            entryLevels.forEach(l => {
              let tuple = {};
              tuple[l.value] = branch
              branch = tuple;
              
            });

            this.mergeDeep(tempOptions, branch);

            let curLevels = entry.levels;
            curLevels.sort((a, b) => a.name.localeCompare(b.name));

            let levelId = '';
            curLevels.forEach(l => {
              
              if(this.levels[l.name]){
                if(!this.levels[l.name].values) this.levels[l.name].values = [];
                this.pushIfNotExist(this.levels[l.name].values, l.value);

              }

              // compute id with options combination
              levelId += ((levelId) ? SEPARATOR : '') + l.value;
            });

            if(!this.entries[levelId]) this.entries[levelId] = [];

            // store data by options combination
            this.entries[levelId].push(entry);
          }

        });
        
        this.levelOptions = tempOptions;
  
        if(this.selector){
          // try to return data from entries map and last selector value
          // else use selector default value
          let lastSelectionEntries = this.entries[this.getLevelIdFromSelector(this.selector)];
          if(lastSelectionEntries && lastSelectionEntries.length > 0){
            this.loadSelector(this.selector);
          } else {
            this.selector = defaultSelector;
          }
        } else {
          this.selector = defaultSelector;
        }
      }
    },

    mergeDeep(target, source) {
      const isObject = (obj) => obj && typeof obj === 'object';

      if (!isObject(target) || !isObject(source)) {
        return source;
      }

      Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (isObject(targetValue) && isObject(sourceValue)) {
          let t = Object.assign({}, targetValue);
          target[key] = this.mergeDeep(t, sourceValue);
        } else {
          target[key] = sourceValue;
        }
      });

      return target;
    },

    getLevelIdFromSelector(selectorValue){
      let levelId = '';
      if(selectorValue){
        let keys = Object.keys(selectorValue);  
        keys.sort();

        keys.forEach(k => {
          levelId += ((levelId) ? SEPARATOR : '') + selectorValue[k];
        });
      }
      return levelId;
    },

    optionsFromLevel(key){
      if(this.levelOptions && this.selector){

        const selectorKeys = Object.keys(this.selector);
        selectorKeys.sort();

        const index = selectorKeys.indexOf(key);
        const indexes = selectorKeys.slice(0,index);

        // traverse levelOptions by level using selector values
        let result = this.levelOptions;
        const self = this;
        indexes.forEach(k => {
          const tmp = result[self.selector[k]];
          if(tmp){
            result = tmp;
          } else {
            result = result[Object.keys(result)[0]];
          }
        });

        return Object.keys(result);
      }
    },

    getAllOptions(key){
      if(this.showUnavailable && this.levels[key]){
        return this.levels[key].values;
      } else {
        return null;
      }
    },

    pushIfNotExist(array, element) { 
        if (array && !array.includes(element)) {
            array.push(element);
        }
    },

    sort(array){
      if (array) {
        if (array.length > 1){
          let compare = null;
      
          compare = function(a, b) {
            let first = a.type;
            let second = b.type;

            if (!isNaN(first) && !isNaN(second)) {
              first = parseInt(a.type);
              second = parseInt(b.type);
            }

            if ( first > second ){
              return 1;
            }
            if ( first < second ){
              return -1;
            }
            return 0;
          }
        
          return [...array].sort(compare);
        } else {
          return [...array];
        }
      } else {
        return array;
      }
      
    },
  }

}
</script>
<style scoped>
 

</style>

