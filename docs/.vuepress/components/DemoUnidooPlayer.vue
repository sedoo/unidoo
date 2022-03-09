<template>
    <v-app>
        <v-col>
            <v-switch v-model="showCustom" label="Afficher custom field"></v-switch>
            <v-switch v-model="hasData" label="Données disponibles"></v-switch>
            <v-text-field label="no data message" v-model="noDataMessage"/>
            <v-switch v-model="noVisibleData" label="Données non visibles"></v-switch>
            <v-text-field label="no visible data message" v-model="noQuicklooksMessage"/>
            <v-switch v-model="isLoading" label="Chargement"></v-switch>
            <v-text-field label="label" v-model="label"/>
            <unidoo-player
              :label="label"
              :data="(!hasData) ? null : values"
              :isLoading="isLoading"
              :noVisibleData="noVisibleData"
              :noDataMessage="noDataMessage"
              :noVisibleDataMessage="noQuicklooksMessage"
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
            hasData: true,
            noDataMessage: "No available data",
            noVisibleData: false,
            noQuicklooksMessage: "Existing data, no quicklook available",
            isLoading: false,
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