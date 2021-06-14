<template>
    <v-app>
        <div>
            <v-btn
                color="success"
                @click="$unidooAlert.showSuccess('Success Message')"
                >show success</v-btn
            >
            <v-btn
                color="error"
                @click="$unidooAlert.showError('error message')"
                >show Error</v-btn
            >

            <v-btn color="warning" @click="showMessage"
                >show custom message</v-btn
            >
        </div>

        <UnidooAlert />
    </v-app>
</template>

<script>
// import UnidooAlert from "../../../src/components/UnidooAlert.vue";
export default {
    // data() {
    //     return { UnidooAlert: null };
    // },
    // mounted() {
    //     import("../../../src/components/UnidooAlert.vue").then((module) => {
    //         this.UnidooAlert = module.default;
    //     });
    // },

    methods: {
        showSuccessMessage: function () {
            this.$unidooAlert.showError(" message de succès");
            // this.$unidooAlert;
        },
        showMessage: function () {
            const message = {
                message: "I am a custom message",
                type: "warning",
                // position: "top",
            };
            this.$unidooAlert.show(message);
        },
    },
};
</script>

<style scoped>
p {
    color: red;
}
</style>>
</style>