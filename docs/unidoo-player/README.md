# Image player

## Use 

Provide a player to display a set of images filterer by level selector and handled as frames.

To use this component insert the tag **unidoo-player** inside a **v-app** component.

## Props

| Name          | Type           | Default  | Required   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **label**          | String | 'frame' | no | Label used to prefix frame title |
| **data**          | Object | undefined | no | Object containing data entries and level definition |

The **data** parameter has to be filled with an object containing fields **levels** and **entries** :

- the field **levels** is optional, it contains an array of levels definition. Display order use the alphabetical sort of *name* field values. Definition example :

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

- the field **entries** contains an array of data entries. Each entry must define fields *type (displayed value on graduation)*, *media.content (image location)* and optionally the field *levels (to define entry/level associations)*. Basic example for one entry with levels :

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

*NB : the number of levels in entries objects must be the same as in levels definition.*

## Example

<demo-unidoo-player/>

