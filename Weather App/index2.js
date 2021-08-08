const searchForm = document.querySelector(".search-location");
const cityValue = document.querySelector(".search-location input");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImage = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back-card");
const cardsContainer = document.querySelector(".week .container");
const dropMenu = document.getElementById("drop-menu");
const dropMenuItems = document.querySelector("#drop-menu ul");
const ulItems = document.querySelector("#drop-menu ul li");
const cardInfoDays = document.querySelectorAll(".day-card");

// const isDayTime = (icon) => {
//    if (icon.includes("d")) {
//       return true;
//    } else {
//       return false;
//    }
// };
updateWetherApp = (city) => {
   cityName.textContent = city[0].title;
   console.log(city);
   cardInfo.classList.remove("d-none");
   requestWOIDofCity(city[0].woeid)
      .then((data) => updateWetherApp_days(data))
      .catch((error) => {
         console.log(error);
      });
   timeImage.setAttribute("src", "img/night_image.svg");
   if (cityName.classList.contains("text-black")) {
      cityName.classList.remove("text-black");
   } else {
      cityName.classList.add("text-white");
   }
   cardInfo.classList.remove("d-none");
   cardsContainer.classList.remove("d-none");

   // Make condition about the time in selected city (Day/Night)
   // if (true) {
   //    timeImage.setAttribute("src", "img/day_image.svg");
   //    if (cityName.classList.contains("text-white")) {
   //       cityName.classList.remove("text-white");
   //    } else {
   //       cityName.classList.add("text-black");
   //    }
   // }
   // } else {
   // }
};
updateWetherApp_days = (response) => {
   console.log(response);
   const imageName = response[0].weather_state_abbr;
   const iconSrc = `https://www.metaweather.com/static/img/weather/${imageName}.svg`;

   cardBody.innerHTML = `
   <div class="card-mid row">
   <div class="col-8 text-center temp">
       <span>${Math.round(response[0].the_temp)}&deg;C</span>
   </div>
   <div class="col-4 condition-temp">
       <p class="condition">${response[0].weather_state_name}</p>
       <p class="high">${Math.round(response[0].max_temp)}&deg;C</p>
       <p class="low">${Math.round(response[0].min_temp)}&deg;C</p>
   </div>
</div>
<div class="icon-container card shadow mx-auto">
   <img src="${iconSrc}" alt="">
</div>
<div class="card-bottom px-5 py-4 row">
   <div class="col text-center">
       <p>${Math.round(response[0].the_temp)}&deg;C</p>
       <span>Feels Like</span>
   </div>
   <div class="col text-center">
       <p>${response[0].humidity}%</p>
       <span>Humidity</span>
   </div>
</div>
`;
   cardInfoDays.forEach((card, index) => {
      console.log(card);
      console.log(`index is ${index}`);
      let imageName = response[index + 1].weather_state_abbr;
      const iconSrc = `https://www.metaweather.com/static/img/weather/${imageName}.svg`;
      card.innerHTML = `
   <div class="card-body">
   <div class="card-top text-center">
       <div class="city-name my-3 position-relative">
           <p>${response[index + 1].applicable_date}</p>
       </div>
   </div>
   <div class="card-mid row my-2 align-items-center">
       <div class="col-8 text-center temp">
           <span>${Math.round(response[index + 1].the_temp)}°C</span>
       </div>
       <div class="col-4 condition-temp">
           <p class="condition">${response[index + 1].weather_state_name}</p>
           <p class="high">${Math.round(response[index + 1].max_temp)}°C</p>
           <p class="low">${Math.round(response[index + 1].min_temp)}°C</p>
       </div>
   </div>
   <div class="icon-container align-items-center justify-content-center card shadow mx-auto">
       <img src="${iconSrc} " alt="">
   </div>
   <div class="card-bottom py-4 row ">
       <div class="col text-center">
           <p>${Math.round(response[index + 1].the_temp)}°C</p>
           <span>Feels Like</span>
       </div>
       <div class="col text-center">
           <p>${response[index + 1].humidity}% </p>
           <span>Humidity</span>
       </div>
   </div>
</div>`;
   });
};
// updateDropMenu = (city) => {
//    if (cityValue === "") {
//       return;
//    } else {
//       city.forEach((value, i) => {
//          let li = document.createElement("li");
//          li.appendChild(document.createTextNode(city[i].title));
//          dropMenuItems.appendChild(li);
//          ulItems.innerHTML = li.innerHTML;
//          // ulItems.replaceWith(li);
//       });
//    }
// };

searchForm.addEventListener("submit", (e) => {
   e.preventDefault();
   // dropMenu.classList.add("d-none");
   const citySearched = cityValue.value.trim();
   console.log(citySearched);
   searchForm.reset();
   requestCity(citySearched)
      .then((data) => {
         updateWetherApp(data);
      })
      .catch((error) => {
         console.log(error);
      });
});
// displayCities = () => {
//    const citySearched = cityValue.value.trim();
//    requestCity(citySearched)
//       .then((data) => {
//          updateDropMenu(data);
//       })
//       .catch((error) => {
//          console.log(error);
//       });
// };
// searchForm.addEventListener("change", displayCities);
// searchForm.addEventListener("keyup", displayCities);
// searchForm.addEventListener("input", () => {
//    dropMenu.classList.remove("d-none");
//    if (cityValue.value === "") {
//       dropMenu.classList.add("d-none");
//    } else {
//       dropMenu.classList.remove("d-none");
//    }
// });
