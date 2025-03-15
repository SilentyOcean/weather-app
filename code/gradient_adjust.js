//Raining
//background: rgb(0,71,171);
//background: linear-gradient(159deg, rgba(0,71,171,1) 0%, rgba(28,169,201,1) 100%);
//https://www.eggradients.com/gradient/finding-nemo

//Sunny:
//background-color: #76daff;
//background-image: linear-gradient(315deg, #76daff 0%, #fcd000 74%);
//https://www.eggradients.com/gradient/summer-rain

//Thunderstorm
//background: rgb(0,51,102);
//background: linear-gradient(159deg, rgba(0,51,102,1) 0%, rgba (15,82,186,1) 100%);
//https://www.eggradients.com/gradient/starry-night

//Snow
// background: rgb(176,224,230);
// background: linear-gradient(159deg, rgb(1, 20, 22) 0%, rgba(70,130,180,1) 100%);
//https://www.eggradients.com/gradient/winter-is-coming

// 0 -1: Sunny
// 2 - 67: Rain
// 71 - 86: Snow
// 95 - 99: Thunderstorm


import { getWeatherCode } from "./api";
document.addEventListener("DOMContentLoaded", function(){

    let snow_bg= "rgb(176,224,230)";
    let snow_gradient = "linear-gradient(159deg, rgb(1, 20, 22) 0%, rgba(70,130,180,1) 100%)"; 

    let thunderstorm_bg = "rgb(0,51,102)";
    let thundrestorm_gradient = "linear-gradient(159deg, rgba(0,51,102,1) 0%, rgba (15,82,186,1) 100%)";

    let sunny_bg = "#76daff";
    let sunny_gradient = "linear-gradient(315deg, #76daff 0%, #fcd000 74%)";

    let raining_bg = "rgb(0,71,171)";
    let raining_gradient = "linear-gradient(159deg, rgba(0,71,171,1) 0%, rgba(28,169,201,1) 100%)";

    


});