const baseURL = "https://www.metaweather.com/api/location/";
const requestCity = async (city) => {
   const query = `search/?query=${city}`;
   if (city === "") {
      return;
   } else {
      const response = await fetch(baseURL + query);
      const data = await response.json();
      return data;
   }
};
const requestWOIDofCity = async (woeid) => {
   const query = `location/${woeid}`;
   const response = await fetch(baseURL + query);
   const data = await response.json();
   // console.log(data.consolidated_weather);
   return data.consolidated_weather;
};

// navigator.geolocation.getCurrentPosition((position) => {
// });
