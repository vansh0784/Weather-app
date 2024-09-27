async function getWeather(){
    const apiKey="50d0106243cff7c6cf9951fd363c39bd";
    const city=document.getElementById('city')?.value;
    if(!city){
        alert("Please Enter City");
        return;
    }
    try{
        const currentWeather= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if(!currentWeather.ok) throw new Error("Failed to Fetch Current Weather");
        const currentWeatherData=await currentWeather.json();
        displayWeather(currentWeatherData);
        const ForecastWeather=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        console.log("working");
        if(!ForecastWeather.ok) throw new Error("Failed to Fetch Forecast Weather");
        const ForecastWeatherData=await ForecastWeather.json();
        displayHourlyForecast(ForecastWeatherData.list);
    }
    catch(error){
        alert("Error fetching weather data. Please try again later.");
    }
}
function displayWeather(data){
    const Divinfo=document.querySelector(".temp-div");
    const WeatherInfo=document.querySelector(".weather-info");
    const weatherIcon=document.querySelector("#weather-icon");
    Divinfo.innerHTML='';
    WeatherInfo.innerHTML='';
    if(data.cod=='404') WeatherInfo.innerHTML=`<p>${data.message}</p>`;
    else{
        const cityName=data.name;
        const tempC=Math.round(data.main.temp-273.15);
        const desc=data.weather[0].description;
        const iconCode=data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const Temprature=`<p>${tempC}°C</p>`;
        const D=`
            <p>${cityName}</p>
            <p>${desc}</p>
        `;
        Divinfo.innerHTML=Temprature;
        WeatherInfo.innerHTML=D;
        weatherIcon.setAttribute("src",iconUrl);
        showImg();

    }
}
function displayHourlyForecast(hourlyData){
    const hourlyForecast=document.querySelector('.hourly-forecast');
    hourlyForecast.innerHTML='';
    const nxt24=hourlyData.slice(0,8);
    nxt24.forEach(data=>{
        const DateTime=new Date(data.dt*1000);
        const hours=DateTime.getHours();
        const Temprature=Math.round(data.main.temp-273.15);
        const iconCode=data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyDetails=`
        <div class="hourly-item">
            <span>${hours}:00</span>
            <img src="${iconUrl}" alt="Hourly Icon Data">
            <span>${Temprature}°C</span>
        </div>
        `;
        hourlyForecast.innerHTML+=hourlyDetails;

    });

}
function showImg() {
    const weatherImg = document.getElementById("weather-icon");
    if (weatherImg) {
        weatherImg.style.display = 'block';
    }
}
