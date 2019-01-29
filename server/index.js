const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const port = process.env.PORT || 3000
const query
const fetch = require('node-fetch')
const DARKSKY_KEY = process.env["DARKSKYKEY"]
const GOOGLE_GEOCODE_KEY = process.env["GOOGLE_GEOCODE_KEY"]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(express.static(path.join(__dirname, '../dist')))
http.listen(port, () => console.log(`listening on port ${port}`))

const darksky_base = `https://api.darksky.net/forecast/${DARKSKY_KEY}`
const geocode_base = `https://maps.googleapis.com/maps/api/geocode/json?key=${GEOCODE_KEY}&sensor=true`

app.get('/api/darksky', async ( req, res ) => {
    console.log(req.body)
    
    let response = await fetch(`${darksky_base}/${body.lat},${body.lon}?units=${body.unit}`)
    let json = await response.json()
    res.json(json)
})

app.get('/api/geocode', async (req, res) => {
    let { lat, lon } = req.body
    let response = await fetch(`${geocode_base}&latlng=${lat},${lon}`)
})
