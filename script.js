let form = document.getElementById('kisanFrom');
let rate = document.getElementById('rate');
let schemes = document.getElementById('schemes');


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

        // result.style.marginBottom = "1.25vw";
        result.style.padding = "0.75vw";
        result.style.width = "80%";
        result.style.backgroundColor = "#fff";
        result.style.borderRadius = "0px";

        const soil = async () => {
            const soilData = await fetch(`https://api.ambeedata.com/soil/latest/by-lat-lng?lat=${lat}&lng=${lon}`, {
                "method": "GET",
                "headers": {
                    "x-api-key": "2421b9ad883c24961fae00c3f6b1ef2b538e73673299f73ad9853f93647a6665",
                    "Content-type": "application/json"
                }
            })
            const res = await soilData.json();
            return res;
        }

        const soilData = soil();
        soilData.then((res) => {
            para.innerHTML = `<b>${data.name}</b>'s current temperature is <b>${data.main.temp}°C</b>. Weather is <b>${data.weather[0].description}</b>. Soil moisture is <b>${parseInt(res.data[0].soil_moisture).toFixed(2)}°C</b> and Soil temperature is <b>${parseInt(res.data[0].soil_temperature).toFixed(2)}°C</b>.`;
            result.append(para);
            main.append(result)
        })
    })
    setTimeout(() => {
        let subDiv = document.createElement('div');
        subDiv.innerHTML = `Market Price Of the Product is <b>${rate.value} ₹.</b>`;
        subDiv.style.backgroundColor = "#fff";
        subDiv.style.borderTopRightRadius = "3px";
        subDiv.style.borderTopLeftRadius = "3px";
        subDiv.style.marginTop = "1.25vw";
        subDiv.style.padding = "0.75vw";
        subDiv.style.width = "80%";



        main.append(subDiv)
        // form.reset()

    }, 1000);

    setTimeout(() => {
        let subDiv2 = document.createElement('div');
        subDiv2.innerHTML = `<b>Government Scheme</b> ${schemes.value}.`
        subDiv2.style.backgroundColor = "#fff";
        subDiv2.style.borderBottomRightRadius = "3px";
        subDiv2.style.borderBottomLeftRadius = "3px";
        subDiv2.style.padding = "0.75vw";
        subDiv2.style.width = "80%";
        subDiv2.style.marginLeft = "auto";
        subDiv2.style.marginRight = "auto";
        subDiv2.style.marginBottom = "1.25vw";
        main.append(subDiv2)

        form.reset()


    }, 2000);


})


function formReset() {
    location.href = "/"
}