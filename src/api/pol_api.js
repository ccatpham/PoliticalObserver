import request from './request';

const parseApiResponse = response => {
  if (response != null) {
    return Promise.resolve(response.result);
  } else {
    return Promise.reject(
      new Error('Error, Request response was null or undefined'),
    );
  }
};

const parseApiError = error => {
  let serverError;
  try {
    serverError = error.message;
  } catch (e) {
    serverError = error;
  }
  return serverError;
};

export default class Api {
  constructor() {}

  async apiRequest(apiReq) {
    const {endpoint, method, data} = apiReq;
    let {query, jsonData} = apiReq;

    if (query && typeof query !== 'string' && typeof query !== 'object') {
      throw new Error(
        'Invalid type supplied for "query": Must be of type "string" or "object"',
      );
    }

    if (
      jsonData &&
      typeof jsonData !== 'string' &&
      typeof jsonData !== 'object'
    ) {
      throw new Error(
        'Invalid type supplied for "jsonData": Must be of type "string" or "object"',
      );
    }

    if (query) {
      // query should  be a string. In case it was passed as a string, do a little sanitizing
      query = query.trim().replace(/^[?]/, '');
    }

    if (typeof jsonData === 'string') {
      jsonData = JSON.parse(jsonData);
    }

    const finalUrl = query ? `${endpoint}?${query}` : endpoint;

    const config = {
      method,
      url: finalUrl,
      headers: {},
    };

    if (jsonData) {
      config.data = jsonData;
    }

    if (data) {
      config.data = data;
    }

    try {
      const response = await request(config);
      return response.data;
    } catch (err) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.code === 4005
      ) {
        throw err;
      } else {
        throw parseApiError(err);
      }
    }
  }

  /*
   * Users Endpoints
   */

  createUser(userData) {
    const config = {
      method: 'post',
      endpoint: '/users/',
      jsonData: userData,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  getUser(userEmail) {
    const config = {
      method: 'get',
      endpoint: `/users/${userEmail}`,
    };

    return request(config).then(parseApiResponse);
  }

  /*
   * Settings Endpoints
   */

  getUserSettings(userId) {
    const config = {
      method: 'get',
      endpoint: `/settings/${userId}`,
    };

    return request(config).then(parseApiResponse);
  }

  /*
   * Politicians Endpoints
   */

  getPolitician(politicianName) {
    const config = {
      method: 'get',
      endpoint: `/politicians/${politicianName}`,
    };

    return request(config).then(parseApiResponse);
  }

  getAllPoliticians(userEmail) {
    const config = {
      method: 'get',
      endpoint: '/politicians/',
    };

    return request(config).then(parseApiResponse);
  }
}
