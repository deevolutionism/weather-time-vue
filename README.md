# weather-time-vue

## Project setup
```
yarn install
```
add env variables
on windows, it is important to
set the env variables from the terminal window
you will be running the dev environment with.
set DARKSKY_KEY=yourkeyhere
set GOOGLE_GEOCODE_KEY=youkeyhere
set IPDATA_KEY=yourkeyhere

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
heroku local web - if it runs fine here, procede to remote deployment
git push heroku master
```

### TODO
- [x] request user location for lat lon coords
- [x] show daily data
- [x] convert lat lon to human readable address
- [-] SEO Optimization ( generate static html files, add meta tags )
- [-] request cookie permissions to store lat lon
- [-] add icons for "clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night",
- [-] allow user to enter city or zip to update their weather
- [-] show other meta data such as uv index, humidity, etc
- [-] animate background based on time of day and weather type
- [-] extra: create a chart showing daily/weekly forecasts
- [-] user tap should change unit ( si, us, auto )