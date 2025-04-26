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
		console.error("Error fetching data:", error);
		return null;
    }

}

function createEmptyWeatherData() {
    return {
        hourly: {
            time: Array(24).fill("N/A"), // 24 hours set as "N/A"
            temperature_2m: Array(24).fill(0) // 24 temperature values set to 0
        }
    };
}
	
async function main(){
    let locationData = getLocationData();
    console.log(getLocationData());
    let latitude = locationData.latitude;
    let longitude = locationData.longitude;
    let geolocation = locationData.geolocation;
    let display_name = locationData.display_name;

    let data = await fetchData(latitude, longitude);   
	
    console.log(data);

	//Check if data is received
    if (!data) { 
        console.error("No data received.");
        return;
    }

   

   	let current = data.current;
   	let {
		time: current_time,
		temperature_2m: current_temp,
		relative_humidity_2m: current_humid,
		precipitation: current_precipitation,
		// rain: current_rain,
		// showers: current_shower,
		// snowfall: current_snowfall,
		weather_code
	} = current; //Destructuring
	
	

	document.getElementById("city").innerText = display_name;
    geolocation = geolocation.replace(/ /g, "+");

    console.log("Current lat: " + latitude);
    console.log("Current long: "+ longitude);
    console.log("Current geo: "+ geolocation);


	if(geolocation == "Nowhere"){
   		current_temp = 0;
		current_humid = 0;
		current_precipitation = 0;
		data = createEmptyWeatherData(); // Use default dataset
   	}
   
   	document.getElementById("temperature").innerText = `Temperature: ${current_temp}ºC`;
   	document.getElementById("relative_humidity").innerText = `Humidity: ${current_humid}%`;
   	document.getElementById("precipitation").innerText = `Precipitation: ${current_precipitation}%`;
	




   	let weather = getWeatherDescription(weather_code);
   	console.log("Weather condition: " + weather);
   	document.getElementById("weather_condition").innerText = weather;
   	console.log(getHourlyWeather(data));
	
	
	let hourlyWeather_display = document.getElementById("hourlyWeatherTable");
	let tableChildren = hourlyWeather_display.children;

	console.log(tableChildren);

	//Set hourly temperature
	if(tableChildren.length == 0){
		setHourlyTemperature(data);
	}
	else{
		hourlyWeather_display.innerHTML = '';
		setHourlyTemperature(data);
	}





};

function setHourlyTemperature(data){

	console.log("DATA IS HERE");
	console.log(data);

	let hourlyWeather = getHourlyWeather(data);
	let table = document.getElementById("hourlyWeatherTable");

	//HeaderRows
	let headerRows = document.createElement('tr');
	headerRows.appendChild(document.createElement('th')); //Empty top left header
	
	for(let entry of hourlyWeather){
		let th = document.createElement('th');
		th.textContent = entry.date.replaceAll("-", "/");
		headerRows.appendChild(th)
	}
	table.appendChild(headerRows);

	//Data rows
	for(let i = 0; i < 24; i++){
		let time = hourlyWeather[0].time[i] //Time are the same
		let dataRow = document.createElement('tr');
		let timeData = document.createElement('td');
		timeData.textContent = time;
		dataRow.appendChild(timeData);
		
		
		for(let entry of hourlyWeather){
			let tempData = document.createElement('td');
			tempData.textContent = entry.temp[i] + "ºC";
			dataRow.appendChild(tempData);
		}

		table.appendChild(dataRow);
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



