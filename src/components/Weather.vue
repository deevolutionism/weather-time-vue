<template>
  <div class="main">
    <h1>{{currentWeather ? currentWeather.temperature : '--'}}°</h1>
    <h3>feels like {{currentWeather ? currentWeather.apparentTemperature : '--'}}°</h3>
    <img class="icon" :src="getWeatherIcon" :alt="weather.icon"/>
    <p>{{weatherError ? weatherError : currentWeather.summary}}</p>
  </div>
</template>

<script>
import iconmap from '../modules/iconmap'
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
