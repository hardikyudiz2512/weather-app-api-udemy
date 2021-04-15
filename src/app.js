const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hardik'
    })
})

app.get('/weather', (req, res)=>{
   if(!req.query.address){
    return res.send({
        error: 'Must provide address'
    })
   }
   geocode(req.query.address , (error, {latitude, longitude, location} = {}) => {
    if(error){
        return res.send({error});
    }
 
     forecast(latitude, longitude, (error, forecastData) =>{
         if(error){
             return res.send({error});
         }
 
        res.send({forecast:forecastData,
                  location,
                  address: req.query.address
            })
     })
 })
})
app.get('/help', (req, res)=>{
   res.render('help',{
       title : 'Help',
       helpText: 'This is help page',
       name: 'Hardik'

   })
})
app.get('/about', (req, res)=>{
   res.render('about',{
       title : 'About Me',
       AboutText: 'This is about my page',
       name: 'Hardik'

   })
})
app.get('/help/*',(req, res) => {
    res.render('404',{
        title : '404',
        name : 'Hardik',
        error : 'Help article not found'
    })
})
app.get('*',(req, res) => {
    res.render('404',{
        title : '404',
        name : 'Hardik',
        errorMessage : 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Your app is running on port 3000');
})