

console.log("Current lat: " + async function updateLocation() {
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
let geolocation = "Ho+Chi+Minh"; 
let latitude = 10.823;
let longitude = 106.629; //Default(Ho Chi Minh)

async function fetchData_geo(geolocation){
    try{
        const response = await fetch(`https://geocode.maps.co/search?q=${geolocation}&api_key=67bbc1efc5380720277999une7a6683`);
        if(!response.ok){
            throw new Error("Could not fetch error");
        }
        const data = await response.json();
        return data;
    }
    catch(error){

    }
    
}

document.addEventListener("DOMContentLoaded", function(){

  


});

export function getLocationData(){
    return {latitude, longitude, geolocation};
};

export async function updateLocation() {
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
};