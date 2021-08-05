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
                <v-switch v-model="missingAllowed" label="Allow selection on missing entry"></v-switch>
                <v-switch v-model="maxDefinedToZero" label="Consider zero as complete value"></v-switch>
                <v-switch v-model="showCustomColor" label="Use custom range of hexa color"></v-switch>
                <v-switch v-model="showCount" label="Show count in tooltip (files is the default unit)"></v-switch>
                <v-switch v-model="showCustomMessage" label="Show custom message for missing entry"></v-switch>
            </v-col>
            <unidoo-heatmap
                v-model="date"
                :values="values"
                :missingAllowed="missingAllowed"
                :completeValue="(maxDefinedToZero) ? 0 : undefined"
                :year="year"
                :showCount="showCount"
                :rangeColor="(showCustomColor) ? customRangeColor : undefined"
                :noDataText="(showCustomMessage) ? customMessage : undefined"
            ></unidoo-heatmap>
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
            customMessage: 'This is a custom message for no data',
            customRangeColor: ['#E7FFD4', '#CBFFA3', '#ACFF6B', '#9af356', '#70ea12', '#62B621'],
            values: availability
        };
    },
    watch: {
        date (val) {
            this.$unidooAlert.showSuccess("Selected date : ", val.toLocaleDateString('en-EN'));
        }
    },
    computed: {
        nextYear() {
            return (new Date().getFullYear() + 1).toString()
        }
    },

    methods: {
       
    }
};
</script>