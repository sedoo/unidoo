# Heatmap / Datepicker

## Use 

Provide a data availability calendar with selectable date and displayed as an heatmap.

To use this component insert the tag **unidoo-heatmap** and pass a  **Date** type parameter in **v-model**.

Inspired by https://github.com/julienr114/vue-calendar-heatmap

## Props

| Name          | Type           | Default  | Required   | Description  |
| ------------- |----------------| --------- | ---------|--------------|
| **values**          | Array | undefined | yes | List of dates with associated count ( format : [{ 'count' : Number, 'date' : Date or ISO String date }] ) |
| **endDate**          | Date or String | undefined | yes | Use to determine time range (displayed by year). String can be like '2021' |
| **completeValue**          | Number | undefined | no | Use to set the count rank, if not defined it uses the max of count |
| **rangeColor**          | Array | Default colors | no | Array of hexadecimal colors, use to set color using rank and count index |
| **missingAllowed**          | Boolean | false | no | Specify if missing entry selection is allowed |
| **tooltip**          | Boolean | true | no | Show tooltip |
| **showCount**          | Boolean | false | no | Show count value in tooltip |
| **tooltipUnit**          | String | 'files' | no | Count field unit showed in tooltip |
| **noDataText**          | String | formated date | no | Specify a custom text for missing entry |

## Example

<demo-heatmap />

