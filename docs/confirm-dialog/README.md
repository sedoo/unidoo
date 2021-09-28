# Modal de confirmation d'action 

## Utilisation 

Valider l'action d'un utilisateur.

Type de composant : `Modal`   

## Params

| Name          | Type           | Default  | Required   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **callback**          | function | {} | yes | Fonction a appler à la confirmation. Doit une méthode VueJS sans paranthèses |
| **message**          | String | Do you confirm this action ? | no | Message principal dans la fenêtre de confirmation |
| **title**          | String | Confirmation | no | Tite de la fenêtre |
| **titleClasses**          | String | headline | no | Classes CSSde la zone titre |
| **width**          | String | 500px | no | Largeur de la fenêtre |
| **cancelButtonLabel**          | String | Cancel | no | Label du bouton d'annulation |
| **confirmButtonLabel**          | String | Confirm | no | Label du bouton de confirmation |

## Synthax

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

## Exemple synthax multilangue + customisation
``` js
    this.$unidooConfirmDialog.show(this.goToMyCertificationReports, 
        this.$t('report.screen.return.confirmation.message'), 
        this.$t('report.screen.return.confirmation.title'),
        'headline grey lighten-2',
        this.$store.getters.getDialogWidth,
        this.$t('button.cancel'),
        this.$t('button.confirm'));
```

## Exemple

<ConfirmDialog/>



