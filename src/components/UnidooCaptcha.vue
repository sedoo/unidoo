<template>
<span > 
  <div ref="captcha"></div>
  <div>
   <v-text-field
            :label="textFieldLabel"
            v-model ="text"
          ></v-text-field>
  <v-btn :color="color" @click="refresh">{{refreshButtonLabel}}</v-btn>
  </div>
  </span>
</template>

<script>

export default {
  components: {
  },
  
  watch: {
    valid: function (value) {
    this.$emit('input', value)
    }
  },
  
  data () {
    return {
      captcha: [],
      width: 0,
      text: ""
    }
  },
  computed: {
    valid: function () {
      if (this.captchaText == this.text) {
      return true;
      }
      return false
    },
  	captchaText: function () {
    return this.captcha.join("")
 	}
  },
  methods: {

    refresh() {
      this.text = ""
      this.generateCaptcha();
    },

    generateCaptcha() {
       const captcha = []
       const charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
        const size = Number.parseInt(this.size)
       for (var i = 0; i < size; i++) {
        // Eviter la repetition des characters
        var index = Math.floor(Math.random() * charsArray.length + 1); 
        if (captcha.indexOf(charsArray[index]) == -1) { captcha.push(charsArray[index]); } else i--;
        }
        this.width = 20 * captcha.length;
        this.captcha = captcha;

         var canv = document.createElement("canvas");
      canv.id = "canvas";
      canv.width = this.width;
      canv.height = 50;
      var ctx = canv.getContext("2d");
      ctx.font = "25px Georgia";
      ctx.strokeText(this.captcha.join(""), 0, 30);

       const captchaElement = this.$refs.captcha 

       if (captchaElement != null) {
         captchaElement.innerHTML = "";
         captchaElement.appendChild(canv); 
       }
    }
  },
  beforeMount () {
  },
  mounted() {
    this.generateCaptcha()
  },

   props: {
      size: {
        type: String,
        default: "6"
      },
      color: {
        type: String,
        default: "primary"
      },
      value: {
        type: Boolean
      },
      textFieldLabel: {
        type: String,
        default: "Text"
      },
      refreshButtonLabel: {
        type: String,
        default: "Refresh"
      },
    },

}
</script>

<style scoped>

</style>
