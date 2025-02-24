import { getLocationData } from "./geo_api.js"; 
import { updateLocation } from "./geo_api.js";


document.addEventListener("DOMContentLoaded", function(){

    
    // console.log(getLocationData());
    
    
    

    async function fetchData(latitude, longitude){
        try{
            
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=precipitation,rain,showers,snowfall&hourly=temperature_2m,relative_humidity_2m,precipitation&timezone=Asia%2FSingapore`);
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
        console.log("Current lat: " +async function updateLocation() {
            geolocation = document.getElementById("geosearch").value;
            geolocation = geolocation.replace(/ /g, "+");
            // console.log(geolocation);
    
            let data = await fetchData_geo(geolocation);
            let main_location = data[0];
            console.log(main_location);
            latitude = main_location.lat;
            longitude = main_location.lon;
            console.log("Main location lat: "+latitude);
            console.log("Main location long: "+longitude);
        });
        console.log("Current long: "+longitude);
        console.log("Current geo: "+geolocation);

        

        let data = await fetchData(latitude, longitude);   // !DATA IS AN OBJECT REMEMBER THIS
        console.log(data);
        
        
        if (!data) { // FIXED: Check if data is received before proceeding
            console.error("No data received.");
            return;
        }
    
        let hourly = data.hourly;
        if (!hourly) { // FIXED: Check if hourly data exists
            console.error("Hourly data missing.");
            return;
        }

        
        let temperatures = hourly.temperature_2m;
        let temp_length = temperatures.length;
        let latest_temp = temperatures[temp_length - 1];
        console.log(latest_temp);
        

        let time = hourly.time;
        let time_length = time.length;
        let latest_time = time[time_length - 1];
        console.log(latest_time);

    
        let relative_humidity_2m = hourly.relative_humidity_2m;
        let latest_humid = relative_humidity_2m[time_length -1];

        //Display temperature
        let temp_display = document.getElementById("temperature");
        temp_display.innerText = latest_temp + 'ºC';


        //Display Humidity
        let humid_display = document.getElementById("relative_humidity");
        humid_display.innerHTML = `Humidity: ${latest_humid}%`;
        
        


        // console.log(temperatures); 
        // console.log(time);


    }

    main();
    document.getElementById("geosubmit").addEventListener("click", async function(){
        await updateLocation();
        main();
    });

});