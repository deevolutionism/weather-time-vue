const geoloc_success = (position, cb) => {
    return cb({ ...position.coords })
}


const geoloc_failure = (error, cb) => {
    return cb(error.code)
}

module.exports = {
    geoloc_failure, 
    geoloc_failure
}