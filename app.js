const searchWord = document.querySelector("input").value;
const form = document.querySelector("form");
const key = "e078ef6bdf60087701dd20f8d861385d";
const d = new Date();
document.querySelector("#month").innerHTML = `${d.getDate()}.${
  d.getMonth() + 1
}.${d.getFullYear()}`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchWord = document.querySelector("input").value;
  const data = await getWeather(searchWord);
  setTemp(data.main);
  document.querySelector("#city").innerHTML = data.name;
  setPicture(data);
  setWind(data.wind);
  document.querySelector(".content").classList.add("animation");
  document.querySelector(".content").classList.remove("disable");
  // const sunrise = new Date(data.sys.sunrise * 1000).toLocaleString();
  setSun(data.sys);
});
console.log(searchWord);

const getWeather = async (searchWord) => {
  const res = await axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchWord}&appid=${key}&units=metric&lang=de`
  );
  return res.data;
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
