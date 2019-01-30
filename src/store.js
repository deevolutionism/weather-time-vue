import Vue from 'vue'
import Vuex from 'vuex'
import geolocation from './modules/geolocation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: {},
    latlon: {},
    unit: 'auto',
    weather: {
      currently: {
        summary: '--',
        apparentTemperature: '--',
        icon: 'placeholder.png'
      },
      daily: {
        data: [
          {
            time: '--',
            summary: '--',
            icon: 'placeholder.png',
            apparentTemperatureHigh: '--',
            apparentTemperatureLow: '--'
          }
        ]
      }
    },
    error: {},
    icons: {}
  },
  getters: {
    location: state => state.location,
    weather: state => state.weather
  },
  mutations: {
    setLocation(state, data) {
      state.location = data
    },
    setLatLon(state, data) {
      state.latlon = data
    },
    updateWeather(state, data) {
      state.weather = data
    }
  },
  actions: {
    async hydrateState({commit}) {
    },
    async requestIcons({commit}) {
      let response = await fetch('/api/icons')
      if(!response.ok || response.status !== 200) {P
        console.log(response.statusText)
        return
      }
      
      let json = await response.json()
      
      commit('updateIcons', json)
    },
    async requestLatLonFromDevice({commit}) {
      
      if( "geolocation" in navigator ) {

        let loc = navigator.geolocation.getCurrentPosition( 
          location => {
            console.log(location)
            commit('setLatLon', location)
            let params = { lat: location.coords.latitude, lon: location.coords.longitude, units: 'auto' }
            this.dispatch('requestWeather', params)
            // this.dispatch('requestLocationByLatLon', {
            //   lat: location.coords.latitude,
            //   lon: location.coords.longitude
            // })
            return location
          },
          error => {
            console.log(error)
            return false
          }
        )

        return loc
    
      } else {
        // request user to input their location
        return false
      }
    },
    async requestLocationFromUser({commit}, params) {
      console.log('request zip from user')
    },
    async requestLocationByLatLon({commit}, params) {
      let { lat, lon } = params
      console.log('request location from lat', lat, 'and long', lon)
      let response = await fetch(`/api/geocode/latlon?lat=${lat}&lon=${lon}`)

      if( !response.ok && response.status !== 200) {
        console.log(response.statusText)
        return
      }

      let json = await response.json()
      commit('setLocation', json)
      
    },
    async requestLocationByAddress({commit}, params) {
      let { address } = params
      console.log('request data by address: ', address)
  
      let response = await fetch(`/api/geocode/address?address=${address}`)
      if( !response.ok && response.status !== 200) {
        console.log(response.statusText)
        return
      }
  
      let json = response.json()
      let latlon = { lat, lng } = json.results[0].geometry.location
      commit('setLocation', {lat: latlon.lat, lon: atlon.lng })
    },
    async requestWeather({commit}, {lat, lon, units}) {
      /*
        params {
          lat, ( num, required)
          lon, ( num, required)
          unit ( str, required, options: si, us, auto)
        }
      */
     
      let response = await fetch(`/api/darksky?lat=${lat}&lon=${lon}&units=${units}`)
      if( !response.ok && response.status !== 200){
        console.log(response.statusText)
        return
      }
      let json = await response.json()
      commit('updateWeather', json)
    }
  }
})
