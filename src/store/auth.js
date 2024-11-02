import axios from 'axios'
import jwt_decode from "jwt-decode";
import auth from './auth'

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) { // 假設 401 表示 token 無效
        auth.state.token = null; // 將 token 設為 null
        this.$router.push('/home'); // 導向 home
      }
      return Promise.reject(error);
    }
  );

export default {
    namespaced:true,
    state:{
        token:null,
        user:null,
        invalidUserMsg:null,
        userType:null,
        userId:null,
        isInvalidToken:null,
        userEmail:null,
        userPId:null,
    },
    getters:{
        token(state){
            return state.token;
        },
        authenticated(state){
            return ({
                    token:state.token,
                    user:state.user,
                    userType:state.userType,
                })
        },
        userType(state){
            return state.userType
        },
        userId(state){
            return state.userId
        },
        user(state){
            return state.user
        },
        invalidUserMsg(state){
            return state.invalidUserMsg
        },
        isInvalidToken(state){
            return state.isInvalidToken
        }
    },
    mutations:{
        SET_TOKEN(state,token){
            state.token = token
        },
        CLEAR_TOKEN(state) {
            state.token = null;
        },
        SET_USER(state,user){
            state.user = user
        },
        SET_USERDETAILS(state,data){
            state.userType = data.usersDetails_type
            state.userId = data.usersDetails_stuId
            state.userEmail = data.usersDetails_email
            state.userPId = data.usersDetails_psId

        },
        SET_invalidUserMsg(state,data){
            state.invalidUserMsg = data
        },
        SET_ISINVALIDTOKEN(state,data){
            state.isInvalidToken =data;
        }
    },
    actions:{
        async signIn({ dispatch,  }, credentials) {
            let response = await axios.post('/users/login', credentials);
            dispatch('errorMsg', response.data);
            await dispatch('attempt', response.data.token);

            // 獲取客戶端 IP 地址
            let clientIp;
            try {
                const ipResponse = await axios.get('https://api.ipify.org?format=json');
                clientIp = ipResponse.data.ip;
            } catch (error) {
                console.error('無法獲取客戶端 IP:', error);
                clientIp = '未知 IP';
            }

            // 構建日誌數據並記錄登入日誌
            const logData = {
                logType: 'login',
                userId: credentials.user,
                ipAddress: clientIp,
                deviceInfo: navigator.userAgent, // 設備資訊
            };

            try {
                await dispatch('log/createLog', { logData, token: auth.state.token }, { root: true });

            } catch (error) {
                console.error('記錄日誌時出錯:', error);
            }
        },
        errorMsg({commit},data){
            return  commit('SET_invalidUserMsg',data.message)
        },
        async attempt({ commit, state }, token) {
            // 若 token 為空，從 localStorage 嘗試加載
            if (!token) {
                token = localStorage.getItem('token');
                if (!token) return; // 若 localStorage 中也無 token，直接返回
            }
        
            // 若有 token，設置 Vuex state
            commit('SET_TOKEN', token);
        
            // 檢查是否成功設置 token
            if (!state.token) {
                return;
            }
        
            try {
                // 解碼 token 並更新用戶信息
                let decoded = jwt_decode(token);
                commit('SET_USER', decoded.result.usersDetails_cName);
                commit('SET_USERDETAILS', decoded.result);
        
                // 將 token 存入 localStorage 以持久化
                localStorage.setItem('token', token);
            } catch (e) {
                // 若解碼出錯，清空 token 和 user 信息
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
                localStorage.removeItem('token'); // 移除 localStorage 中的 token
            }
        },
        signOut({commit}){
            commit('SET_TOKEN',null)
            commit('SET_USER',null)
            localStorage.removeItem('token')
        },
        async checkTokenInvalid({ commit, state }) {
            await axios.get('/users/check', {
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
            .then(() => {
                commit('SET_ISINVALIDTOKEN', false);
                // console.log(res);
            })
            .catch((error) => {
                commit('SET_ISINVALIDTOKEN', true);
                console.log(error);
            });
        },
        async getClientIp() {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                return response.data.ip;
            } catch (error) {
                console.error('無法取得客戶端 IP:', error);
                return '未知 IP';
            }
        },
        clearToken({ commit }) {
            commit('CLEAR_TOKEN');
        },
        
    },
    modules:{
    }
}