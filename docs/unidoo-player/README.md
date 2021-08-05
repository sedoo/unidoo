# Image player

## Use 

Provide a player to display a set of images filterer by level selector and handled as frames.

To use this component insert the tag **unidoo-player**.

The **data** parameter has to be filled with an object containing fields **levels** and **entries** :

- **levels** contains an array of levels definition. The display order use the alphabetical sort of *name* fields. Definition example :

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

- **entries** contains an array of data entries. Each entry must define fields *type*, *media.content* (image location) and optionally the field *levels* (to define the level association of the entry). Basic example :

```
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
```


## Props

| Name          | Type           | Default  | Required   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **label**          | String | 'frame' | no | Label used to prefix frame title |
| **data**          | Object | undefined | no | Object containing data entries and level definition |
| **noDataMessage**          | String | 'no accessible data' | no | Message displayed if there is no data |
| **mask**          | Boolean | false | no | Masks the player if true |
| **maskMessage**          | String | 'Loading ...' | no | Message displayed if there is no data and mask is set to true |

## Example

<demo-unidoo-player/>

