import axios from 'axios'
import jwt_decode from "jwt-decode";
import log from './log'; // 新增這行以引用 logAPI

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
        async signIn({ dispatch, state }, credentials) {
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
                await log.createLog(logData, state.token); // 傳入 token
            } catch (error) {
                console.error('記錄日誌時出錯:', error);
            }
        },
        errorMsg({commit},data){
            return  commit('SET_invalidUserMsg',data.message)
        },
        async attempt({commit,state},token){
            if(token){
                commit('SET_TOKEN',token)
            }
            if(!state.token){
                return

            }
            try {
                let decoded = jwt_decode(token);
                commit('SET_USER',decoded.result.usersDetails_cName)
                commit('SET_USERDETAILS',decoded.result)

            } catch (e) {
                commit('SET_TOKEN',null)
                commit('SET_USER',null)
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
            .then((res) => {
                commit('SET_ISINVALIDTOKEN', false);
                console.log(res);
            })
            .catch((error) => {
                commit('SET_ISINVALIDTOKEN', true);
                console.log(error);
            });
        }
        
    },
    modules:{
    }
}