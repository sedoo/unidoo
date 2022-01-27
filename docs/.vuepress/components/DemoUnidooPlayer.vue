<template>
    <v-app>
        <v-col>
            <v-switch v-model="showCustom" label="Afficher custom field"></v-switch>
            <v-text-field label="label" v-model="label"/>
            <unidoo-player
              :label="label"
              :data="values"
            >
                <template v-if="showCustom" v-slot:customField>
                    
                    
                    <date-switcher></date-switcher>
                
                </template>
            </unidoo-player>
            <a href="https://misva.aeris-data.fr/">* Images provenant du site web MISVA</a>
        </v-col>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            label: '2021-09-01',
            showCustom: false,
            values: null,
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
            ]
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        loadItems(){
            const self = this;
            this.axios
                //.get("https://services.aeris-data.fr/campaigns/data/v1_0/request?product=Obs_Series&filter=2021-09-01&campaign=MISVA") 
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