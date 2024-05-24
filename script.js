// on dom loaded
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form")
    const searchBar = document.querySelector("#search")
    const weatherForecastContainer = document.getElementById("forecast")
    const countryForecastContainer = document.getElementById("location")
    const toggle = document.getElementById("toggle");

    let previousQuery = ''

    let isFarenheit = false

    handleSearch = (query = "") => {
        console.log(query)
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=bf9b84d0c1dc4d5ca1d31252230802&q=${query}city&days=7&aqi=yes&alerts=no`)
            .then((res) => res.json())
            .then((result) => {
                previousQuery = query

                weatherForecastContainer.innerHTML = '';
                countryForecastContainer.innerHTML = '';


                const weatherForecast = result.forecast.forecastday;


                const locationForecast = document.createElement("div")
                locationForecast.className = "location";
                locationForecast.innerHTML =
                    `
                    <p>Location: ${result.location.name}</p>
                    <p>Country: ${result.location.country}</p>
                    `
                countryForecastContainer.appendChild(locationForecast)

                const dayForecast = document.createElement("div")
                dayForecast.className = "date";
                dayForecast.innerHTML = `<p>Today</p>
                <p>${!isFarenheit ? `${weatherForecast[0].day.avgtemp_c}&#8451` : `${weatherForecast[0].day.avgtemp_f}&#8457`}</p>
                <img src="${weatherForecast[0].day.condition.icon}">
                <p>Humidity ${weatherForecast[0].day.avghumidity}%</p >`
                weatherForecastContainer.appendChild(dayForecast)

                console.log(result);
                for (let i = 1; i < 7; i++) {
                    const dayForecast = document.createElement("div")

                    dayForecast.className = "date"

                    dayForecast.innerHTML = generateForecastText(weatherForecast[i], isFarenheit)

                    weatherForecastContainer.appendChild(dayForecast)

                }
            })
    }
    function showTime() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var session = "AM";

        if (h == 0) {
            h = 12;
        }
        if (h > 12) {
            h = h - 12;
            session = "PM";
        }

        m = (m < 10) ? "0" + m : m;
        var time = h + ":" + m + session;
        document.getElementById("myClock").innerText = time;
        document.getElementById("myClock").textContent = time;

        setTimeout(showTime, 1000);

    }

    function dateToFormattedWeekday(date) {
        return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    }


    function generateForecastText(data, isFarenheit) {
        return (
            `<p>${dateToFormattedWeekday(data.date)
            }</p >
        <p>${!isFarenheit ? `${data.day.avgtemp_c}&#8451` : `${data.day.avgtemp_f}&#8457`}</p>
        <img src="${data.day.condition.icon}">
        <p>Humidity ${data.day.avghumidity}%</p >`)
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const search = searchBar.value;
        handleSearch(search);
        searchBar.value = ""
    });

    toggle.addEventListener("click", () => {
        isFarenheit = !isFarenheit

        if (previousQuery == '') return

        handleSearch(previousQuery)
    })

    showTime();

})

