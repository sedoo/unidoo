<template>
    <v-app>
        <v-col>
            <v-text-field label="label" v-model="label"/>
            <unidoo-player
              :label="label"
              :data="values"
            ></unidoo-player>
            <a href="https://misva.aeris-data.fr/">* Images from MISVA web site</a>
        </v-col>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            label: '2021-09-01',
            values: null,
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        loadItems(){
            const self = this;
            this.axios
                .get("https://services.aeris-data.fr/campaigns/data/v1_0/request?product=Synopt_Cartes_Prevues&filter=2021-09-01&campaign=MISVA")
                .then(response => {
                    if(response.data){
                        self.values = response.data
                    }
                }).catch(e => {
                    console.log(e);
                })
        }
    }
};
</script>