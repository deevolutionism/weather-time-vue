<template>
  <div class="component-container">
    <input :class="classObj" type="text" id="location-search" name="location" v-model="locationInput" autocomplete placeholder="Enter City or zip">
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
  },
  data() {
      return {
          location: '',
          locationInput: '',
          address: ''
      }
  },
  computed: {
      addr: {
          get: function() {
              return this.$store.getters.address
          },
          set: function(value) {
              console.log('set', value)
              this.locationInput = value
          }
      },
      classObj() {
          return {
              "search": true,
              "empty": this.locationInput ? false : true
          }
      }
  },
  watch: {
      addr(prev, next) {
        
            console.log('prev', prev, 'next', next)
            this.locationInput = next

      }
  },
  mounted() {
      document.getElementById('location-search').addEventListener('keydown', (e) => {
          if( e.which == 13) {
              console.log(this.locationInput)
              this.dispatchRequestLocByAddr(this.locationInput)
          }
      })
      this.locationInput = this.$store.getters.address
  },
  created() {
      // request location
      
  },
  methods: {
      dispatchRequestLocByAddr(addr) {
          this.$store.dispatch('requestLocationByAddress', {address: addr})
      },
      updateInput(address) {
          
         this.locationInput = address
      }
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
        &.empty {
            border-bottom: 2px solid orangered;
        }
    }
</style>
