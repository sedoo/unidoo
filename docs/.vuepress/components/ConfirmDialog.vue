<template>
    <v-app>
        <UnidooAlert />
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

        callback: function() {
            console.log(this)
            this.$unidooAlert.showSuccess('Callback has been called')
        }
    },
};
</script>

<style>
</style>