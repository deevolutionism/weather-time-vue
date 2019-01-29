<template>
  <div id="app">
    <Search/>
    <Weather msg="Welcome to Your Vue.js App"/>
    <a href="https://darksky.net/poweredby/"><p>Powered by Dark Sky</p></a>
  </div>
</template>

<script>
import Weather from './components/Weather.vue'
import Search from './components/Search.vue'

export default {
  name: 'app',
  components: {
    Weather,
    Search
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
  margin-top: 60px;
}
</style>
