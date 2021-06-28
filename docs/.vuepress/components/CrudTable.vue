<template>
    <v-app>       
     <v-row class="mt-6">

        <v-text-field
            class="pt-0"
            v-model="params.url"
            label="REST url root"
            type="text"
            :prepend-icon="'mdi-file-table-outline'"
          ></v-text-field>  
          <v-text-field
            class="pt-0"
            v-model="params.title"
            label="Table title"
            type="text"
            :prepend-icon="'mdi-file-table-outline'"
          ></v-text-field>
            <v-btn
              @click="showCrudTable()"
              :disabled="params.url ? false : true"
              >Draw table</v-btn
            >    <unidoo-crud-table />   
    </v-row>

            
    </v-app>
</template>

<script>
export default {
      data () {
    return {
     params: {
      url: "",
      title: "CRUD table title"
    },
    }
  },
    methods: {
        showCrudTable: function () {
      this.$unidooCrudTable.show(this.params);
    },
    },
};
</script>

<style>
</style>