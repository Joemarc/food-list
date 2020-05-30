import axios from 'axios';

const API = axios.create({
  baseURL: 'https://food-list-jolo.herokuapp.com/api/v1'
});

export default API;