const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const port = process.env.PORT || 3000
const fetch = require('node-fetch')
const DARKSKY_KEY = process.env["DARKSKY_KEY"]
const GOOGLE_GEOCODE_KEY = process.env["GOOGLE_GEOCODE_KEY"]

if( process.env.NODE_ENV == "dev" ) {

}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(express.static(path.join(__dirname, '../dist')))
http.listen(port, () => console.log(`listening on port ${port}`))

const darksky_base = `https://api.darksky.net/forecast/${DARKSKY_KEY}`
const geocode_base = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_GEOCODE_KEY}&sensor=true`

app.get('/api/darksky', async ( req, res ) => {
    console.log(req.body)
    let { lat, lon } = req.body
    let response = await fetch(`${darksky_base}/${lat},${lon}?units=${body.unit}`)
    let json = await response.json()
    res.json(json)
})

app.get('/api/geocode', async (req, res) => {
    let { lat, lon } = req.query
    
    console.log(lat, lon)
    let uri = `${geocode_base}&latlng=${lat},${lon}`
    
    console.log(uri)
    // let response = await fetch(`${geocode_base}&latlng=${lat},${lon}`)
    // let json = await response.json()
    // res.json(json)
    res.json({lat, lon})
})

app.get('/test', async (req, res) => {
    let response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true&key=AIzaSyAM31b3gxNR8cQ6DG6Q5VtkgEoNJiudESI")
    let json = await response.json()
    res.json(json)
})
