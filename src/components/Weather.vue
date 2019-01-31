<template>
  <div class="main">
    <h1>{{currentWeather ? currentWeather.temperature : '--'}}°</h1>
    <h3>feels like {{currentWeather ? currentWeather.apparentTemperature : '--'}}°</h3>
    <img class="icon" :src="getWeatherIcon" :alt="weather.icon"/>
    <p>{{weatherError ? weatherError : currentWeather.summary}}</p>
    <div class="d-flex flex-row slider">
      <div><p>precipitation: {{weather.precipProbability}}%</p></div>
      <div><p>dew point: {{weather.dewPoint}}</p></div>
      <div><p>humidity: {{weather.humidity}}</p></div>
      <div><p>wind speed: {{weather.windSpeed}} mph</p></div>
      <div><p>uv index: {{weather.uvIndex}}</p></div>
      <div><p>visibility: {{weather.visibility}}</p></div>
      <div><p>ozone: {{weather.ozone}}</p></div>
    </div>
  </div>
</template>

<script>
import iconmap from '../modules/iconmap'
export default {
  name: 'Weather',
  data() {
    return {
      weather: {
        "time": 1548807292,
        "summary": "Partly Cloudy",
        "icon": "partly-cloudy-day",
        "nearestStormDistance": 196,
        "nearestStormBearing": 347,
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 15.51,
        "apparentTemperature": 15.51,
        "dewPoint": 11.07,
        "humidity": 0.75,
        "pressure": 1014.36,
        "windSpeed": 2.28,
        "windGust": 3.7,
        "windBearing": 286,
        "cloudCover": 0.44,
        "uvIndex": 0,
        "visibility": 16.09,
        "ozone": 233.58
      }
    }
  },
  computed: {
    currentWeather() {
      let w = this.$store.getters.weather
      if ( w.hasOwnProperty("currently") ) {
        this.weather = w.currently
        return w.currently
      } else {
        return false
      }
    },
    weatherError() {
      let error = this.$store.getters.serviceError.darksky
      return error
    },
    getWeatherIcon() {
      let iconName, iconId, iconUrl, iconlist
      iconName = this.weather.icon
      iconlist = this.$store.getters.icons
      console.log('iconlist', iconlist, 'iconName', iconName)
      if(iconName) {
          if( iconmap.iconmap.hasOwnProperty(iconName) ) {
            iconId = iconmap.iconmap[iconName].day
            console.log('icon name', iconName, 'iconId')
            iconUrl = iconlist[iconId]
          }
      } else {
          iconUrl = '#'
      }
      return iconUrl
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
h1 {
  margin-bottom: 1rem;
}
h3 {
  margin: 1rem 0;
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
