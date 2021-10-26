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
                    
                    <v-menu
                        bottom
                        right
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="mx-2"
                            fab
                            x-small
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                        </template>

                        <v-list>
                        <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                
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