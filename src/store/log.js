// log.js
import axios from 'axios';

export default {
  namespaced: true,
  actions: {
    async createLog(_, { logData, token }) {
      try {
        const response = await axios.post('/logs', logData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("日誌資料已創建:", response.data);
      } catch (error) {
        console.error("記錄日誌時出錯:", error);
        throw error;
      }
    }
  }
};