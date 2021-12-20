<template>
  <v-container>
    <section heatmap-calendar>
      <div
        month
        v-for="(month, monthIndex) in heatmap.monthCalendar"
        :key="monthIndex">
        <header>{{ lo.months[monthIndex] }}</header>
        <div days>
          <div
            :class="computeClass(day)"
            v-for="(day, dayIndex) in month"
            :key="dayIndex"
            :data-day="formatDate(day.date)"
            :data-count="day.count"
            :data-color="day.colorIndex"
            :style="{ opacity : ((day.date <= now) ? 1 : 0.3), backgroundColor: getColor(day.colorIndex) }"
            v-tooltip="tooltipOptions(day)"
            @click="handleClick($event,day)">
            <div v-if="day.date < now" :style="{ color: getTextColor(day) }">{{ dayIndex + 1 }}</div> 
          </div>
        </div>
      </div>
    </section>
  </v-container>
</template>

<script>
import Plugin from '../../plugin.js'
import { VTooltip } from 'v-tooltip'
import Heatmap from './Heatmap'
import { DEFAULT_LOCALE, DEFAULT_RANGE_COLOR, DEFAULT_TOOLTIP_UNIT } from './consts.js'

VTooltip.enabled = window.innerWidth > 768

export default {
  directives: {
    tooltip: VTooltip
  },
  props: {
    value: {
      type: [Date, Object]
    },
    values: {
      required: true,
      type: Array
    },
    year: {
      required: true
    },
    completeValue: {
      type: Number
    },
    rangeColor: {
      type: Array,
      default: () => DEFAULT_RANGE_COLOR
    },
    missingAllowed: {
      type: Boolean,
      default: () => false
    },
    locale: {
      type: Object
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    tooltipUnit: {
      type: String,
      default: DEFAULT_TOOLTIP_UNIT
    },
    showCount: {
      type: Boolean,
      default: false
    },   
    noDataText: {
      type: String,
      default: null
    },
    returnObject: {
      type: Boolean,
      detault: false
    },
    heatmapKey: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    now: new Date(new Date().setHours(23,59,59,999)) 
  }),
  watch: {
    dateValue (val) {
      this.focusDate(val)
      this.updateDateSwitcher(val)
    },
    year (val, old) {
      if (val !== old) {
        const rects = document.querySelectorAll('[heatmap-calendar] [month] .monthday')
        rects.forEach(element => {
          element.classList.remove('day-focus')
        });
        this.focusDate(this.dateValue)
        this.updateDateSwitcher(null)
      }
    }
  },
  computed: {
    heatmap () {
      return new Heatmap(this.year, this.values, this.completeValue)
    },
    lo () {
      if (this.locale) {
        return {
          months: this.locale.months || DEFAULT_LOCALE.months,
          days: this.locale.days || DEFAULT_LOCALE.days,
          on: this.locale.on || DEFAULT_LOCALE.on,
          less: this.locale.less || DEFAULT_LOCALE.less,
          more: this.locale.more || DEFAULT_LOCALE.more
        }
      }
      return DEFAULT_LOCALE
    },
    dateValue() {
      if(this.value){
        return (this.value instanceof Date) ? this.value : this.value.date;
      } else {
        return this.value;
      }
    }
  },
  beforeMount () {
    Plugin.EventBus.$on("unidoo-heatmap-set-date", params => {
      if(this.heatmapKey) {
        if (params.key === this.heatmapKey && params.date){
          this.setDate(params.date)
        } 
      } else if(params.date) {
        this.setDate(params.date)
      }
    })
    Plugin.EventBus.$on("unidoo-heatmap-get-date", params => {
      if(this.heatmapKey) {
        if (params.key === this.heatmapKey){
          this.updateDateSwitcher(this.dateValue)
        } 
      } else { 
        this.updateDateSwitcher(this.dateValue)
      }
    })
  },
  methods: {
    computeClass (day) {
      return `monthday ${((day.date <= this.now) ? 'clickable' : 'not-clickable')} ${(this.isSameDay(day.date, this.dateValue) ? 'day-focus' : '')}`
    },
    tooltipOptions (day) {
      if (this.tooltip) {
        if (day.count != null) {
          if (this.showCount) {
            return {
              content: `<b>${day.count} ${this.tooltipUnit}</b> ${this.lo.on} ${this.lo.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`,
              delay: { show: 150, hide: 50 }
            }
          } else {
            return {
              content: `${this.lo.on} ${this.lo.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`,
              delay: { show: 150, hide: 50 }
            }
          }
        } else if (this.noDataText) {
          return {
            content: `${this.noDataText}`,
            delay: { show: 150, hide: 50 }
          }
        } else {
          return {
            content: `${this.lo.on} ${this.lo.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`,
            delay: { show: 150, hide: 50 }
          }
        }
      }
      return false
    },
    handleClick (e, day) {
      if (day) {
        if (day.date <= this.now && (typeof day.count === 'number' || this.missingAllowed)) {
          if(this.returnObject){
            this.$emit('input', day);
          } else {
            this.$emit('input', day.date);
          }
        }
      }
    },
    setDate (d) {
      if (!d) return
      const day = this.heatmap.getDayFromDate(d);
      this.handleClick(null, day);
    },
    updateDateSwitcher (d) {
      this.$unidooDateSwitcher.update({
        hasPrevious: this.hasPreviousDate(d), 
        hasNext : this.hasNextDate(d), 
        previousAvailable : this.heatmap.getPreviousAvailableDate(d),
        nextAvailable : this.heatmap.getNextAvailableDate(d) 
      }, this.heatmapKey);
    },
    hasPreviousDate (d) {
      if(!d || !this.compairDateWithYear(d)) return false
      const syear = (this.year instanceof Date) ? this.year.getFullYear() : this.year;
      const firstDay = new Date(syear, 0, 1);
      if(d <= firstDay) return false;
      return true; 
    },
    hasNextDate (d) {
      if(!d || !this.compairDateWithYear(d)) return false
      const today = new Date();
      today.setHours(0,0,0,0);
      if(d >= today) return false;
      return true;
    },
    focusDate (d) {
      if (!d) return
      const date = this.formatDate(d);
      const el = this.$el.querySelector(`[data-day='${date}']`)
      if (el) {
        this.focusElement(el)
      }
    },
    focusElement (el) {
      const rects = this.$el.querySelectorAll('[heatmap-calendar] [month] .monthday')
      rects.forEach(element => {
        element.classList.remove('day-focus')
      });
      el.classList.add('day-focus');
    },
    getColor (index) {
      if (typeof this.rangeColor[index] === 'undefined') {
        return this.rangeColor[0]
      } else {
        return this.rangeColor[index]
      }
    },
    // compute text contrast (source https://codepen.io/davidhalford/pen/ywEva)
    getTextColor (day) {
      const rectColor = this.getColor(day.colorIndex)
      if (rectColor && rectColor.startsWith('#')) {
        const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */
        const hRed = this.hexToR(rectColor)
        const hGreen = this.hexToG(rectColor)
        const hBlue = this.hexToB(rectColor)
        const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000
        if (cBrightness > threshold) {
          return "#000000"
        } else {
          return "#ffffff"
        }
      } else {
        return "#000000"
      }
    },
    hexToR (h) {
      return parseInt((this.cutHex(h)).substring(0, 2), 16)
    },
    hexToG (h) {
      return parseInt((this.cutHex(h)).substring(2, 4), 16)
    },
    hexToB (h) {
      return parseInt((this.cutHex(h)).substring(4, 6), 16)
    },
    cutHex (h) {
      return (h.charAt(0) === "#") ? h.substring(1, 7) : h
    },
    formatDate (d) {
      if (!d) return ''
      const date = new Date(d)
      if (!date) return ''
      const dd = date.getDate()
      const mm = date.getMonth() + 1
      const yyyy = date.getFullYear()
      return `${yyyy}-${mm}-${dd}`
    },
    isSameDay (first, second) {
      if (!first || !second) return false
      return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    },
    compairDateWithYear (d) { 
      if(this.year && d){
        const sd = '' + ((d instanceof Date) ? d.getFullYear() : d);
        const syear = '' + ((this.year instanceof Date) ? this.year.getFullYear() : this.year);
        return syear === sd;
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped>
  section[heatmap-calendar] {
    display:flex;
    flex-flow:row wrap;
    max-width: 1300px;
    line-height: 1.5;
  }
  section[heatmap-calendar] [month] {
    display:flex;
    flex: 0 0 580px;
    flex-flow:row nowrap;
    align-items: top;
  }
  section[heatmap-calendar] [month] header {
    flex: 0 0 35px;
    color:#767676;
    font-size: 12px;
  }
  section[heatmap-calendar] [month] [days] {
    display: flex; 
    flex-direction: row; 
    flex-wrap: wrap; 
    margin: 0 5px;
  }
  section[heatmap-calendar] [month] .monthday{
    margin-right: 2px;
    margin-bottom: 2px;
    width:15px;
    height:15px;
    text-align: center;
    background-color:rgb(235, 237, 240);
  }
  section[heatmap-calendar] .monthday:not(:nth-child(7n+1)) > div {
    display:none;
  }
  section[heatmap-calendar] [month] .monthday.not-clickable {
    opacity:0.2;
  }
  section[heatmap-calendar] [month] .monthday.clickable:hover {
    outline:2px solid rgb(195, 195, 195);
    cursor: pointer;
  }
  section[heatmap-calendar] [month] .monthday > div {
    fill:black;
    pointer-events:none;
    font-size: 11px;
    letter-spacing: 0;
    line-height: 15px;
  }
  section[heatmap-calendar] [month] .monthday.day-focus{
    box-shadow: 0px 0px 0px 1px rgba(255,0,0,0.5);
  }
  section[heatmap-calendar] [month] .monthday.day-focus::before{
    display: block;
    position: absolute;
    content: '';
    height: 15px;
    width: 15px;
    background: rgba(255,55,43,0.5);
  }
  @media screen and (max-width: 1160px) {
    section[heatmap-calendar] [month] {
      flex:auto;
    }
  }
</style>
<style>
 .vue-tooltip-theme.tooltip {
    display: block !important;
    z-index: 10000;
  }
  .vue-tooltip-theme.tooltip .tooltip-inner {
    background: rgba(0, 0, 0, .7);
    border-radius: 3px;
    color: #ebedf0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    line-height: 16px;
    padding: 14px 10px;
  }
  .vue-tooltip-theme.tooltip .tooltip-inner b {
    color: white;
  }
  .vue-tooltip-theme.tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }
  .vue-tooltip-theme.tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }
  .vue-tooltip-theme.tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .vue-tooltip-theme.tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }
  .vue-tooltip-theme.tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .vue-tooltip-theme.tooltip[x-placement^="right"] {
    margin-left: 5px;
  }
  .vue-tooltip-theme.tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .vue-tooltip-theme.tooltip[x-placement^="left"] {
    margin-right: 5px;
  }
  .vue-tooltip-theme.tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .vue-tooltip-theme.tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }
  .vue-tooltip-theme.tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
</style>
