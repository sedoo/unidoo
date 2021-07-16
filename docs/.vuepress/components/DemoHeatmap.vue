<template>
    <v-app>
        <v-col>
            <v-col>
                <v-row style="margin-bottom: 20px">
                    <v-checkbox
                        class="checkbox"
                        v-model="year"
                        label="2020"
                        value="2020"
                        hide-details
                    ></v-checkbox>
                    <v-checkbox
                        class="checkbox"
                        v-model="year"
                        label="2021"
                        value="2021"
                        hide-details
                    ></v-checkbox>
                    <v-checkbox
                        class="checkbox"
                        v-model="year"
                        label="2022"
                        value="2022"
                        hide-details
                    ></v-checkbox>
                </v-row>
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
                :end-date="year"
                :showCount="showCount"
                :rangeColor="(showCustomColor) ? customRangeColor : undefined"
                :noDataText="(showCustomMessage) ? customMessage : undefined"
            ></unidoo-heatmap>
            <UnidooAlert />
        </v-col>
    </v-app>
</template>

<script>
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
            values: [{ 'count' : 100, 'date' : '2021-07-10T00:00:00Z' }, { 'count' : 50.5, 'date' : '2021-07-09T00:00:00Z' }, { 'count' : 1, 'date' : '2021-07-08T00:00:00Z' }, { 'count' : 0, 'date' : '2021-01-04T00:00:00Z' }, { 'count' : 0, 'date' : '2021-02-14T00:00:00Z' }]
        };
    },
    watch: {
        date (val) {
            this.$unidooAlert.showSuccess("Selected date : ", val.toLocaleDateString('en-EN'));
        }
    },

    methods: {
       
    }
};
</script>

<style scoped>
.checkbox {
    padding-left: 15px
}
</style>