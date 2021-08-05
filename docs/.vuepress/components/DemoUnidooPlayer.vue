<template>
    <v-app>
        <v-col>
            <v-text-field label="label" v-model="label"/>
            <v-row>
                <v-switch style="margin-left: 15px;" v-model="passData" label="Show data"></v-switch>
                <v-switch style="margin-left: 15px;" v-model="mask" label="Mask player"></v-switch>
            </v-row>
            <v-text-field label="no data message" v-model="noDataMessage"/>
            <v-text-field label="mask message" v-model="maskMessage"/>
            <unidoo-player
              :label="label"
              :data="(passData) ? values : null"
              :mask="mask"
              :maskMessage="maskMessage"
              :noDataMessage="noDataMessage"
            ></unidoo-player>
            <a href="https://misva.aeris-data.fr/products/synopt_cartes_prevues/">* Images from MISVA web site</a>
        </v-col>
    </v-app>
</template>

<script>
import dataJson from "../public/data/unidoo-player/data.json"

export default {
    data() {
        return {
            label: '2021-08-03',
            values: dataJson,
            mask: false,
            passData: true,
            noDataMessage: 'no data',
            maskMessage: 'maybe loading ...'
        };
    }
};
</script>