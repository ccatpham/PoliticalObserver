const axios = require('axios').default;

// Development Server
//const baseUrl = 'https://political-observer.herokuapp.com/';

// Local Server
const baseUrl = 'http://127.0.0.1:3000/';

const request = axios.create({baseURL: baseUrl});

export default request;
