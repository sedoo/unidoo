# Modal de confirmation d'action 

## Utilisation 

Valider l'action d'un utilisateur.

Type de composant : `Modal`   

## Exemple

```html

<template>
    <v-app>
        ...
        <unidoo-confirm-dialog />
        ...
    </v-app>
</template>

<script>
export default {
    methods: {
        showConfirmDialog: function () {
            this.$unidooConfirmDialog.show(this.callback);
        },

        callback: function() {
            console.log('Callback has been called')
        }
    },
};
</script>


``` 

<ConfirmDialog/>s