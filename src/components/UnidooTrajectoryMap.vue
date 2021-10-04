/* eslint-disable no-new */
<template>
  <div ref="map-root" style="width: 100%; height: 100%"></div>
</template>

<script>
  import View from 'ol/View'
  import Map from 'ol/Map'
  import TileLayer from 'ol/layer/Tile'
  import OSM from 'ol/source/OSM'
    import GeoJSON from 'ol/format/GeoJSON';
      import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import { Stroke, Style } from 'ol/style';
  // importing the OpenLayers stylesheet is required for having
  // good looking buttons!
  import 'ol/ol.css'

  export default {
    name: 'MapContainer',
    components: {},
    props: {
    color: {
      type: String,
      default: 'red',
    },
    json: {
      type: String,
      default: '',
    },
    },
    mounted() {
      this.axios.get(this.json)
      .then(res => {
            const geoJsonObject = res.data
             geoJsonObject.crs = {
                type: 'name',
                properties: {
                name: 'EPSG:3857',
                },
            } 
            const styles = {
                LineString: new Style({
                    stroke: new Stroke({
                    color: this.color,
                    width: 2,
                    }),
                }),
            }
            const styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
            };
            const vectorSource = new VectorSource({
                features: new GeoJSON().readFeatures(geoJsonObject, {
            dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        })
            })

            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: styleFunction,
                });

            // this is where we create the OpenLayers map
      // eslint-disable-next-line no-new
     new Map({
        // the map will be created using the 'map-root' ref
        target: this.$refs['map-root'],
        layers: [
          // adding a background tiled layer
          new TileLayer({
            source: new OSM() // tiles are served by OpenStreetMap
          }),
          vectorLayer
        ],

        // the map view will initially show the whole world
        view: new View({
          zoom: 0,
          center: [0, 0],
          constrainResolution: true,
          projection: 'EPSG:3857'
        }),
      }).getView().fit(vectorSource.getExtent());
        })
    },
  }
</script>
