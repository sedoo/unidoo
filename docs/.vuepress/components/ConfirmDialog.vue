<template>
    <v-app>
        <v-row>
            <v-col class="mb-2 mt-4">
                <v-btn @click="showConfirmDialog">Open confirm dialog</v-btn>
            </v-col>
        </v-row>
        <unidoo-confirm-dialog />
    </v-app>
</template>

<script>
export default {
    methods: {
        showConfirmDialog: function () {
            this.$unidooConfirmDialog.show(this.callback);
        },
    },
};
</script>

<style>
</style>