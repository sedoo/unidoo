<template>
  <div date-switch>
    <v-btn icon x-small :disabled="!previousAvailable" title="Previous available" style="margin-right: 4px;" @click="goToPreviousAvailable(1)">
      <v-icon>mdi-skip-previous</v-icon>
    </v-btn>
    <v-btn icon x-small :disabled="!hasPrevious" title="Previous day" style="margin-right: 8px;" @click="switchDate(-1)">
      <v-icon>mdi-rewind</v-icon>
    </v-btn>
    <v-icon>mdi-calendar-month</v-icon>
    <v-btn icon x-small :disabled="!hasNext" title="Next day" style="margin-left: 8px;" @click="switchDate(1)">
      <v-icon>mdi-fast-forward</v-icon>
    </v-btn>
    <v-btn icon x-small :disabled="!nextAvailable" title="Next available" style="margin-left: 4px;" @click="goToNextAvailable(1)">
      <v-icon>mdi-skip-next</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Plugin from '../../plugin.js'

export default {
  props: {
    date: {
      type: [String, Date],
      default: null
    },
    heatmapKey: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      hasNext: false,
      hasPrevious: false,
      nextAvailable: {
        type: Date,
        default: null
      }, 
      previousAvailable: {
        type: Date,
        default: null
      },
    }
  },
  computed: {
    cleanedDate() {
      return this.cleanDate(this.date);
    }
  },
  beforeMount () {
    Plugin.EventBus.$on("unidoo-dateswitcher-update", params => {
      if (this.heatmapKey) {
        if (params.key === this.heatmapKey && params.data) {
          this.updateNearDates(params.data);
        } 
      } else if (params.data) {
        this.updateNearDates(params.data);
      } else {
        this.reset();
      }
    })
  },

  mounted () {
    this.$unidooHeatmap.getDate(this.heatmapKey);
  },

  methods: {
    reset() {
      this.hasNext = false
      this.hasPrevious = false
      this.nextAvailable = null
      this.previousAvailable = null
    },
    goToNextAvailable() {
      if (this.hasNext) {
        this.$unidooHeatmap.setDate(this.cleanDate(this.nextAvailable), this.heatmapKey);
      }
    },

    goToPreviousAvailable() {
      if (this.hasPrevious) {
        this.$unidooHeatmap.setDate(this.cleanDate(this.previousAvailable), this.heatmapKey);
      }
    },

    switchDate(n) {
      if (this.cleanedDate && n) {
        if ((n > 0 && this.hasNext) || (n < 0 && this.hasPrevious)) {
          const newDate = new Date(this.cleanedDate);
          newDate.setDate(this.cleanedDate.getDate() + n);
          this.$unidooHeatmap.setDate(newDate, this.heatmapKey);
        }
      }
    },

    updateNearDates(data) {
      if (data) {
        this.hasNext = data.hasNext
        this.hasPrevious = data.hasPrevious
        this.nextAvailable = data.nextAvailable
        this.previousAvailable = data.previousAvailable
      }
    },

    cleanDate(date) {
      if (date) {
        if (date instanceof Date) {
          return date;
        } else if (typeof date === 'string') {
          return new Date(date);
        }
      } 
      return null;
    }
  }
}
</script>

<style scoped>
  [date-switch]{
    display: flex;
    align-items: center;
    padding: 1px;
    width: fit-content;
    background: rgb(245,245,245);
    border-radius: 5px;
  }
</style>