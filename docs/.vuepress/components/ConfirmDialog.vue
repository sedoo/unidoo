<template>
    <v-app>
        <div>
            <v-btn @click="showConfirmDialog">Open confirm dialog</v-btn>
        </div>
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