# Trajectory

## Description

Affiche les trajectoires de plusieurs vols.

## Utilisation

Pour utiliser ce composant il faut insérer le tag **unidoo-trajectory-map** dans un composant **v-app** :

```
    <unidoo-trajectory-map
        :json="json"
        :color="color"
    ></unidoo-trajectory-map>
```

## Propriétés

| Nom          | Type           | Defaut  | Requis   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **json**          | String |  | oui | URL du services REST qui contient le GeoJSON |
| **color**          | String | 'red' | non | Couleur des trajectoires |


*NB : Le GeoJSON est une "featureCollection" de plusieurs "LineString"

#### Example

<demo-trajectory-map/>
