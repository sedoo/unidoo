<template>
    <v-app>
            <unidoo-trajectory-map
              :json="json"
              :color="color"
            ></unidoo-trajectory-map>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            json: 'https://services.iagos-data.fr/test/v2.0/availability/tracks?month=200010',
            color: 'green', 
        };
    },
    mounted() {
    },
    methods: {

    }
};
</script>