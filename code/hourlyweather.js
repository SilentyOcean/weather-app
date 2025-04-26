export function getHourlyWeather(data){ 
    let hourly = data.hourly;
    let getHourlyTemp = [];

    if (!hourly) { 
        console.error("Hourly data missing.");
        return;
    }
    let hourly_time = hourly.time;
    let hourly_temperature = hourly.temperature_2m; 

    //Every 24 element, the day change
    //So from hourly_time[0] to hourly_time[24], the day change
    //Current date is hourly_time[0] 
 
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

