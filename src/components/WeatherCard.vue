<template>
    <div class="card">
        <p>{{day}}</p>
        <img :src="weather.icon" :alt="weather.icon"/>
        <h3>{{weather.apparentTemperatureHigh}}°/{{weather.apparentTemperatureLow}}°</h3>
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
        day() {
            let day = new Date(this.weather.time*1000).getDay()
            console.log('day', day, 'time', this.weather.time)
            console.log(weekmap)
            day = weekmap.weekmap[day]
            
            return day
        }
    }
}
</script>

<style lang="scss">
    .card {
        border: 1px solid #333;
    }
</style>

