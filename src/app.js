const path = require('path') //path core module from nodejs.org (built-in)
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/geocode')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const customViewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

//Register partial directory
hbs.registerPartials(partialsDirectory)

//Setup handlebars engine and views location
app.set('view engine', 'hbs')

//setting the custom path directory
app.set('views', customViewsDirectory)

//setting static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('Hello Express')
// })

app.get('', (req, res) => {
    res.render('index', {
        name: 'Amanullah',
        age: 24,
        footerTitle: 'AK Technologies'
    })
})

// app.get('/help', (req, res) => {
//     res.send('Express Help')
// })

// //Help sub categories not found (Wild Card Character)
// app.get('/help/*', (req, res) => {
//     res.send('Help article not found')
// })

app.get('/help', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        footerTitle: 'AK Technologies'
    })
})

//Help sub categories not found (Wild Card Character)
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article Not Found',
        footerTitle: 'AK Technologies'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        name: 'Rameez',
        age: 27,
        footerTitle: 'AK Technologies'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact',{
        name: 'Zohaib',
        age: 30,
        footerTitle: 'AK Technologies'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         location: 'Karachi',
//         temperature: '10 Degrees'
//     })
// });

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    forecast.geocode(req.query.address, (error, forecastData) => {
        if(error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData
        })
    })

    // res.send({
    //     forecast: 'Snowy',
    //     country: 'Pakistan',
    //     address: req.query.address
    // })

})

app.get('*', (req, res) => {
    res.send('My 404 Page')
})

app.listen('3000', () => {
    console.log('Server us up and running on port 3000')
})