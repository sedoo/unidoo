<template>
  <div date-switch>
    <v-btn icon x-small  style="margin-right: 5px;" @click="switchDate(-1)">
      <v-icon>mdi-skip-previous</v-icon>
    </v-btn>
    <v-icon>mdi-calendar-month</v-icon>
    <v-btn icon x-small  style="margin-left: 5px;" @click="switchDate(1)">
      <v-icon>mdi-skip-next</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'date-switcher',

  props: {
    date : {
      type : [String, Date],
      default: null
    }
  },

  computed:{
    cleanedDate(){
      if(this.date){
        if(typeof this.date === 'date'){
          return date;
        } else if(typeof this.date === 'string'){
          return new Date(this.date);
        }
      } 
      return null;
    }
  },

  methods: {
    switchDate(n){
      if(this.cleanedDate && n){
        let newDate = new Date(this.cleanedDate);
        newDate.setDate(this.cleanedDate.getDate() + n);
        this.$unidooHeatmap.setDate(newDate);
      }
    }
  }
}
</script>

<style scoped>
  [date-switch]{
    display: flex;
    align-items: center;
  }
</style>


