# $unidooAlert.formatError

## Objectif 

Fournir des messages d'erreurs clairs aux utilisateurs.

### formatError

Retourne le message d'erreur d'un object Exception de type ResponseStatusException ou RuntimeException.

#### Syntax

```javascript
    self = this
    this.axios({
        method: 'post',
        url: this.service + ....,
        data: {....}
    }).then(function(response) {
        // fait quelque chose
    }).catch(function(error) {
        self.$unidooAlert.showError(

            self.$unidooAlert.formatError(
                self.$t('error.notification'), 
                error
            ), 

            self.$t('button.close')
        )
    }).finally(() => {
        // fait quelque chose
    })
```

#### Example

