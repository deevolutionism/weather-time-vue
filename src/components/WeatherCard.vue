<template>
    <div>
        <p>{{weather.day}}</p>
        <img :src="weather.icon" :alt="weather.icon"/>
        <h1>{{weather.apparentTemperatureHigh}}/{{weather.apparentTemperatureLow}}</h1>
    </div>
</template>

<script>
export default {
    name: 'WeatherCard',
    props: ['weather'],
    data() {
        return {

        }
    },
}
</script>
