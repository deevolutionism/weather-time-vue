<template>
    <div class="card d-flex" :id="compute_id">
        <p>{{day}}</p>
        <img :src="weather.icon" :alt="weather.icon"/>
        <h3>{{weather.apparentTemperatureHigh}}° / {{weather.apparentTemperatureLow}}°</h3>
    </div>
</template>

<script>
import weekmap from '../modules/weekmap'
export default {
    name: 'WeatherCard',
    props: ['weather'],
    data() {
        return {

        }
    },
    computed: {
        compute_id() {
            let dayofweek = this.getDayOfWeek(this.weather.time)
            let id = `${dayofweek}-${this.weather.time}`
            return id
        },
        day() {
            let day = this.getDayOfWeek(this.weather.time)
            return day
        },
    },
    methods: {
        getDayOfWeek(timestamp) {
            let day = new Date(timestamp*1000).getDay()
            day = weekmap.weekmap[day]
            return day
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss">
</style>

