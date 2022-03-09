# Image player


## Description

Un player d'images organisées en frames et filtrables par un sélecteur de paramètres.

## Utilisation

Pour utiliser ce composant il faut insérer le tag **unidoo-player** dans un composant **v-app** :

```
    <unidoo-player
        :label="label" 
        :data="values"
    ></unidoo-player>
```

## Propriétés

| Nom          | Type           | Defaut  | Requis   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **label**          | String | 'frame' | no | Label utilisé pour préfixer le titre des frames |
| **data**          | Object | undefined | no | Objet contenant les données et la définition des levels |
| **noDataMessage**          | String | 'No available data' | no | Message affiché si il n'y a pas de données |
| **noVisibleData**          | Boolean | false | no | Si *true* et pas de données, affiche le message *no visible data* |
| **noVisibleDataMessage**          | String | 'Existing data, no quicklook available' | no | Message affiché si il n'y a pas de données et que *noVisibleData* est à *true* |
| **isLoading**          | Boolean | false | no | Affiche un masque sur le player |

Le Paramètre **data** est un objet contenant les champs **levels** et **entries** :

```
    "data": {
      "levels": [],
      "entries": []
    }
```

- le champ **levels** est optionnel, il contient un tableau de définition des levels. Pour organiser les levels, les champs *name* sont utilisés et ordonnés alphabétiquement. Exemple de définition :

```
    "levels": [
      {
        "name": "Level1",
        "label": "Modele"
      },
      {
        "name": "Level2",
        "label": "Echelle"
      },
      {
        "name": "Level3",
        "label": "Parametre"
      }
    ]
```

- le champ **entries** contient les données sous forme de tableau. Chaque entrée doit définir les champs *type (la valeur affichée sur la graduation)*, *media.content (localisation de l'image)* et optionnellement le champ *levels (pour définir l'association entre les entrées et les levels définis plus tôt)*. Exemple basique pour une entrée avec levels :

```
    "entries": [
      {
        "type": "ech240",
        "media": {
          "content": "https://services.aeris-data.fr/campaigns/data/v1_0/getimage?product=Synopt_Cartes_Prevues&day=2021-08-04&file=20210804_ECMWF_CAPE-CIN_0h_Raw_MAP_Synoptic_ech240.png&campaign=MISVA"
        },
        "levels": [
          {
            "name": "Level1",
            "value": "ECMWF"
          },
          {
            "name": "Level2",
            "value": "Synoptic"
          },
          {
            "name": "Level3",
            "value": "CAPE-CIN"
          }
        ]
      }
    ]
```

*NB : dans chaque entrée le nombre et le nom des levels doivent correspondre à la définition des levels.*

## Exemple

<demo-unidoo-player/>

