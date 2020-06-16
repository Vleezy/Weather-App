const request = require('request');
//API Key on website (not best practice)
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const apiKey = "30b2c5959e5d01ff551e66a88bc889a7"


app.set(`view engine`, `ejs`)
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.render('index');
})

app.post('/', ()=>{
    let city = req.body.city;
       //Third-Party API
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function(err, response, body){
    if(err){
        res.render('index', {weather : null, error : 'Error, please try again'})
    }
    else{
        let weather = JSON.parse(body)
        if(weather.main == undefined){
            res.render('index', {weather : null, error : 'Error, please try again'})
        } else {
            let weatherText = 'Its ${weather.main.temp} degree in ${weather.name}'
            res.render('index', {weather: weatherText, error:null})
        }
    }
})

})



// request(url, function (err, response, body) {
//     if (err) {
//         console.log('error:', err)
//     }
//     else {
//         // console.log('body:', body)

//         let weather = JSON.parse(body);

//         let message = `It is ${weather.main.temp} outside in ${weather.name}`

//         console.log(message)

//     }
// });


const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
});