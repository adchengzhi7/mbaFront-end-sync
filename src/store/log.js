// log.js
import axios from 'axios';
import auth from './auth'

export default {
  namespaced: true,
  state: {
    allLogs: [] // 新增 state 用於存儲所有日誌數據
  },
  getters: {
    allLogs: state => state.allLogs // 創建 getter 用於訪問日誌數據
  },
  mutations: {
    SET_ALL_LOGS(state, logs) {
      state.allLogs = logs;
    }
  },
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
    },
    async getAllLogs({ commit }) {  // 接收 token 作為參數
        try {
          const response = await axios.get('/logs', {
            headers: {
              Authorization: `Bearer ${auth.state.token}`
            }
          });
          commit('SET_ALL_LOGS', response.data.data); // 假設後端返回的日誌數據在 response.data.data
          console.log("成功獲取所有日誌數據:", response);
        } catch (error) {
          console.error("獲取日誌數據時出錯:", error);
          throw error;
        }
    }
    
    
  }
};