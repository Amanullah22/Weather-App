const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const temperature = document.querySelector('#temperature')
const forecast = document.querySelector('#forecast')
const error = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    temperature.textContent = 'Loading...'
    forecast.textContent = ''
    error.textContent = ''

    fetch('http://api.weatherstack.com/current?access_key=161e53d9db20464bab62a65f950639e2&query='+location+'&units=m').then((response) => {
        response.json().then((data) => {
            if(data.error) {
                //console.log(data.error.info)
                temperature.textContent = ''
                error.textContent = data.error.info
            }
            else {
                temperature.textContent = 'Temperature: '+data.current.temperature+' Degrees'
                forecast.textContent = 'Forecast: '+data.current.weather_descriptions
            }
        })
    })

    //console.log(location)
})