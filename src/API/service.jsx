import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://covid-193.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
  },
};

axios.defaults.baseURL = 'https://covid-193.p.rapidapi.com/';

// получение списка стран
export const listCountryApi = async () => {
  return await axios
    .get(`countries`, options)
    .then(res => res.data.response)
    .catch(error => {
      console.error(error);
    });
};

// получение статистики по стране
export const countryStatApi = async query => {
  return await axios
    .get(`statistics?country=${query}`, options)
    .then(res => res.data.response)
    .catch(error => {
      console.error(error);
    });
};
