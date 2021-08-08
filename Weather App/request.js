const key = "cb008cb5b5f1f28a8f8dea4a74fd865d";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

fetch(baseURL)
   .then((data) => {
      console.log(data.json());
   })
   .catch((error) => {
      console.log(error);
   });
const requestCity = async (city) => {
   const query = `?q=${city}&appid=${key}`;
   const response = await fetch(baseURL + query);
   const data = await response.json();
   return data;
};
