<template>
    <v-app>       
       <unidoo-crud-table  :columns="columns" :title="title" :url="url"/>   
    </v-app>
</template>

<script>
export default {
      data () {
    return {
      url: "https://services.iagos-data.fr/test/v2.0/constants/countries",
      title: "Countries table",
      columns:[
        {
          "text": "Name",
          "value": "name",
        },
        {
          "text": "Name 2",
          "value": "name2",
        },
        {
          "text": "Region",
          "value": "region",
        },
        {
          "text": "Sub Region",
          "value": "subRegion",
        },
        {
          "text": "Actions",
          "value": "actions",
        },
      ]

    }
  },

};
</script>

<style>
</style>