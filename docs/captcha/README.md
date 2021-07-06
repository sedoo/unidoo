# Captcha 

## Use 

Provide a v-model based captcha mechanism

## Props

| Name          | Type           | Default  | Description  |
| ------------- |----------------| ---------|--------------|
| **size**          | String | 6 | Number of letter in the captcha |
| **color**          | String | primary | Color of the refresh button |
| **textFieldLabel**          | String | Text | Text field label |
| **refreshButtonLabel**          | String | Refesh | Refresh button label |


## Example

```html
<UnidooCaptcha size="6" v-model="valid"></UnidooCaptcha>
``` 

<demo-captcha></demo-captcha>
