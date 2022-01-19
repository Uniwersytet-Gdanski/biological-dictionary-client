const axios = require('axios');

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL
});

module.exports = axiosClient;
