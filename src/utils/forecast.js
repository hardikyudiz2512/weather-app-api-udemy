const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=a28d496f4bb5a9bf0453bb4866d08262'
    
    request({ url, json : true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, 'Weather: ' + body.list[0].weather[0].description + ', Country :' + body.city.country + ', Population: ' + body.city.population)
        }
       
})
}
module.exports = forecast



