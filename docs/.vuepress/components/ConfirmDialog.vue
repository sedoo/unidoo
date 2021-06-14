<template>
    <v-app>
        <v-btn @click="showConfirmDialog"></v-btn>
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