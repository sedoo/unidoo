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
import dataJson from "../public/data/unidoo-player/data.json"

export default {
    data() {
        return {
            label: '2021-08-03',
            values: dataJson,
        };
    }
};
</script>