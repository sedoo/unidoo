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

        callback() {
            self = this
            
            console.log("starting slow promise")
            self = this
            return new Promise(resolve => {
                setTimeout(function() {
                resolve("slow")
                console.log("slow promise is done")
                self.$unidooAlert.showSuccess('Callback has been called')
                }, 1000)
            })
            /**
            return this.axios
                .get("http://localhost:8485/statistics/v1_0/statistics")
                .then(response => {
                    console.log("Fini")
                    self.$unidooAlert.showSuccess('Callback has been called')
                }).catch(e => {
                    console.log(e);
                    self.$unidooAlert.showError(e)
                })*/
            }

    },
};
</script>

<style>
</style>