const bodyParser = require('body-parser')
const NounProject = require('the-noun-project')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const port = process.env.PORT || 3000
const fetch = require('node-fetch')
const DARKSKY_KEY = process.env["DARKSKY_KEY"]
const GOOGLE_GEOCODE_KEY = process.env["GOOGLE_GEOCODE_KEY"]
const NOUN_PROJECT_SECRET = process.env["NOUN_PROJECT_SECRET"]
const NOUN_PROJECT_KEY = process.env["NOUN_PROJECT_KEY"]
const IPDATA_KEY = process.env["IPDATA_KEY"]

if( process.env.NODE_ENV == "dev" ) {

}

var temp_storage = {} // could be replaced with redis

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(express.static(path.join(__dirname, '../dist')))
http.listen(port, () => console.log(`listening on port ${port}`))

const darksky_base = `https://api.darksky.net/forecast/${DARKSKY_KEY}`
const geocode_base = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_GEOCODE_KEY}&sensor=true`

app.get('/api/darksky', async ( req, res ) => {
    // get weather from darksky using lat lon
    console.log(req.query)
    let { lat, lon, units } = req.query
    let response = await fetch(`${darksky_base}/${lat},${lon}?units=${units}`)
    if ( !response.ok || response.status !== 200) {
        
        console.log(response.statusText, response.status)
        
    }
    let json = await response.json()
    res.json(json)
})

app.get('/api/geocode/latlon', async (req, res) => {
    // get a human readable address from lat lon coordinates
    let { lat, lon } = req.query
    let response = await fetch(`${geocode_base}&latlng=${lat},${lon}`)
    let json = await response.json()
    res.json(json)
})

app.get('/api/latlonfromip', async (req, res) => {
    let ip = req.connection.remoteAddress
    console.log(ip)
    // let response = await fetch(`https://api.ipdata.co/${ip}?api-key=${IPDATA_KEY}`)
    // let json = await response.json()

    res.json(ip)
})

app.get('/api/geocode/address', async (req, res) => {
    let { address } = req.query
    let response = await fetch(`${geocode_base}&address=${address}`)
    let json = await response.json()

    res.json(json)
})

app.get('/test', async (req, res) => {
    let response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true&key=AIzaSyAM31b3gxNR8cQ6DG6Q5VtkgEoNJiudESI")
    let json = await response.json()
    res.json(json)
})

app.get('/api/icons', async (req, res) => {
    // get the json and store the results
    if( "icons" in temp_storage ) {
        res.json(temp_storage.icons)
        return
    }

    const iconlist = [
        1518153,
        1518107,
        1518229,
        1518103,
        1518234,
        1518170,
        1518104,
        1518165,
        1518234,
        1518219,
        1518105,
        1518219,
        1518105,
        1518102
    ]

    let promises = []
    iconlist.forEach( icon => {
        promises.push( getIconById(icon) )
    })

    Promise.all(promises).then( (result) => {
        console.log(result.length)
        res.json(result)
    })
    
})

function getIconById (id) {
    return new Promise( (resolve, reject) => {
        let nounProject = new NounProject({
            key: NOUN_PROJECT_KEY,
            secret: NOUN_PROJECT_SECRET
        })
        nounProject.getIconById(id, ( err, data ) => {
            if ( err ) {
                console.log(err)
                reject(err)
                return
            }
            console.log(data)
            resolve(data)
        })
    })
}