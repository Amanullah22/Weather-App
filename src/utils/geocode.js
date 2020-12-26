const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=161e53d9db20464bab62a65f950639e2&query=' + encodeURIComponent(address) + '&units=m'
    
    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to location Services', undefined)
        }

        else if(response.body.success == false) {
            callback('Unable to find location, Try another location', undefined)
        }

        else {
            //No Error
            callback(undefined, {
                City: response.body.request.query,
                Country: response.body.location.country,
                Temperature: response.body.current.temperature,
                Weather: response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = {
    geocode: geocode
}

//module.exports = geocode