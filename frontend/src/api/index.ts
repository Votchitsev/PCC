import axios from 'axios';
import LocalStorage from '@lib/utils/localStorage';

export const ApiClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const FormDataApiClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
});
