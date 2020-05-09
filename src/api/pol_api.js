import request from './request';

const parseApiResponse = response => {
  if (response != null) {
    return Promise.resolve(response);
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

  async createUser(userData) {
    const config = {
      method: 'post',
      endpoint: '/users/',
      jsonData: userData,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getUserById(id) {
    const config = {
      method: 'get',
      endpoint: `/users/id/${id}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getUserByEmail(userEmail) {
    const config = {
      method: 'get',
      endpoint: `/users/email/${userEmail}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * Dashboard Endpoints
   */

  async getAllDemographics() {
    const config = {
      method: 'get',
      endpoint: '/demographics',
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getGenderDemographics() {
    const config = {
      method: 'get',
      endpoint: '/demographics/gender',
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * Demographic Endpoints
   */

  async getDemographicById(id) {
    const config = {
      method: 'get',
      endpoint: `/demographics/id/${id}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * Settings Endpoints
   */

  async getUserSettings(userId) {
    const config = {
      method: 'get',
      endpoint: `/settings/${userId}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * Politicians Endpoints
   */

  async getPoliticianById(id) {
    const config = {
      method: 'get',
      endpoint: `/politicians/id/${id}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getAllPoliticians() {
    const config = {
      method: 'get',
      endpoint: '/politicians',
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * Issues Endpoints
   */

  async getIssueById(id) {
    const config = {
      method: 'get',
      endpoint: `/issues/id/${id}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getAllIssues() {
    const config = {
      method: 'get',
      endpoint: '/issues',
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getIssues(userid) {
    const config = {
      method: 'get',
      endpoint: `/issues/${userid}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getIssueByKeyword(userId, keyword) {
    const config = {
      method: 'get',
      endpoint: `/issues/filter/${userId}/${keyword}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * Politicians Endpoints
   */

  async getTopicById(id) {
    const config = {
      method: 'get',
      endpoint: `/topics/id/${id}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getAllTopics() {
    const config = {
      method: 'get',
      endpoint: '/topics',
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * UserIssues Endpoints
   */

  async getStatsForOneIssue(issueid, userid) {
    const config = {
      method: 'get',
      endpoint: `/userissues/stats/${issueid}/${userid}`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async createUserIssue(voteData) {
    const config = {
      method: 'post',
      endpoint: '/userissues/',
      jsonData: voteData,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getUserIssue(issueid, userid) {
    const config = {
      method: 'get',
      endpoint: '/userissues/${issueid}/${userid}',
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * Issue Data Endpoints
   */

  async getIssueDataGenderByIssueId(issueid) {
    const config = {
      method: 'get',
      endpoint: `/issuedata/gender/issueid/${issueid}/`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getIssueDataPartyByIssueId(issueid) {
    const config = {
      method: 'get',
      endpoint: `/issuedata/party/issueid/${issueid}/`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getIssueDataEducationByIssueId(issueid) {
    const config = {
      method: 'get',
      endpoint: `/issuedata/education/issueid/${issueid}/`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  async getIssueDataEthnicityByIssueId(issueid) {
    const config = {
      method: 'get',
      endpoint: `/issuedata/ethnicity/issueid/${issueid}/`,
    };

    return this.apiRequest(config).then(parseApiResponse);
  }

  /*
   * Social Quiz Endpoints
   */

  async createQuiz(userData) {
    const config = {
      method: 'post',
      endpoint: '/quiz/',
      jsonData: userData,
    };
    return this.apiRequest(config).then(parseApiResponse);
  }

  async getQuizScoreByUserId(id) {
    const config = {
      method: 'get',
      endpoint: `/quiz/userid/${id}`,
    };
    return this.apiRequest(config).then(parseApiResponse);
  }
}
