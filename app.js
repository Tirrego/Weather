const form = document.querySelector("form");
const key = "e078ef6bdf60087701dd20f8d861385d";
const d = new Date();
let searchword = "";
let long = 51.505;
let lat = -0.09;
var map = L.map("map").setView([long, lat], 1);
const prognose = document.querySelector(".prognose");

document.querySelector("#month").innerHTML = `${d.getDate()}.${
  d.getMonth() + 1
}.${d.getFullYear()}`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  searchword = searchWord = document.querySelector("input").value;
  const data = await getWeather(searchWord);
  setTemp(data.main);
  document.querySelector("#city").innerHTML = data.name;
  setPicture(data);
  setWind(data.wind);
  setSun(data.sys);
  long = data.coord.lon;
  lat = data.coord.lat;
  map.setView([lat, long], 13);

  const forecast = await getForecast(searchword);
  console.log(forecast);
  setForecast(forecast);
});

const getWeather = async (searchWord) => {
  const res = await axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchWord}&appid=${key}&units=metric&lang=de`
  );
  return res.data;
};

const getForecast = async (searchword) => {
  const res = await axios(
    `https://api.openweathermap.org/data/2.5/forecast?q=${searchword}&appid=${key}&units=metric&lang=de`
  );
  return res.data.list;
};

const setTemp = (data) => {
  const { temp, temp_min, temp_max, pressure, humidity, feels_like } = data;
  document.querySelector(".maxTemp").innerHTML = temp_max.toFixed(1);
  document.querySelector(".minTemp").innerHTML = temp_min.toFixed(1);
  document.querySelector(".temp").innerHTML = `${temp.toFixed(1)} °`;
  document.querySelector("#pressure").innerHTML = `${pressure} hpa`;
  document.querySelector("#humadity").innerHTML = `${humidity} %`;
};

const setPicture = (data) => {
  document.querySelector(
    "#picture"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.querySelector(".description").innerText =
    data.weather[0].description;
};

const setWind = (data) => {
  const { speed, deg } = data;
  document.querySelector("#speed").innerHTML = `${speed} km/h`;
};

const setSun = (data) => {
  const { sunrise, sunset } = data;
  const sunriseFinal = new Date(sunrise * 1000);
  const sunsetFinal = new Date(sunset * 1000);
  document.querySelector(
    "#sunrise"
  ).innerHTML = `${sunriseFinal.getHours()}:${sunriseFinal.getMinutes()}`;
  document.querySelector(
    "#sunset"
  ).innerHTML = `${sunsetFinal.getHours()}:${sunsetFinal.getMinutes()}`;
};

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const setStandart = async () => {
  const data = await getWeather("Frankfurt");
  setTemp(data.main);
  document.querySelector("#city").innerHTML = data.name;
  setPicture(data);
  setWind(data.wind);
  setSun(data.sys);
  long = data.coord.lon;
  lat = data.coord.lat;
  map.setView([lat, long], 13);
};

const setForecast = (forecast) => {
  for (const item of forecast) {
    const img = document.createElement("img");
    const div = document.createElement("div");
    const date = document.createElement("div");
    const data = document.createElement("div");
    const description = document.createElement("p");
    const temp = document.createElement("p");
    temp.innerHTML = `                <i
    class="fa-solid fa-temperature-three-quarters fa-2xs"
    style="color: #141cff"
  ></i>${item.main.temp_max.toFixed(1)}  -  ${item.main.temp_min.toFixed(
      1
    )}                 <i
  class="fa-solid fa-temperature-three-quarters fa-2xs"
  style="color: #e81717"
></i>`;
    const dateOriginal = new Date(item.dt_txt);
    console.log(dateOriginal);
    date.innerText = `${dateOriginal.getDate()}.${
      dateOriginal.getMonth() + 1
    } - ${dateOriginal.getHours()}:00`;
    description.innerText = item.weather[0].description;
    data.append(img);
    div.append(date, data, description, temp);
    div.classList.add("prognose_box");
    const p = document.createElement("p");
    p.innerText = item.main.temp_min;
    console.log(item.dt_text);
    img.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    prognose.append(div);
  }
};

setStandart(searchword);
