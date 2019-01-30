<template>
  <div class="main">
    <h1>{{currentWeather ? currentWeather.apparentTemperature : '--'}}°</h1>
    <img v-show="weatherError ? false : true" class="icon" :src="weatherIcon" :alt="weather.icon"/>
    <img v-show="weatherError" class="icon" src="../assets/default.svg"/>
    <p>{{weatherError ? weatherError : currentWeather.summary}}</p>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      weather: {
        temp: 0,
        icon: 'default',
        summary: 'no data'
      }
    }
  },
  computed: {
    currentWeather() {
      let w = this.$store.getters.weather
      console.log('weather', w)
      if ( w.hasOwnProperty("currently") ) {
        return w.currently
      } else {
        return false
      }
    },
    weatherError() {
      let error = this.$store.getters.serviceError.darksky
      return error
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
<style scoped lang="scss">
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
.main {
  .icon {
    width: 100px;
  }
}
</style>
