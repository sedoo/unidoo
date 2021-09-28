# Alert / Snackbar

## Description

Il s'agit d'un composant permettant d'afficher un message à l'utilisateur, généralement accompagné d'un code couleur correspondant au type de retour : succès, warning, erreur.


## Utilisation 

- doit être déclaré dans le projet parent
- 3 appels possible: 
    - this.$unidooAlert.showSuccess("Message de succès") affiché pendant 4000 ms
    - this.$unidooAlert.showError("Message d'erreur!") affiché pendant 8000 ms
    - this.$unidooAlert.show(message) paramètres customisable voir ci-dessous

## Params méthode personalisable show

| Name          | Type           | Default  | Required   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **message**          | String | '' | oui | Message principal dans la fenêtre de confirmation |
| **type**          | String | '' | oui | 3 valeurs recommendées: 'success', 'warning', 'error. Mais accepte nom de 'materiel color' et 'css color' |
| **position**          | String | 'top' | non | 3 valeurs possibles pour la possition du message 'top', 'centred' ou 'bottom'|
| **timeout**          | Number | 4000 | non | Temps d'affichage du message en ms |
| **closeButtonLabel**          | String | 'Close' | non | Label du bouton de fermeture |


## Syntax
```html
<template>
 <v-app class="grey lighten-4">

    <unidoo-alert></unidoo-alert>
    ...

</template>
```

```javascript
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

```

## Exemple 
<Alert/>


