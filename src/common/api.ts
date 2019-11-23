import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import {JWT_TOKEN_NAME} from './constants';
import {storeToken} from './util';

interface ApiInterface {
  token: string | null;
  options: AxiosRequestConfig;
  get: Function;
  post: Function;
}

class Api implements ApiInterface {
  token = localStorage.getItem(JWT_TOKEN_NAME);
  options: AxiosRequestConfig = {
    headers: {"Authorization" : `Bearer ${this.token}`}
  };

  private async sendRequest(options: AxiosRequestConfig) {
    try {
      const res: AxiosResponse = await axios.request(options);
      const {jwt} = res.data;
      if (jwt) {
        storeToken(jwt);
      }
      if (res.data.data) {
        res.data = res.data.data;
      }
      return res.data;
    } catch(err) {
      console.log(err);
      throw err;
    } 
  }

  async get(endpoint: string, params: Object = {}, optionsOverride: AxiosRequestConfig = {}) {
    const options: AxiosRequestConfig = {...this.options};
    options.params = params;
    options.url = endpoint;
    options.method = 'GET';
    Object.assign(options, optionsOverride);
    return this.sendRequest(options);
  }

  async post(endpoint: string, params: Object = {}, optionsOverride: AxiosRequestConfig = {}) {
    const options: AxiosRequestConfig = {...this.options};
    options.data = params;
    options.url = endpoint;
    options.method = 'POST';
    Object.assign(options, optionsOverride);
    return this.sendRequest(options);
  }
}

export default Api;
