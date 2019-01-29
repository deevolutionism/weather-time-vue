<template>
  <div class="component-container">
    <input class="search" type="text" id="location-search" name="location" v-model="locationInput" autocomplete placeholder="Enter City or zip">
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
    .search {
        transition: all 300ms ease-out;
        border-top: 0px;
        font-size: 1.6rem;
        text-align: center;
        max-width: 100%;
        box-sizing: border-box;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 2x solid black;
        &:focus {
            font-size: 1.8rem;
            color: black;
            outline: 0px;
            border-bottom: 3px solid black;
        }
    }
</style>
