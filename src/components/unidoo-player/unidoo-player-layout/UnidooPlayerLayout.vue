<template>
  <div root>

    <div player-layout elevation="0" :class="{ zoomed: isZoomed }">

      <div mask @click="zoomPlayer"></div>

      <div body>

        <div sub-body :style="subBodyStyle">
        
          <v-divider style="order: 1;"></v-divider>  

          <v-row viewer-part :style="{ order: ((playerBarTop) ? 2 : 4) }">
          
            <v-list-item player-layout-slider-part >
              <div style="display: flex; flex-direction: column; width: 100%">
                <div custom-top-left >
                  <slot name="customField"></slot>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 10px;">
                  <slot name="frameTitle">

                  </slot>
                </div>

                <v-btn
                  v-if="canPlay"
                  reload-button
                  icon
                  x-small
                  color="grey"
                  title="reload frames"
                  @click="emitReloadFrames()"
                >
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
       
                <unidoo-progress-bar v-if="showProgressBar"
                  :title="progressBarTitle"
                  :current="loadedFrames"
                  :max="max + 1">        
                </unidoo-progress-bar>

                <v-slider v-else-if="canPlay"
                  style="margin-top: -10px; padding: 0 5px;"
                  v-model="value"
                  ref="slider"
                  :id="id"
                  :max="max"
                  :min="min"
                  :tick-labels="filteredGraduation"
                  hide-details
                  ticks="always"
                  tick-size="4"
                  @click="playOrStopSlider"
                >
                  <template v-slot:prepend>
                    <div buttons>

                      <v-btn color="primary" fab x-small dark style="margin-right: 5px;" @click="previous">
                        <v-icon>mdi-skip-previous</v-icon>
                      </v-btn>

                      <v-btn v-if="!isPlaying" color="primary" fab small dark @click="clicPlay">
                        <v-icon>mdi-play</v-icon>
                      </v-btn>

                      <v-btn v-if="isPlaying" color="primary" fab small dark @click="clickStop">
                        <v-icon>mdi-stop</v-icon>
                      </v-btn>

                      <v-btn color="primary" fab x-small dark style="margin-left: 5px;" @click="next">
                        <v-icon>mdi-skip-next</v-icon>
                      </v-btn>
                    
                    </div>

                  </template>
                </v-slider>

                <iframe ref="sizeHandlerIframe" src="about:blank" style="width:100%; height:0; border:0;"></iframe>
              </div>
            </v-list-item>
            
          </v-row>

          <v-divider style="order: 3;"></v-divider>

          <v-row player-part :style="{ order: ((playerBarTop) ? 4 : 2) }">
            
            <v-list-item player-layout-displayer v-if="clickableFrame" :ripple="false" @click="playOrStopFrame">
              <div viewer-container>
                <div viewer-slot-container>
                  <slot name="displayer"></slot>
                </div>
              </div>

            </v-list-item>

            <div v-else player-layout-displayer >
              <div viewer-container>
                <div viewer-slot-container>
                  <slot name="displayer"></slot>
                </div>
              </div>
            </div>

          </v-row>

          <v-divider style="order: 5;"></v-divider>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'

