<template>
  <div id="app">
    <header>
      <Search/>
      <Weather/>
    </header>
    <div class="d-flex horizontal-slider center">
      <WeatherCard v-for="(forecast, idx) in weatherData" :weather="forecast" v-bind:key="idx" />
    </div>
    <footer>
     <a href="https://darksky.net/poweredby/"><p>Powered by Dark Sky</p></a>
    </footer>
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

<style lang="scss">
  $mobile-width: 400px;
  $desktop-width: 1024px;

  @mixin mobile {
    @media (min-width: #{$mobile-width}) and (max-width: #{desktop-width - 1px}) {
      @content
    }
  }

  body {
    margin: 0;
  }
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
  h1 {
    font-size: 3rem;
  }
  header {
    position: sticky;
    top: 0;
    padding: 2rem;
    background-color: white;
  }
  footer {
    position: sticky;
    bottom: 0px;
    background-color: white;
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
  .center {
    margin: 0 auto;
  }
  .horizontal-slider {
    
    flex-direction: column;
    margin: 0px;
    @include mobile {
      flex-direction: row;
      overflow-x: scroll;
    }
  }
  .card {
    border-top: 1px solid #eee;
    color: white;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
    min-width: 100%;
    padding: 1rem;
    justify-content: space-between;
    flex-direction: row;
    box-sizing: border-box;
    align-items: center;
    p, img, h3 {
      display: block;
    }
    @include mobile {
      justify-content: space-between;
      flex-direction: column;
      min-width: 240px;
      border: 1px solid #333;
    }
  }
</style>
