<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col>
                    <v-btn
                        color="success"
                        @click="showSuccessMessage"
                        >show success</v-btn
                    >
                </v-col>
                <v-col>
                    <v-btn
                        color="error"
                        @click="showErrorMessage"
                        >show Error</v-btn
                    >
                </v-col>
                <v-col>
                    <v-btn color="warning" @click="showMessage"
                        >show custom message</v-btn
                    >
                </v-col>
            </v-row>
        </v-container>

        <UnidooAlert />
    </v-app>
</template>

<script>
export default {

    methods: {
        showSuccessMessage: function () {
            this.$unidooAlert.showSuccess("Message de succès");
        },
        showErrorMessage: function () {
            this.$unidooAlert.showError("Message d'erreur!");
        },
        showMessage: function () {
            const message = {
                message: "I am a custom message",
                type: "warning",
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