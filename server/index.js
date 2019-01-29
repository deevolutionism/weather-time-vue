const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const port = process.env.PORT || 3000;
const fetch = require('node-fetch')
const API_KEY = process.env["DARKSKYKEY"]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(express.static(path.join(__dirname, '../dist')))
http.listen(port, () => console.log(`listening on port ${port}`))

const api_base = `https://api.darksky.net/forecast/${API_KEY}`

app.get('/api/darksky', async ( req, res ) => {
    console.log(req.body)
    let response = await fetch(`${api_base}/42.3601,-71.0589`)
    let json = await response.json()
    res.json(json)
})
