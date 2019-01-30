<template>
  <div id="app">
    <Search/>
    <Weather/>
    <div class="d-flex horizontal-slider flex-row">
      <WeatherCard v-for="(forecast, idx) in weatherData" :weather="forecast" v-bind:key="idx" />
    </div>
    <a href="https://darksky.net/poweredby/"><p>Powered by Dark Sky</p></a>
  </div>
</template>

<script>
import Weather from './components/Weather.vue'
import Search from './components/Search.vue'
import WeatherCard from './components/WeatherCard.vue'

export default {
  name: 'app',
  components: {
    Weather,
    WeatherCard,
    Search
  },
  computed: {
    weatherData() {
      let w = this.$store.getters.weather
      if( "daily" in w ) {
        return w.daily.data
      } else {
        return []
      }
    }
  },
  created() {
    this.$store.dispatch('requestLatLonFromDevice').then( (latlon) => {
        if ( latlon !== false ) {
          console.log('dispatch request')
          // console.log(latlon)
          // this.$store.dispatch('requestLocationFromAPI', latlon)
        } else {
          this.$store.dispatch('requestLocaitonFromUser')
        }
    })
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-evenly;
}
.component-container {
  margin: 0 auto;
}
.d-flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.horizontal-slider {
  overflow-y: scroll;
}

</style>
