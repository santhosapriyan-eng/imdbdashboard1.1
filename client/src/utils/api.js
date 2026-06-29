import axios from 'axios';

const API_URL = 'https://imdbdashboard1-1.onrender.com/api/movies';

export const fetchMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const refreshMovies = async () => {
  const response = await axios.post(`${API_URL}/refresh`);
  return response.data;
};

export const scrapeMovies = async () => {
  const response = await axios.get(`${API_URL}/scrape`);
  return response.data;
};
