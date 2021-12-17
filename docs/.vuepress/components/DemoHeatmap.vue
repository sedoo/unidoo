<template>
    <v-app>
        <v-col>
            <v-col>
                <v-radio-group
                    v-model="year"
                    row
                >
                    <v-radio
                        label="2020"
                        value="2020"
                    ></v-radio>
                    <v-radio
                        label="2021"
                        value="2021"
                    ></v-radio>
                    <v-radio
                        :label="nextYear"
                        :value="nextYear"
                    ></v-radio>
                </v-radio-group>
                <v-switch v-model="missingAllowed" label="Autoriser la sélection sur les entrées manquantes"></v-switch>
                <v-switch v-model="maxDefinedToZero" label="Considérer zero comme la valeur max"></v-switch>
                <v-switch v-model="showCustomColor" label="Utiliser un gradient de couleur personnalisé"></v-switch>
                <v-switch v-model="showCount" label="Afficher le compte dans le tooltip (files est l'unité par défaut)"></v-switch>
                <v-switch v-model="showCustomMessage" label="Afficher un message personnalisé pour les entrées manquantes"></v-switch>
                <v-switch v-model="returnObject" label="Retourner l'objet"></v-switch>
                
            </v-col>
            <unidoo-heatmap
                v-model="date"
                :values="availability"
                :missingAllowed="missingAllowed"
                :completeValue="(maxDefinedToZero) ? 0 : undefined"
                :year="year"
                :showCount="showCount"
                :rangeColor="(showCustomColor) ? customRangeColor : undefined"
                :noDataText="(showCustomMessage) ? customMessage : undefined"
                :returnObject="returnObject"
            ></unidoo-heatmap>
            <v-row>In addition, the date switcher component : <v-spacer></v-spacer><date-switcher :date="dateValue"></date-switcher></v-row>
            <UnidooAlert />
        </v-col>
    </v-app>
</template>

<script>
import availability from "../public/data/unidoo-heatmap/availability.json"

export default {
    data() {
        return {
            date: new Date(Date.UTC(2021, 3, 5)),
            showCustomColor: false,
            missingAllowed: false,
            maxDefinedToZero: true,
            year: '2021',
            showCount: false,
            showCustomMessage: false,
            returnObject: false,
            customMessage: 'This is a custom message for no data',
            customRangeColor: ['#E7FFD4', '#CBFFA3', '#ACFF6B', '#9af356', '#70ea12', '#62B621'],
            availability
        };
    },
    watch: {
        date (val) {
            if(val instanceof Date){
                this.$unidooAlert.showSuccess("Date sélectionnée : ", val.toLocaleDateString('fr-FR'));
            } else {
                this.$unidooAlert.showSuccess("Entrée sélectionnée : ", val);
            }
        }
    },
    computed: {
        nextYear() {
            return (new Date().getFullYear() + 1).toString()
        },
        dateValue() {
            if(this.date){
                if(this.date instanceof Date) {
                    return this.date
                } else if (this.date instanceof Object) {
                    return this.date.date
                }
            }
        }
    },

    methods: {
       
    }
};
</script>