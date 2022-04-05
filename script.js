let form = document.getElementById('kisanFrom');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let place = document.getElementById('place');
    // alert(place.value)

    let city = place.value;
    const weather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d70f30185e7b127d0eb22ccb86b2fa0e`);
        const data = await response.json();
        return data;
    }
    const test = weather();
    let main = document.querySelector('main');

    test.then((data) => {
        // console.log(data);
        let result = document.createElement("div");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        let span3 = document.createElement("span");

        result.style.margin = "1.25vw auto";
        result.style.padding = "0.75vw";
        result.style.width = "60 %";
        result.style.backgroundColor = "#fff";
        result.style.borderRadius = "3px";

        span1.append(data.name)
        span2.append(data.main.temp)
        span3.append(data.weather[0].description)
        span1.style.margin = '0.75vw';
        span2.style.margin = '0.75vw';
        span3.style.margin = '0.75vw';
        result.append(span1);
        result.append(span2);
        result.append(span3);
        main.append(result)
    })

})