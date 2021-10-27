import axios from 'axios';
//
import { WEB_API_KEY } from '@env';

export default axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTjvAFSoWQOcdPLW6iJweWKswOBf2iZj8`,
  headers: {
    'Content-Type': 'application/json',
  },
});
