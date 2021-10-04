<template>
  <div>
    <unidoo-player-layout
      ref="player"
      v-model="playerCounter"
      :initialValue="0"
      :min="0"
      :max="max"
      :autoPlay="autoPlay"
      :graduation="graduation"
      :frequency="300"
      :loadedFrames="loadedFrames"
      @reload-frames="preloadFrames(loadIndex)"
      progressBarTitle="Loading image"
    >

      <template v-slot:displayer>

        <image-viewer
          :style="{ opacity : ((isLoadingFirstFrame) ? '0.5' : '1')}"
          :url="currentUrl"
          :title="frameTitle"
        ></image-viewer>

      </template>

      <template v-slot:frameTitle>

        <v-col>
        
          <div v-if="max > 0 && loadedFrames < (max + 1)" player-title justify="center">

            <div spinner>
              <loading-component></loading-component>
            </div>
          
          </div>

          <div  v-else frame-title>{{frameTitle}}</div>
        </v-col>
        
      </template>

    </unidoo-player-layout>
  
  </div>
</template>

<script>

export default {
  props: {
    label: { 
      type: String,
      default: 'frame'
    },

    entries: {
      type: Array,
      default: () => null
    }
  },

  data: () => ({
    autoPlay: false,
    playerCounter: 0,
    graduation: [],
    currentUrl: null,
    currentQualifier: null,
    loadedFrames: 0,
    currentFrames: [],
    isLoadingFirstFrame: false,
    isLoadingFrame: true,
    lastFrameQualifier: null,
    loadIndex: 0 // handle async load conflicts
  }),

  computed: {

    frameTitle() {
      return ((this.label) ? this.label : 'no value') + ((this.max && this.currentQualifier) ? ' : ' + this.currentQualifier : '');
    },

    max() {
      if (this.entries && this.entries.length > 0) {
        return this.entries.length - 1;
      }
      return null;
    },

  },

  watch: {
    
    entries: {
      handler(val, old) {
        if (this.$refs.player) {
          if (old && old.length > 0) {
            this.lastFrameQualifier = this.currentQualifier;
          }
          this.loadIndex += 1;
          this.preloadFrames(this.loadIndex);
          this.initGraduation();
          this.updateCurrentFrame(0);
          this.$refs.player.stop();
        }
      },
      deep: true
    },

    playerCounter(val) {
      this.updateCurrentFrame(val);
    },

    isLoadingFrame(val) {
      if (!val) {
        if (this.$refs.player) {
          this.init();
        }
      }
    }
  },

  mounted() {
    this.preloadFrames(this.loadIndex);
    this.initGraduation();
    this.init();
  },

  methods: {

    init() {
      if (this.$refs.player) {
        const lastIndex = this.getFrameQualifierIndex(this.lastFrameQualifier);
        if (lastIndex > 0) {
          this.$refs.player.goTo(lastIndex);
          this.updateCurrentFrame(lastIndex);
        } else {
          this.$refs.player.goTo(0);
          this.updateCurrentFrame(0);
        }
      }
    },
    
    initGraduation() {
      if (this.entries && this.entries.length) {
          this.graduation = []
          this.entries.forEach(element => {
            this.graduation.push(element.type);
          });
      }
    },

    preloadFrames(loadIndex) {
      if (this.entries) {
        this.isLoadingFirstFrame = true;
        this.isLoadingFrame = true;
        this.loadedFrames = 0;

        // cancel current preloads
        if (this.currentFrames && this.currentFrames.length > 0) {
          this.currentFrames.forEach(item => {
            item.src = '#';
          })
          this.currentFrames = []; // empty preloads list
        }

        if (this.entries.length) {
          const self = this;
          this.entries.forEach(item => {
            if (item.media && item.media.content) {
              var img = new Image();
              img.onload = function() {
                if (self.loadIndex === loadIndex) {
                  self.incrementPreload();
                  self.isLoadingFirstFrame = false;
                }
                img.onload = null;
                img.onerror = null;
              }
              img.onerror = function(e) {
                if (self.loadIndex === loadIndex) {
                  self.incrementPreload();
                  console.log('Error loading frame ' + item.media.content + ' : ' + e);
                }
                img.onload = null;
                img.onerror = null;
              }
              img.src = item.media.content;
              self.currentFrames.push(img); // store preload
            } else {
              console.log('Missing frame ' + item.date);
              if (self.loadIndex === loadIndex) {
                self.incrementPreload();
              }
            }
          });
        } else {
          this.isLoadingFirstFrame = false;
        }
      }
    },

    incrementPreload() {
      this.loadedFrames++;
      if (this.loadedFrames === this.max + 1) {
        this.currentFrames = []; // empty preloads list
        this.isLoadingFrame = false;
      }
    },

    updateCurrentFrame(index) {
      this.currentUrl = this.getFrameUrl(index);
      this.currentQualifier = this.getFrameQualifier(index);
    },

    getFrameUrl(index) {
      if (this.entries && this.entries[index]) {
        if (this.entries[index].media && this.entries[index].media.content) {
          return this.entries[index].media.content;
        }
      }
      return '#';
    },

    getFrameQualifier(index) {
      if (this.entries && this.entries[index]) {
        return this.entries[index].type;
      }
      return 'no value';
    },

    getFrameQualifierIndex(k) {
      let index = -1;
      if (k) {
        this.entries.forEach((element, i) => {
            if (k === element.type) {
              index = i;
            };
          });
      }
      return index;
    }
  }
}
</script>
<style scoped>
  [right-top]>* {
    margin : 10px 5px;
  }

  .right-bottom {
    margin-top: 0;
  }

  [player-title] {
    position: relative;
    height: 1.5em;
  }

  [spinner] {
    position: absolute;
    top: 0;
    left: 50%;
  }

  [frame-title] {
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 1.1rem;
  }
</style>