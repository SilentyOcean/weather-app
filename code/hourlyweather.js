export function getHourlyWeather(data){ //Need to return a nested array
    let hourly = data.hourly;
    let getHourlyTemp = [];
    
   

    if (!hourly) { //Check if hourly data exists
        console.error("Hourly data missing.");
        return;
    }
    let hourly_time = hourly.time;
    let hourly_temperature = hourly.temperature_2m; //Every 24 value the day change, put 23 value inside each value of getHourlyTemp

    

    //Every 24 element, the day change
    //So from hourly_time[0] to hourly_time[24], the day change
    //Current date is hourly_time[0] i think
    //i = i + 24

    
    const totalDays = Math.floor(hourly_time.length / 24);

    for(let i = 0; i < totalDays; i++){
        let HourlyTemp = {
            date: hourly_time[i * 24].slice(0, 10),
            time : [],
            temp: []

        }
        for(let j = i * 24; j < (i + 1) * 24; j++){
            HourlyTemp.time.push(hourly_time[j].slice(11));
            HourlyTemp.temp.push(hourly_temperature[j]);
        }
        getHourlyTemp.push(HourlyTemp);
    }

    return getHourlyTemp;

};   