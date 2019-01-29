<template>
  <div class="hello">
    <h1>{{currentWeather ? currentWeather.apparentTemperature : '--'}}°</h1>
    <img :src="weatherIcon" :alt="weather.icon"/>
    <p>{{currentWeather ? currentWeather.summary : '--'}}</p>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      weather: {
        temp: 0,
        icon: 'unknown',
        summary: 'no data'
      }
    }
  },
  props: {
    msg: String
  },
  computed: {
    currentWeather() {
      let w = this.$store.getters.weather
      console.log('weather', w)
      if ( w.hasOwnProperty("currently") ) {
        return w.currently
      } else {
        return null
      }
    },
    
    weatherIcon() {
      let w = this.$store.getters.weather
      return this.thingWrapper()
    },
    weatherStr() {
      let temp = this.$store.getters.weather.temp
      let str = temp + '°'

    },
    weatherIcon() {
      let { type } = this.weather
      return `${type}.png`
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
