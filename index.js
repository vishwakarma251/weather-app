const target = "Pune";
const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time-location h1");
const dateField = document.querySelector(".time-location span");
const iconField = document.querySelector(".weather-condition img");
const weatherField = document.querySelector(".weather-condition span");

const searchField = document.querySelector(".search-field");
const form = document.querySelector("form");

async function fetchData(target) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=d79371f2014a42348a0105741242503&q=${target}&aqi=yes`;
    const response = await fetch(url);
    const data = await response.json();

    const currentTemperature = data.current.temp_c;
    const currentCondition = data.current.condition.text;
    const locationName = data.location.name;
    const localTime = data.location.localtime;
    const icon = data.current.condition.icon;

    form.addEventListener("submit", search);
    updateDom(
      currentTemperature,
      currentCondition,
      locationName,
      localTime,
      icon
    );
    function search(e) {
      e.preventDefault();
      target = searchField.value;
      fetchData(target);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchData(target);

function updateDom(
  currentTemperature,
  currentCondition,
  locationName,
  localTime,
  icon
) {
  temperatureField.innerHTML = `${currentTemperature} °C`;
  locationField.innerHTML = locationName;
  dateField.innerHTML = localTime;
  iconField.src = icon;
  weatherField.innerHTML = currentCondition;

  const exactTime = localTime.split(" ")[1];
  const exactDate = localTime.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());
  dateField.innerHTML = `${exactTime} ${exactDay} ${exactDate}`;
}
function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid";
  }
}
