import Vue from 'vue'
import Vuex from 'vuex'
import { geoloc_success, geoloc_error } from './modules/location'
import { isContext } from 'vm';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: {},
    weather: {},
    error: {}
  },
  getters: {
    location: state => state.location
  },
  mutations: {
    setLocation(state, data) {
      state.location = data
    }
  },
  actions: {
    async requestLocationFromDevice({commit}) {
      if( "geolocation" in navigator ) {
        
      navigator.geolocation.getCurrentPosition( 
        geoloc_success((data => {
          console.log(data)
          commit('setLocation', data)
        })),
        geoloc_error( err => {
          console.log(err)
        }))
      
      }
    },
    async requstLocationFromAPI({commit}, url) {
      let response = await fetch(url)
      let json = await response.json()
      console.log(json)
      commit('setLocation', json)
    },
    async requestWeather({commit}, params ) {
      /*
        params {
          lat, ( num, required)
          lon, ( num, required)
          unit ( str, required, options: si, us, auto)
        }
      */
     
      let response = await fetch('/api/darksky', {
        body: params
      })
      let json = await response.json()
      console.log(json)
      commit('updateWeather', json)
    }
  }
})
