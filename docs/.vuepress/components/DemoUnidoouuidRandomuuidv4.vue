<template>
    <v-app>
        <v-row>
            <v-col class="mb-2 mt-4">
                <v-btn @click="generateRandomUuid" class="mr-2">Generate random uuid v4</v-btn> {{uuid}}
            </v-col>
        </v-row>
        <unidoo-confirm-dialog />
    </v-app>
</template>

<script>
export default {
    data () {
    return {
        uuid:""
    }
    },
    methods: {
        generateRandomUuid: function () {
            this.uuid = this.$unidooUuid.randomUuidV4();
        },
    },
};
</script>

<style>
</style>