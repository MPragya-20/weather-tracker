const weather ={};

weather.temperature = {
    unit : "celcius"
}

//select the elements
const icon = $('#icon');
const notify = $('#notify');
const temp = $('#temperature');
const desc = $('#description');
const loc = $('#location');
const humidity = $('#humidity');
const pressure = $('#pressure');

//get latitude and longitude!
function getLocation(){
    if (navigator.geolocation){
        //$('#notify').html("<p>Geolocation is supported by this browser!</p>");
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        $('#notify').html("<p>Geolocation is not supported by this browser!</p>");
    }
}
function showPosition(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getWeatherinfo_api(lat,long);
}
const key = myapis.weather_key;

       
function getWeatherinfo_api (lat, long){
    const api_link = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
    fetch(api_link)
        .then(function(data_fetched){
            let data_main = data_fetched.json();
            return data_main;
    })
    .then(function(data_main){
        weather.temperature.value = Math.floor(data_main.main.temp -273);
        weather.description = data_main.weather[0].description;
        weather.icon_ = data_main.weather[0].icon;
        weather.pressure = data_main.main.pressure;
        weather.humidity = data_main.main.humidity;
        weather.city = data_main.name;
        weather.country = data_main.sys.country;
        weather.description = weather.description.toUpperCase();
        weather.temperature.fahrenhiet = (weather.temperature.value*9/5)+32;

//These data_main.weather.  -> all these are the json format of api response

    })
    .then(function(){
        display_weather();
        initMap(lat,long);
    })
    
}
display_weather = () =>{
    icon.html(`<img src="icons/${weather.icon_}.png"/>`)  ;
    temp.html("<p><strong>"+weather.temperature.value+" ° <span> C / "+weather.temperature.fahrenhiet+" F </span></strong></p>");
    desc.html("<p><strong><i>"+weather.description+"</i></strong></p>");
    humidity.html( "<p><i class=\"fa fa-tint\"></i> <strong>Humidity : "+weather.humidity+" %</strong></p>");
    pressure.html("<p> <strong>Pressure : "+weather.pressure+" hPa</strong></p>");
    loc.html("<p><strong> Country : "+weather.country+"<br><br><i class=\"fa fa-map-marker\"></i> : "+weather.city+"</strong></p>");
}

getLocation();




//Incase the user types the choice and submits.
$(document).ready(function(){
    $("#user_submit").click(function(){
        var submit_value = $("input:text").val();
        getWeatherinfo_api(submit_value);
        function getWeatherinfo_api (submit_value){
            const api_link = `http://api.openweathermap.org/data/2.5/weather?q=${submit_value}&appid=${key}`;
            fetch(api_link)
                .then(function(data_fetched){
                    let data_main = data_fetched.json();
                    return data_main;
            })
            .then(function(data_main){
                weather.temperature.value = Math.floor(data_main.main.temp -273);
                weather.description = data_main.weather[0].description;
                weather.icon_ = data_main.weather[0].icon;
                weather.pressure = data_main.main.pressure;
                weather.humidity = data_main.main.humidity;
                weather.city = data_main.name;
                weather.country = data_main.sys.country;
                weather.description = weather.description.toUpperCase();
                weather.lat = data_main.coord.lat;
                weather.lon = data_main.coord.lon;
                weather.temperature.fahrenhiet = (weather.temperature.value*9/5)+32;
            })
            .then(function(){
                display_weather();
            })
            
        }
        
        display_weather = () =>{
            icon.html(`<img src="icons/${weather.icon_}.png"/>`)  ;
            temp.html("<p><strong>"+weather.temperature.value+" ° <span>C / "+weather.temperature.fahrenhiet+" F </span></strong></p>");
            desc.html("<p><strong><i>"+weather.description+"</i></strong></p>");
            humidity.html( "<p><i class=\"fa fa-tint\"></i> <strong>Humidity : "+weather.humidity+" %</strong></p>");
            pressure.html("<p> <strong>Pressure : "+weather.pressure+" hPa</strong></p>");
            loc.html("<p><strong> Country : "+weather.country+"<br><br><i class=\"fa fa-map-marker\"></i> : "+weather.city+"</strong></p>"); 
        }
        
        
    });
});