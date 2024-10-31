import axios from 'axios'
import auth from './auth'
import log from './log'  
 const points = {
    namespaced:true,
    state:{
        userPoints:null,
        unreviewPoints:null,
        pointById:null,
        updateSts:false,
        approveSts:false,
        exportData: [], // 新增 exportData 來存儲回應資料
    },
    getters:{
        userPoints(state){
            return state.userPoints

        },
        unreviewPoints(state){
            return state.unreviewPoints
        },
        pointById(state){
            return state.pointById
        },
        exportData(state) { // 新增 exportData getter
            return state.exportData;
        },
    },
    mutations:{
        SET_USERPOINTS(state,data){
            state.userPoints = data.data;

        },
        SET_UNREVIEWPOINTLIST(state,data){
            state.unreviewPoints = data.data;

        },
        SET_GETBYIDPOINT(state,data){
            state.pointById = data.data[0];
        },
        SET_UPDATESTS(state,data){
            state.updateSts = data;
        },
        SET_APPROVESTS(state,data){
            state.approveSts = data;
        },
        SET_EXPORTDATA(state, data) { // 新增 SET_EXPORTDATA mutation
            state.exportData = data;
        },
        
        
        
    },
    actions:{
        async getClientIp() {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                return response.data.ip;
            } catch (error) {
                console.error('無法取得客戶端 IP:', error);
                return '未知 IP';
            }
        },

        async getUserPoint  ({dispatch},credentials){
            let response = await 
            axios.get('/points/'+credentials,{ 
                headers:{'Authorization':'Bearer ' +auth.state.token }
             })
             .then(function (response) {
                 if(response.data.success ==0){
                    throw "invalid Token";
                 }
                 return response;
              })
              .catch(function (response,error) {
                //   console.log(response);
                   throw error;
              });
         dispatch('getUserPointCommit', response.data)



        },
        getUserPointCommit({commit},data){
            return commit('SET_USERPOINTS',data)
        },
        async insertUserPoint({ dispatch }, credentials) {
            // 執行插入點數的操作並等待結果
            const response = await axios.post('/points/', credentials, {
                headers: { 'Authorization': 'Bearer ' + auth.state.token }
            });
        
            // 正確取得 insertId
            const pointsId = response.data.data.insertId;
        
            // 使用 getClientIp 函數獲取客戶端 IP
            const clientIp = await dispatch('getClientIp');
        
            // 構建記錄的資料
            const logData = {
                logType: 'add_points',
                userId: auth.state.userId,
                studentId: credentials.stuId,
                pointsId,             // 確保此處填入正確的 insertId
                ipAddress: clientIp,   // 使用獲取的 IP
                deviceInfo: navigator.userAgent,
                previousData: null,
                updatedData: null,
                addedData: credentials,
                exportParams: null
            };
        
            try {
                await log.createLog(logData, auth.state.token); // 傳送日誌
            } catch (error) {
                console.error('記錄日誌時出錯:', error);
            }
        
            return response;
        },
       
        async getUnreviewPoint  ({dispatch}){
            let response = await 
            axios.get('/points/unreview/',{ 
                headers:{'Authorization':'Bearer ' +auth.state.token }
             })
             .then(function (response) {
                 if(response.data.success ==0){
                    throw "invalid Token";
                 }
                 return response;
              })
              .catch(function (error) {
                   throw error;
              });
        dispatch('unReviewPointListCommit', response.data)



        },
        unReviewPointListCommit({commit},data){
            return commit('SET_UNREVIEWPOINTLIST',data)
        },
        async getPointByPointId({dispatch},data){
            let response = await 
            axios.get('/points/edit/'+data,{ 
                headers:{'Authorization':'Bearer ' +auth.state.token }
             })
             .then(function (response) {
                 if(response.data.success ==0){
                    throw "invalid Token";
                 }
                 return response;
              })
              .catch(function (error) {
                   throw error;
              });
            //   console.log(response)
        return dispatch('getPointByPointIdCommit', response.data)

        },
        getPointByPointIdCommit({commit},data){
            return commit('SET_GETBYIDPOINT',data)
        },async updatePointByPointId({ dispatch }, data) {
            try {
                // 直接在 updatePointByPointId 中呼叫 axios 獲取修改前的數據
                const originalDataResponse = await axios.get(`/points/edit/${data.pointsId}`, {
                    headers: { 'Authorization': 'Bearer ' + auth.state.token }
                });
                const originalData = originalDataResponse?.data?.data?.[0] || null; // 提取數據
                console.log("原本的資料:", originalData);
        
                // 執行更新操作
                let response = await axios.patch('/points/edit/', data, {
                    headers: { 'Authorization': 'Bearer ' + auth.state.token }
                });
        
                // 獲取客戶端 IP
                const clientIp = await dispatch('getClientIp');
        
                // 構建日誌資料
                const logData = {
                    logType: 'update_points',
                    userId: auth.state.userId,
                    studentId: data.stuId,
                    pointsId: data.pointsId,
                    ipAddress: clientIp,
                    deviceInfo: navigator.userAgent,
                    previousData: originalData, // 使用原始數據
                    updatedData: data,
                    addedData: null,
                    exportParams: null
                };
        
                // 傳送日誌
                await log.createLog(logData, auth.state.token);
        
                // 更新狀態
                dispatch('updateStsCommit', true);
                return response;
            } catch (error) {
                console.error("更新點數時出錯:", error);
                throw error;
            }
        },
        updateStsCommit({commit},data){
           commit('SET_UPDATESTS',data)
        },
        async approvePointId({dispatch},data){
            // console.log(data);
            let response = await axios.patch('/points/approve/',data,{
                headers:{'Authorization':'Bearer ' +auth.state.token }
                })
                dispatch('getUserPoint', data.stuId)
                dispatch('getUnreviewPoint')
                return response;
        },
        async deletePointId({dispatch},data){
            // console.log(data);
            let response = await axios.patch('/points/delete/',data,{
                headers:{'Authorization':'Bearer ' +auth.state.token }
                })
                dispatch('getUserPoint', data.stuId)
                dispatch('getUnreviewPoint')
                return response;
        },
        async fetchExportData({ commit }, exportList) {
            try {
              const response = await axios.post('/points/export', exportList, {
                headers: { Authorization: 'Bearer ' + auth.state.token },
              });
              commit('SET_EXPORTDATA', response.data); // 假設資料成功儲存
            } catch (error) {
              console.error('Error fetching export data:', error);
              throw error;
            }
        }
        
    },
    modules:{
        auth
    }
}
export default  points