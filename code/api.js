import { getLocationData } from "./geo_api.js"; 
import { updateLocation } from "./geo_api.js";
import { getWeatherDescription } from "./weather_code.js";
let weather_code =0;


document.addEventListener("DOMContentLoaded", function(){

    
    
    
    
    
    

    async function fetchData(latitude, longitude){
        try{
            
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,showers,snowfall,weather_code&hourly=temperature_2m&timezone=Asia%2FSingapore`);
            if(!response.ok){
                throw new Error("Could not fetch error");
            }
            const data = await response.json();
            return data;
        }
        catch(error){

        }
        
    }

    //Timezone is Singapore
    //ISO 8601 Formats: y/m/d/h/m/s/ms




    async function main(){

        let locationData = getLocationData();
        console.log(getLocationData());
        let latitude = locationData.latitude;
        let longitude = locationData.longitude;
        let geolocation = locationData.geolocation;
        let display_name = locationData.display_name;
        console.log(typeof display_name);
        console.log(typeof geolocation);
        

        document.getElementById("city").innerText = display_name;
       
        

        geolocation = geolocation.replace(/ /g, "+");

        console.log("Current lat: " +latitude);
        console.log("Current long: "+longitude);
        console.log("Current geo: "+geolocation);

        

        let data = await fetchData(latitude, longitude);   // !DATA IS AN OBJECT REMEMBER THIS
        console.log(data);
        
        
        if (!data) { //Check if data is received
            console.error("No data received.");
            return;
        }
    
        let hourly = data.hourly;
        if (!hourly) { //Check if hourly data exists
            console.error("Hourly data missing.");
            return;
        }

       let current = data.current;
       let current_time = current.time;
       let current_temp = current.temperature_2m;
       let current_humid = current.relative_humidity_2m;
       let current_precipitation = current.precipitation;
       let current_rain = current.rain;
       let current_shower = current.showers;
       let current_snowfall = current.snowfall;


       
       
       document.getElementById("temperature").innerText = `Temperature: ${current_temp}ºC`;
       document.getElementById("relative_humidity").innerText = `Humidity: ${current_humid}%`;
       document.getElementById("precipitation").innerText = `Precipitation: ${current_precipitation}%`;
       

       let weather_code = current.weather_code;
       console.log(`Weather code: ${weather_code}`);

       let weather = getWeatherDescription(weather_code);
       console.log(weather);

       document.getElementById("weather_condition").innerText = weather;
       

    }

    main();
    document.getElementById("geosubmit").addEventListener("click", async function(){
        await updateLocation();
        main();
    });

});

export function getWeatherCode(){
    return weather_code;
}