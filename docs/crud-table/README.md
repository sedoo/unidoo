# CRUD Table

## Description

Il s'agit d'un composant permettant d'afficher et editer un tableau de données simple à partir d'un lien  REST.

Type de données attendu est un tableau JSON.

Le composant se sert du lien REST comme racine pour les opérations CRUD, pour les réquêtes on utilise axios.
- Méthode POST pour créer un element :  lienREST/create 
- Méthode PUT pour mettre à jour un element :  lienREST/update
- Méthode DELETE pour supprimer un element :  lienREST/delete/{id}

Pour une utilisation optimale de ce composant il faut choisir des données non imbriquées.
Exemple de données à afficher:
         [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          }]
## Exemple 

<crud-table/>


