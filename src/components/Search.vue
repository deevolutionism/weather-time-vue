<template>
  <div>
    <input type="text" id="location-search" name="location" v-model="locationInput" autocomplete placeholder="city or zip">
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
          location: ''
      }
  },
  computed: {
      updateLocation() {
          this.location = this.$store.getters.location
      }
  },
  created() {
      // request location
      this.$store.dispatch('requestLocation')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
