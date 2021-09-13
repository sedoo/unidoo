# CRUD Table

## Description

Un composant permettant d'afficher et/ou editer un tableau de données simples à partir d'un lien REST.

Type de données attendues est un tableau JSON.

Le composant se sert du lien REST comme racine pour les opérations CRUD, pour les réquêtes on utilise axios.
- Méthode POST pour créer un element :  lienREST/create 
- Méthode PUT pour mettre à jour un element :  lienREST/update
- Méthode DELETE pour supprimer un element :  lienREST/delete/{id}

Pour une utilisation optimale de ce composant il faut choisir des données non imbriquées.
Pout utiliser ce composant insérer le tag  **unidoo-crud-table** dans un composant **v-app**

## Props

| Nom          | Type           | Defaut  | Requis   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **columns**          | Array | [ ] | oui | Tableau d'objets pour définir les colonnes  |
| **title**          | String | " "| non | Titre du tableau |
| **url**          | String | " " | oui | URL du service REST  |
| **onlyUpdate**          | Boolean | false | non | Enlève l'option suppression dans actions  |

Le parametre **columns** doit contenir obligatoirement les champs 'text' et 'value'. Pour ajouter l'edition rajouter au tableau l'objet { "text": "Actions","value": "actions"}.


- Exemple 

```
      url: "https://services.iagos-data.fr/test/v2.0/constants/countries",
      title: "Countries table",
      columns:[
        {
          "text": "Name",
          "value": "name",
        },
        {
          "text": "Name 2",
          "value": "name2",
        },
        {
          "text": "Region",
          "value": "region",
        },
        {
          "text": "Sub Region",
          "value": "subRegion",
        },
        {
          "text": "Actions",
          "value": "actions",
        },
      ]

    
```
<crud-table/>


