fetch("https://restcountries.com/v2/all")
  .then((data) => data.json())
  .then((countries) => {
    countries.forEach((country) => {
      const card = document.createElement("div");
      card.classList.add("card", "col-lg-4", "col-sm-12");
      card.setAttribute("data-name", country.name); 
      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");
      cardHeader.innerText = country.name;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      cardBody.innerHTML = `
        <img src="${country.flags.svg}" class="card-img-top" alt="Flag">
        <p class="card-text"><strong>Capital:</strong> ${country.capital}</p>
        <p class="card-text"><strong>Latitude/Longitude:</strong> ${country.latlng}</p>
        <p class="card-text"><strong>Region:</strong> ${country.region}</p>
        <p class="card-text"><strong>Country Code:</strong> ${country.alpha3Code}</p>
        <button type="button" class="btn btn-primary" onclick="getWeatherData('${country.name}')">Click for weather</button>
      `;
      
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      document.querySelector(".row").appendChild(card);
    });
  });

const getWeatherData = (name) => {
  const apiKey = '1bed6708502ac1f73b95b54c86fcf5ea';
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=1bed6708502ac1f73b95b54c86fcf5ea`;
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const card = document.querySelector(`[data-name="${name}"]`);
      card.innerHTML = `
        <p class="type"><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p class="type"><strong>Coordinates:</strong> Lat ${data.coord.lat}, Lon ${data.coord.lon}</p>
        <p class="type"><strong>Base: </strong>${data.base}</p>
      `;
      
    })
    .catch((error) => console.error('Error fetching weather data:', error));
};