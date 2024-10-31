// src/services/logAPI.js
import axios from 'axios';

export default {
  createLog(logData, token) {
    console.log(logData)
    return axios.post('/logs', logData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};