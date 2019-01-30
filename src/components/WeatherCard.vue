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
            hue: 0
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
        getHue() {
            let h = this.calcHue(this.weather.apparentTemperatureHigh)
            console.log('h', h)
        }
    },
    methods: {
        getDayOfWeek(timestamp) {
            let day = new Date(timestamp*1000).getDay()
            day = weekmap.weekmap[day]
            return day
        },
        calcHue(temp) {
            let output_start = 250
            let output_end = 0
            let input_start = 0 
            let input_end = 100
            let slope = ( output_end - output_start ) / ( input_end - input_start )
            
            return output_start + slope * ( temp - input_start )
        },
    },
    mounted() {
        // calculate hue
        console.log(this.weather.apparentTemperatureHigh)
        let hueHigh = this.calcHue(this.weather.apparentTemperatureHigh)
        let hueLow = this.calcHue(this.weather.apparentTemperatureLow)
        let hslcolor = `linear-gradient(90deg, hsla(${hueHigh},75%,50%) 0%, hsla(${hueLow},75%,50%) 100%)`
        document.getElementById(this.compute_id).style.background = hslcolor
        console.log('hue', hueHigh, 'id', this.compute_id)
    }
}
</script>

<style lang="scss">
</style>

