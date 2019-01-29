<template>
  <div>
    <input type="text" id="location-search" name="location" v-model="locationInput" autocomplete placeholder="Enter City or zip">
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    msg: String
  },
  data() {
      return {
          location: '',
          locationInput: ''
      }
  },
  computed: {
      updateLocation() {
          let result = this.$store.getters.location
          if ( result ) {
              return result
          }
      },
      
      
  },
  mounted() {
      document.getElementById('location-search').addEventListener('keydown', (e) =>{
          if( e.which == 13) {
              this.$store.dispatch('requestLocationByAddress', {address: this.locationInput}).then( response => {
                  console.log('city: ', response)
              })
          }
      })
  },
  created() {
      // request location
      
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
