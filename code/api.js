document.addEventListener("DOMContentLoaded", function(){

    

    async function fetchData(){
        try{
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=10.823&longitude=106.6296&current=precipitation,rain,showers,snowfall&hourly=temperature_2m,relative_humidity_2m,precipitation&timezone=Asia%2FSingapore");
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
        let data = await fetchData();   // !DATA IS AN OBJECT REMEMBER THIS

        let hourly = data.hourly;

        
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
});