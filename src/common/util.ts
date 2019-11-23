import {JWT_TOKEN_NAME} from './constants';

export const storeToken = (token: string) => {
  localStorage.setItem(JWT_TOKEN_NAME, token);
}