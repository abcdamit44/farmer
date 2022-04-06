let form = document.getElementById('kisanFrom');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let place = document.getElementById('place');

    let city = place.value;
    const weather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d70f30185e7b127d0eb22ccb86b2fa0e`);
        const data = await response.json();
        return data;
    }
    const test = weather();
    let main = document.querySelector('main');
    let lon;
    let lat;
    test.then((data) => {
        lon = data.coord.lon;
        lat = data.coord.lat;
        let result = document.createElement("div");

        let para = document.createElement("p");
        para.style.fontWeight = '500';

        result.style.margin = "1.25vw auto";
        result.style.padding = "0.75vw";
        result.style.width = "60 %";
        result.style.backgroundColor = "#fff";
        result.style.borderRadius = "3px";

        const soil = async () => {
            const soilData = await fetch(`https://api.ambeedata.com/soil/latest/by-lat-lng?lat=${lat}&lng=${lon}`, {
                "method": "GET",
                "headers": {
                    "x-api-key": "df2017ece4ed546bb057bcc4c3eb2fc87c6515aa5f7f0c2485c595758759a59b",
                    "Content-type": "application/json"
                }
            })
            const res = await soilData.json();
            return res;
        }

        const soilData = soil();
        soilData.then((res) => {
            para.innerHTML = `<b>${data.name}</b>'s current temperature is <b>${data.main.temp}°C</b>. Weather is <b>${data.weather[0].description}</b>. Soil moisture is <b>${parseInt(res.data[0].soil_moisture).toFixed(2)}°C</b> and Soil temperature is <b>${parseInt(res.data[0].soil_temperature).toFixed(2)}°C</b>`;
            result.append(para);
            main.append(result)
        })
    })

    form.reset()
})


function formReset() {
    location.href = "/"
}