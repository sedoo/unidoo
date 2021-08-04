
export default class CalendarHeatmap {
  constructor (year, values, max) {
    this.year = this._parseDate(year)
    if (typeof max === 'number' && max >= 0) {
      this.max = max
    } else {
      this.max = Math.ceil((Math.max(...values.map(day => day.count)) / 5) * 4)
    }
    this.values = values
  }

  get activities () {
    return this.values.reduce((newValues, day) => {
      newValues[this._keyDayParser(day.date)] = {
        count: day.count,
        colorIndex: this.getColorIndex(day.count)
      }
      return newValues
    }, {})
  }

  get monthCalendar () {
    const year = this.year.getFullYear()
    const date = new Date(year, 0, 1)
    let i = 0
    return Array.from({ length: 12 },
      () => Array.from({ length: this.daysInMonth(year, i++) },
        () => {
          const dDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
          const dayValues = this.activities[this._keyDayParser(dDate)]
          date.setDate(date.getDate() + 1)
          return {
            date: dDate,
            count: dayValues ? dayValues.count : null,
            colorIndex: dayValues ? dayValues.colorIndex : 0
          }
        }
      )
    )
  }

  daysInMonth (year, month) {
    return new Date(year, month + 1, 0).getDate()
  }

  getColorIndex (value) {
    if (value == null || value === undefined) {
      return 0
    } else if (value >= this.max) {
      return 5
    } else if (value <= 0) {
      return 1
    } else {
      return (Math.ceil(((value * 100) / this.max) * (0.03))) + 1
    }
  }

  _parseDate (entry) {
    return (entry instanceof Date) ? entry : (new Date(entry))
  }

  _keyDayParser (date) {
    const day = this._parseDate(date)
    return `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`
  }
}
