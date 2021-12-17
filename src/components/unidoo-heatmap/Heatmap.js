
export default class CalendarHeatmap {
  constructor (year, values, max) {
    this.year = this._parseDate(year)
    if (typeof max === 'number' && max >= 0) {
      this.max = max
    } else {
      this.max = Math.ceil((Math.max(...values.map(day => day.count)) / 5) * 4)
    }
    this.values = values.map(v => { return { date: this._valuesDateFormat(v.date), count: v.count }})
    const date = new Date(year, 0, 1)
    let n = 0
    this.times = this._getTimes(year)
    this.times.sort()
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

  daysInYear(year) {
    const start = new Date(year, 0, 0)
    const end = new Date(year, 11, 31)
    const diff = end - start
    return Math.floor(diff / (1000 * 60 * 60 * 24))
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

  getDayFromDate(entry) {
    if (entry) { 
      const sdate = this._valuesDateFormat(entry);
      const day = this.values.filter(d => d.date === sdate)[0];
      if (day) {
        return {
          date: new Date(day.date),
          count: day.count,
          colorIndex: this.getColorIndex(day.count)
        };
      } else {
        return { date: new Date(entry), count: NaN, colorIndex: 0 };
      }
    }
  }

  getNextAvailableDate(date, countGreaterThanZero) {
    if (date) {
      date.setHours(0, 0, 0)
      if(this.times && this.times.length) {
        let index = this.times.indexOf(this._encodeDate(date, null))
        if (index < 0) index = this.times.indexOf(this._encodeDate(date, 1))
        if (index < 0) index = this.times.indexOf(this._encodeDate(date, 0))
        if(index >= 0) {
          const maxIndex = this.times.length - 1
          let n = index + 1
          if(countGreaterThanZero) {
            while (n < maxIndex){
              const curr = this.times[n]
              if(curr.endsWith('i')) return this._decodeDate(curr)
              n++
            }
          } else {
            while (n < maxIndex) {
              const curr = this.times[n]
              if(!curr.endsWith('n')) return this._decodeDate(curr)
              n++
            }
          }
        } 
      }
    }
    return null
  }

  getPreviousAvailableDate(date, countGreaterThanZero) {
    if (date) { 
      date.setHours(0, 0, 0)
      if(this.times && this.times.length) {
        let index = this.times.indexOf(this._encodeDate(date, null))
        if (index < 0) index = this.times.indexOf(this._encodeDate(date, 1))
        if (index < 0) index = this.times.indexOf(this._encodeDate(date, 0))
        if (index > 0) {
          let n = index - 1
          if (countGreaterThanZero) {
            while (n > 0) {
              const curr = this.times[n]
              if(curr.endsWith('i')) return this._decodeDate(curr)
              n--
            }
          } else {
            while (n > 0) {
              const curr = this.times[n]
              if(!curr.endsWith('n')) return this._decodeDate(curr)
              n--
            }
          }
        }
      }
    }
    return null
  }

  _getTimes (year) {
    const date = new Date(year, 0, 1)
    let n = 0
    return Array.from({ length : this.daysInYear(year) }, 
      () => {
        const dDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        dDate.setHours(0, 0, 0)
        const dayValues = this.activities[this._keyDayParser(dDate)]
        date.setDate(date.getDate() + 1)
        return this._encodeDate(dDate, (dayValues) ? dayValues.count : null)
      }
    )
  }
  
  _valuesDateFormat (d) {
    if (!d) return ''
    const date = this._parseDate(d)
    return `${date.getFullYear()}-${this._paddNumber(date.getMonth() + 1)}-${this._paddNumber(date.getDate())}`
  }

  _paddNumber (n) {
    return new String(n).padStart(2, '0')
  }

  _encodeDate (d, count) {
    const date = this._parseDate(d)
    return this._valuesDateFormat(date) + ((Number.isFinite(count)) ? ((count > 0) ? 'i' : 'o') : 'n')
  }

  _decodeDate (d) {
    if (!d) return null
    const sdate = d.slice(0, -1)
    return new Date(sdate)
  }

  _parseDate (entry) {
    return (entry instanceof Date) ? entry : (new Date(entry))
  }

  _keyDayParser (date) {
    const day = this._parseDate(date)
    return `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`
  }
}
