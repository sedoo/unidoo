<template>
    <v-app>
        <UnidooAlert />
        <v-row>
            <v-col class="mb-2 mt-4">
                <v-btn @click="showConfirmDialog">Open confirm dialog</v-btn>
            </v-col>
            <v-col class="mb-2 mt-4">
                <v-btn @click="showConfirmDialogLoading">Open confirm dialog (loading)</v-btn>
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

        showConfirmDialogLoading: function () {
            this.$unidooConfirmDialog.show(this.callbackDelay, 'Do you confirm this action? (wait the end of treatment before closing the dialog)');
        },

        callback: function() {
            console.log(this)
            this.$unidooAlert.showSuccess('Callback has been called')
        },

        callbackDelay() {
            console.log("starting slow promise")
            return new Promise(resolve => {
                setTimeout(() => {
                resolve("slow")
                console.log("slow promise is done")
                this.$unidooAlert.showSuccess('Callback has been called and treatment has been successfully completed')
                }, 2000)
            })
            }

    },
};
</script>

<style>
</style>