import Vue from 'vue'
import Vuex from 'vuex'
import geolocation from './modules/geolocation'
import iconmap from './modules/iconmap'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: {},
    latlon: {},
    address: {},
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
    serviceError: {
      goecode: false,
      darksky: false,
      icons: false,
    },
    icons: {}
  },
  getters: {
    location: state => state.location,
    weather: state => state.weather,
    icons: state => state.icons,
    serviceError: state => state.serviceError,
    address: state => state.address
  },
  mutations: {
    setLocation(state, data) {
      state.location = data
      state.serviceError.geocode = false
    },
    setLatLon(state, data) {
      state.latlon = data
      state.serviceError.geocode = false
    },
    updateWeather(state, data) {
      state.weather = data
      state.serviceError.darksky = false
    },
    serviceError(state, {service, status}) {
      state.serviceError[service] = status
    },
    updateIcons(state, icons) {
      state.icons = icons
    },
    setAddress(state, address) {
      state.address = address
    }
  },
  actions: {
    async hydrateState({commit}) {
    },
    async requestIcons({commit}) {
      let response = await fetch('/api/icons')
      if(!response.ok || response.status !== 200) {P
        console.log(response.statusText)
        commit('serviceError', {service: 'nounProject', status: response.statusText})
        return
      }
      
      let json = await response.json()
      
      let icons = {}
      // console.log(json)
      json.forEach( icon => {
          icons[icon.icon.id] = icon.icon.preview_url
      })
      commit('updateIcons', icons)
    },
    async requestLatLonFromDevice({commit}) {
      
      if( "geolocation" in navigator ) {

        let loc = navigator.geolocation.getCurrentPosition( 
          location => {
            console.log(location)
            commit('setLatLon', location)
            let params = { lat: location.coords.latitude, lon: location.coords.longitude, units: 'auto' }
            this.dispatch('requestWeather', params)
            this.dispatch('requestLocationByLatLon', params)
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
      commit('setAddress', json.results[0].address_components[3].short_name)
    },
    async requestLocationByAddress({commit}, params) {
      let { address } = params
      console.log('request data by address: ', address)
  
      let response = await fetch(`/api/geocode/address?address=${address}`)
      if( !response.ok && response.status !== 200) {
        console.log(response.statusText)
        commit('serviceError', {service: "geocode", status: response.statusText})
        return
      }
  
      let json = await response.json()
      let lat = json.results[0].geometry.location.lat
      let lon = json.results[0].geometry.location.lng
      let formatted_address = json.results[0].formatted_address
      console.log(lat, lon)
      commit('setLocation', {lat, lon})
      commit('setAddress', formatted_address)
      this.dispatch('requestWeather', {lat, lon, units: 'auto'})
    },
    async requestWeather({commit}, {lat, lon, units}) {
      /*
        params {
          lat, ( num, required)
          lon, ( num, required)
          unit ( str, required, options: si, us, auto)
        }
      */
      console.log('request weather for coords', lat, lon, units)
      let response = await fetch(`/api/darksky?lat=${lat}&lon=${lon}&units=${units}`)
      if( !response.ok && response.status !== 200){
        console.log(response.statusText)
        commit('serviceError', { service: 'darksky', status: response.statusText})
        return
      }
      let json = await response.json()
      commit('updateWeather', json)
    }
  }
})
