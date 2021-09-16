# Heatmap / Datepicker

## Description

Un calendrier de disponibilité de données avec dates sélectionnables et présenté comme une heatmap.

*Inspiré par https://github.com/julienr114/vue-calendar-heatmap*

## Utilisation

Pour utiliser ce composant il faut insérer le tag **unidoo-heatmap** dans un composant **v-app** en passant une variable de type date au **v-model** :

```
    <unidoo-heatmap
        v-model="date"
        :values="availability"
    ></unidoo-heatmap>
```

## Propriétés

| Nom          | Type           | Defaut  | Requis   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **values**          | Array | undefined | yes | Liste de dates avec un *count* associé ( voir détails plus bas ) |
| **year**          | Date or String | undefined | yes | L'année en cours. Peut être un texte comme '2021' |
| **completeValue**          | Number | undefined | no | Définit le rang maximal des *count*, si non défini la valeur prise est le maximum des *count* |
| **rangeColor**          | Array | Default colors | no | Tableau de couleurs en hexadécimal, utilisé pour affiché un gradient de couleur selon le rang du *count* |
| **missingAllowed**          | Boolean | false | no | Spécifie si la sélection sur les entrées manquantes est autorisée |
| **tooltip**          | Boolean | true | no | Affiche les tooltip |
| **showCount**          | Boolean | false | no | Affiche les valeurs des *count* dans le tooltip |
| **tooltipUnit**          | String | 'files' | no | Unité du champ *count* affichée dans le tooltip |
| **noDataText**          | String | formated date | no | Définit le texte pour les entrées manquantes |
| **returnObject**          | Boolean | false | no | Retourne une date ou l'object contenant la date, le *count* et color index |

- Détails du champ **values** :

```
    "values": [
        { 
            "count" : Number, 
            "date" : Date or ISO String date 
        }
    ]
```

## Exemple

<demo-heatmap />

