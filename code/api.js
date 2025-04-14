import { getLocationData } from "./geo_api.js"; 
import { updateLocation } from "./geo_api.js";
import { getWeatherDescription } from "./weather_code.js";
import { getHourlyWeather } from "./hourlyweather.js";


let weather_code = 0;

//Quanxi 12/4/2025: PRECIPITATION IS STILL WORKING DON'T TRY TO FIX IT


export async function fetchData(latitude, longitude){
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

    console.log("Current lat: " + latitude);
    console.log("Current long: "+ longitude);
    console.log("Current geo: "+ geolocation);

    

    let data = await fetchData(latitude, longitude);   // !DATA IS AN OBJECT REMEMBER THIS
    console.log(data);
    
    
    if (!data) { //Check if data is received
        console.error("No data received.");
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
   	console.log("Current Tempertaure: ")
   

   	let weather_code = current.weather_code;
   	console.log(`Weather code: ${weather_code}`);

   	let weather = getWeatherDescription(weather_code);
   	console.log(weather);

   	document.getElementById("weather_condition").innerText = weather;
   
   	console.log(getHourlyWeather(data));
	
	
	let hourlyWeather_display = document.getElementById("hourlyWeatherTable");
	let tableChildren = hourlyWeather_display.children;
	console.log(tableChildren);

	//Set hourly weather
	if(tableChildren.length == 0){
		setHourlyWeather(data);
	}
	else{
		hourlyWeather_display.innerHTML = '';
		setHourlyWeather(data);
	}





};

function setHourlyWeather(data){
	let hourlyWeather = getHourlyWeather(data);
	let hourlyWeather_display = document.getElementById("hourlyWeatherTable");
	for(let i = 0; i < 25; i++){
		if(i == 0){
			let trow = document.createElement('tr');
			for(let n = 0; n < hourlyWeather.length; n++){
				if(n == 0){
					let th = document.createElement('th');
					let node = document.createTextNode("");
					th.appendChild(node);
					trow.appendChild(th);
				}
				else{	
					let th = document.createElement('th');
					let text = hourlyWeather[n-1].date.replaceAll("-", " ");
				
					console.log(text);
					let node = document.createTextNode(text);
					th.appendChild(node);
					trow.appendChild(th);
				}
				
			}
			hourlyWeather_display.appendChild(trow);
		}
		else{
			let trow = document.createElement('tr');
			for(let n = 0; n < hourlyWeather.length; n++){
				if(n == 0){
					let td = document.createElement('td');
					let time = hourlyWeather[0].time[i - 1];
					let node = document.createTextNode(time);
					td.appendChild(node);
					trow.appendChild(td);
				}
				else{
					let td = document.createElement('td');
					let node = document.createTextNode(hourlyWeather[n-1].temp[i - 1]);
					td.appendChild(node);
					trow.appendChild(td);
				}
				
			}
			hourlyWeather_display.appendChild(trow);
		}
		
	}
};



   

   





document.addEventListener("DOMContentLoaded", function(){

    //Timezone is Singapore
    //ISO 8601 Formats: y/m/d/h/m/s/ms

    main();
    document.getElementById("geosubmit").addEventListener("click", async function(){
        await updateLocation();
        main();
    });

});



