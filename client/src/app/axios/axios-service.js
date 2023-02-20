import axios from 'axios';

class AxiosService {
  constructor() {
    const service = axios.create({
      header: {}
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  setHeader(name, value) {
    this.service.defaults.headers.common[name] = value;
  }

  removeHeader(name) {
    delete this.service.defaults.headers.common[name];
  }

  handleSuccess(response) {
    return response;
  }

  redirectTo = (document, path) => {
    document.location = path;
  };
  redirectPage = (title, path) => {
    window.history.pushState('page2', title, path);
  };
  // get(endpoint) {
  //   return this.service.get(endpoint);
  // };

  handleError(error) {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, '/login');
        break;
      default:
        return Promise.reject(error);
    }
  }

  get(endpoint, token) {
    return this.service.request({
      method: 'GET',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json',
    });
  }

  post(endpoint, payload, token) {
    return this.service.request({
      method: 'POST',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json',
      data: payload
    });
  }

  put(endpoint, payload, token) {
    return this.service.request({
      method: 'PUT',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json',
      data: payload
    });
  }

  patch(endpoint, payload, token) {
    return this.service.request({
      method: 'PATCH',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json',
      data: payload
    });
  }

  delete(endpoint, token) {
    return this.service.request({
      method: 'DELETE',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      },
      responseType: 'json'
    });
  }
}
export default new AxiosService();