export default {

  props: {
    frequency: { type: Number, default: 1000 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
    initialValue: { type: Number, default: 0 },
    autoPlay: { type: Boolean, default: true },
    graduation: { type: Array, default: () => [] },
    loop: { type: Boolean, default: false },
    loadedFrames: { type: Number, default: null },
    progressBarTitle: { type: String, default: 'Loading image' },
    clickableFrame: { type: Boolean, default: true },
    playerBarTop: { type: Boolean, default: true },
  },

  data: () => ({
    value: 0,
    isPlaying: false,
    clickedValue: null,
    id: null,
    isZoomed: false,
    filteredGraduation: [],
    sliderSize: null
  }),

  computed: {
    showProgressBar() {
      return this.max != null && this.loadedFrames != null && this.loadedFrames < this.max + 1
    },

    canPlay() {
      return this.max > 0 && this.loadedFrames >= this.max + 1
    },

    subBodyStyle(){
      const vh = (this.isZoomed) ? '72vh' : '40vh';
      return { gridTemplateRows: ((this.playerBarTop) ? '10px 140px 10px ' + vh + ' 10px' : '10px ' + vh + ' 10px 140px 10px')};
    }

  },

  watch: {

    initialValue(val) {
      this.value = val;
    },

    value(val) {
      this.$emit('input', val);
    },

    canPlay(val) {
      if (val) {
        // trick used to init wrapper v-app to the slider (app field) after its initialization in case of multi instance vuetify
        const self = this;
        Vue.nextTick(() => {
          if (self.$refs.slider) {
            const slider = self.$refs.slider;
            const apps = document.querySelectorAll('[data-app]');
            apps.forEach(elem => {
              if (elem.contains(slider.$el)) {
                slider.app = elem;
              }
            });
          }
          self.focusSlider();
        })
      }
    },

    graduation(){
      this.initGraduation();
    },

    sliderSize(){
      this.initGraduation();
    }


  },

  created() {
    this.playerListener = this.handlePlay.bind(this);
    document.addEventListener('play-stop', this.playerListener);
    this.barListener = this.keyHandler.bind(this);
    document.addEventListener('keyup', this.barListener);
  },

  mounted() {
    this.id = this.create_UUID();
    this.value = this.initialValue;
    if (this.autoPlay) {
      this.play();
    }
    document.dispatchEvent(new CustomEvent('show-play'));
    this.initIframe();
  },

  beforeDestroy() {
    this.stop();
    this.clearIframe();
  },

  destroyed() {
    document.dispatchEvent(new CustomEvent('remove-player'));
    document.removeEventListener('play-stop', this.playerListener);
    this.playerListener = null;
    document.removeEventListener('keyup', this.barListener);
    this.barListener = null;
  },

  methods: {
    play() {
      if (this.max === 0 || !this.canPlay) {
        return;
      }
      if (this.value === this.max) {
        this.value = 0;
      }
      this.isPlaying = true;
      clearInterval(this.timeInterval);
      const self = this;
      this.timeInterval = setInterval(() => {
        if (self.value === self.max) {
          if (self.loop) {
            self.value = 0;
          } else {
            self.stop();
          }
        } else if (!self.canPlay) {
          self.stop();
        } else {
          self.value++;
        }
      }, this.frequency);
    },

    clicPlay() {
      this.play();
      this.focusSlider();
    },

    stop() {
      this.isPlaying = false;
      this.clickedValue = -1;
      clearInterval(this.timeInterval);
    },
    
    clickStop() {
      this.stop();
      this.focusSlider();
    },

    next() {
      if (this.max === 0 || !this.canPlay) {
        return;
      }
      this.stop();
      if (this.value === this.max) {
        this.value = 0;
      } else {
        this.value++;
      }
      this.clickedValue = -1;
      this.focusSlider();
    },

    previous() {
      if (this.max === 0 || !this.canPlay) {
        return;
      }
      this.stop();
      if (this.value > 0) {
        this.value--;
      }
      this.clickedValue = -1;
      this.focusSlider();
    },

    playOrStop() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.play();
      }
    },

    playOrStopFrame() {
      this.zoomPlayer();
      this.clickedValue = this.value;
    },

    zoomPlayer() {
      this.isZoomed = !this.isZoomed;
      this.focusSlider();
    },

    playOrStopSlider() {
      this.stop();
      this.clickedValue = this.value;
    },

    reinit() {
      this.value = this.min;
      this.stop();
    },

    goTo(val) {
      if (val >= this.min && val <= this.max) {
        this.value = val;
        this.stop();
      } else {
        this.reinit();
      }
    },
    
    restart() {
      this.reinit();
      if (this.autoPlay) {
        this.play();
      }
    },

    emitReloadFrames() {
      this.stop();
      this.$emit('reload-frames');
    },

    initGraduation(){
      let result = [];
      if(this.graduation){
        const gradsLength = this.graduation.length;
        let delta = 1;
        if(this.sliderSize && gradsLength && this.graduation[0]){
          const firstGrad = this.graduation[0].length * 9; // nb chars * number of pixels for 1 character
          let exceed = Math.ceil(this.sliderSize - (gradsLength * firstGrad) - 30); // add 30px of margin
          exceed = (exceed < 0) ? - exceed : 0;
          const gradsExceed = exceed / firstGrad;
          if(gradsLength - gradsExceed){
            delta = Math.ceil(gradsLength / (gradsLength - gradsExceed)); 
          } else {
            delta = Math.ceil(gradsLength);
          }
        }

        let n = 0;
        this.graduation.forEach(element => {
          if (n % delta) {
            result.push(null);
            } else {
            result.push(element);
          }
          n++;
        });
      } 
        
      this.filteredGraduation = result;
    },

    initIframe(){
      const iframe = this.$refs.sizeHandlerIframe;
      if(iframe){
        const box = iframe.getBoundingClientRect();
        this.sliderSize = box.width - 114 -9 -32 -10; // - padding and margin
        const iframeWin = iframe.contentWindow;
        this.resizeListener = this.handleResize.bind(this);
        iframeWin.addEventListener('resize', this.resizeListener);
      }
    },

    clearIframe(){
      const iframe = this.$refs.sizeHandlerIframe;
      if(iframe){
        const iframeWin = iframe.contentWindow;
        if(iframeWin){
          iframeWin.removeEventListener('resize', this.resizeListener);
        }
        this.resizeListener = null;
      }
    },

    handleResize(){
      // add a delay of 500ms to handle slider width resize
      if(this.timer !== null){
        clearTimeout(this.timer);
      }
      const self = this;
      this.timer = setTimeout(() => {
        const box = self.$refs.sizeHandlerIframe.getBoundingClientRect();
        const sliderWidth = box.width - 114 -9 -32 -10;
        if(self.sliderSize != sliderWidth){
          self.sliderSize = sliderWidth;
        }
        self.time = null;
      }, 200);
    },

    create_UUID() {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    },

    focusSlider() {
      const slider = this.$refs.slider;
      if (slider && slider.$refs.thumb) {
        const thumb = slider.$refs.thumb;
        thumb.focus({ preventScroll: true });
      }
    },

    keyHandler(e) {
      if (this.isPlaying) {
        if (e.keyCode === '37') {
          // left arrow
          this.previous();
        } else if (e.keyCode === '39') {
          // right arrow
          this.clickStop();
        }
      }
    },

    handlePlay(e) {
      if (e.detail) {
        if (e.detail.play) {
          this.play();
        } else {
          this.stop();
        } 
      }
    }

  }
}
</script>
<style scoped>
  [player-layout] [body] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    max-width: 91vw;
    background: white;
    transition: opacity 0.2s ease-in-out;
    transition: margin 0.2s ease-in-out;
  }

  [player-layout] [body] [sub-body] {
    display: grid;
    background: white;
    align-items: center;
  }

  [player-layout] [mask] {
    position: fixed;
    visibility: hidden;
    z-index: 99998;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgb(0,0,0);
    opacity: 0;
    transition: all 0.2s;
  }

  [viewer-part] {
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
  }

  [player-layout-slider-part] {
    position: relative;
    margin: 10px 0;
    max-height: 100%;
  }

  [player-layout-slider-part] [custom-top-left]{
    position: absolute;
    top: -5px;
    left: 30px;
  }

  [player-part] [player-layout-displayer] {
    height: 100%;
    width: 100%;
  }

  [player-layout] [viewer-container] {
    display: flex;
    height: inherit;
    width: 100%;
    overflow: auto;
  }

  [player-layout] [viewer-container] [viewer-slot-container] {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin:auto;
  }

  [player-layout].zoomed [viewer-container] [viewer-slot-container] {
    height: fit-content;
  }

  [buttons] {
    display: flex;
    align-items: baseline;
  }

  .v-input__slider {
    align-items: center;
  }

  [reload-button] {
    position: absolute;
    top: -5px;
    right: 15px;
  }

  [player-layout].zoomed [body] {
    position: fixed;
    display: block;
    z-index: 99999;
    top: 4vh;
    left: 4vw;
    right: 4vw;
    overflow: auto;
    margin-top: -5px;
    margin-bottom: 5px;
    padding-left : 15px; 
    padding-right : 15px;
    height: auto;
    max-height: 92vh;
    border-radius: 5px;
  }

  [player-layout].zoomed [mask] {
    visibility: visible;
    opacity: 0.3;
  }

  [player-layout] [player-part] {
    height: 100%;
    margin-top: 0;
    margin-bottom: 0;
  }

  [player-layout].zoomed [player-part] {
    min-height: 60vh;
  }
  [player-layout].zoomed [player-part] [player-layout-displayer] {
    padding: 0;
  }

  @media screen and (max-width: 890px) {

    [player-part] {
      flex-direction: column-reverse;
    }

    [displayer-part] {
      flex: 0 0 100%;
      max-width: 100%;
    }
    
    [viewer-part] {
      flex-direction: column;
    }

    [slider-part] {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

</style>
<style>
  [player-layout] .v-slider__tick-label {
    font-size: 0.65em;
  }

  [player-layout] .v-slider__tick {
    cursor: pointer;
  }

  [player-layout] .v-slider--horizontal .v-slider__tick .v-slider__tick-label {
    top: 12px;
  }
</style>