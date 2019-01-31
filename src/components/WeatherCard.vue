<template>
    <div class="card d-flex" :id="compute_id">
        <p class="left">{{dayOfWeek}}</p>
        <div class="middle"><img :src="weatherIcon" :alt="weather.icon"/></div>
        <h3 class="right">{{weather.apparentTemperatureHigh}}° / {{weather.apparentTemperatureLow}}°</h3>
    </div>
</template>

<script>
import weekmap from '../modules/weekmap'
import iconmap from '../modules/iconmap'
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
        dayOfWeek() {
            let day = this.getDayOfWeek(this.weather.time)
            return day
        },
        getHue() {
            let h = this.calcHue(this.weather.apparentTemperatureHigh)
        },
        weatherIcon() {
            // icon name => iconid => iconurl
            let iconName, iconId, iconUrl, iconlist
            iconName = this.weather.icon
            iconlist = this.$store.getters.icons
            if(iconName) {
                // iconId = iconmap.iconmap[iconName]
                // iconUrl = this.$store.getters.icons[iconId]
                if( iconmap.iconmap.hasOwnProperty(iconName) ) {
                    // iconUrl = iconmap.iconmap[iconName].day
                    iconId = iconmap.iconmap[iconName].day
                    iconUrl = iconlist[iconId]
                }
                
            } else {
                iconUrl = '#'
            }
            return iconUrl
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
            let output_end = -30
            let input_start = 0 
            let input_end = 100
            let slope = ( output_end - output_start ) / ( input_end - input_start )
            
            return output_start + slope * ( temp - input_start )
        },
    },
    mounted() {
        // calculate hue
        let hueHigh = this.calcHue(this.weather.apparentTemperatureHigh)
        let hueLow = this.calcHue(this.weather.apparentTemperatureLow)
        let hslcolor = `linear-gradient(90deg, hsla(${hueHigh},75%,70%) 0%, hsla(${hueLow},75%,20%) 100%)`
        document.getElementById(this.compute_id).style.background = hslcolor
    }
}
</script>

<style lang="scss">


</style>

