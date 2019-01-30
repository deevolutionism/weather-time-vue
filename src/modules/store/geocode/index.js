export async function requestLocationByAddress({commit}, params) {
    let { address } = params
    console.log('request data by address: ', address)

    let response = await fetch(`/api/geocode/address?address=${address}`)
    if( !response.ok && response.status !== 200) {
      console.log(response.statusText)
      return
    }

    let json = response.json()
    let latlon = { lat, lng } = json.results[0].geometry.location
    commit('setLocation', {lat: latlon.lat, lon: atlon.lng })
}


