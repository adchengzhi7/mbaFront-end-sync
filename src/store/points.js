import axios from 'axios'
import auth from './auth'
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
                await dispatch('log/createLog', { logData, token: auth.state.token }, { root: true });

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
                // console.log("原本的資料:", originalData);
        
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
                await dispatch('log/createLog', { logData, token: auth.state.token }, { root: true });

        
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
        async approvePointId({ dispatch }, data) {
            try {
               
                let response = await axios.patch('/points/approve/', data, {
                    headers: { 'Authorization': 'Bearer ' + auth.state.token }
                });
        
                // 3. 獲取客戶端 IP
                const clientIp = await dispatch('getClientIp');
        
                // 4. 構建日誌資料
                const logData = {
                    logType: 'update_point_status',
                    userId: auth.state.userId,
                    studentId: data.stuId,
                    pointsId: data.pointId,
                    ipAddress: clientIp,
                    deviceInfo: navigator.userAgent,
                    previousData: { status: data.status  }, // 原始狀態
                    updatedData: { status: 2 },     // 更新後的狀態
                    addedData: null,
                    exportParams: null
                };
        
                // 5. 傳送日誌
                await dispatch('log/createLog', { logData, token: auth.state.token }, { root: true });
        
                // 更新狀態
                dispatch('getUserPoint', data.stuId);
                dispatch('getUnreviewPoint');
                return response;
            } catch (error) {
                console.error("更新點數狀態時出錯:", error);
                throw error;
            }
        },
        
        async deletePointId({ dispatch }, data) {
            try {
          
        
                // 2. 執行刪除操作
                let response = await axios.patch('/points/delete/', data, {
                    headers: { 'Authorization': 'Bearer ' + auth.state.token }
                });
        
                // 3. 獲取客戶端 IP
                const clientIp = await dispatch('getClientIp');
        
                // 4. 構建日誌資料
                const logData = {
                    logType: 'update_point_status',
                    userId: auth.state.userId,
                    studentId: data.stuId,
                    pointsId: data.pointId,
                    ipAddress: clientIp,
                    deviceInfo: navigator.userAgent,
                    previousData: { status: data.status }, // 原始狀態
                    updatedData: { status: '3' },       // 更新後的狀態，標記為已刪除
                    addedData: null,
                    exportParams: null
                };
        
                // 5. 傳送日誌
                await dispatch('log/createLog', { logData, token: auth.state.token }, { root: true });
        
                // 更新狀態
                dispatch('getUserPoint', data.stuId);
                dispatch('getUnreviewPoint');
                return response;
            } catch (error) {
                console.error("刪除點數時出錯:", error);
                throw error;
            }
        },
        async fetchExportData({ commit, dispatch }, exportList) {
            try {
                const response = await axios.post('/points/export', exportList, {
                    headers: { Authorization: 'Bearer ' + auth.state.token },
                });
                commit('SET_EXPORTDATA', response.data); // 假設資料成功儲存
                
                // 獲取客戶端 IP
                const clientIp = await dispatch('getClientIp');
        
                // 構建 LOG 資料
                const logData = {
                    logType: 'export_data',
                    userId: auth.state.userId,
                    studentId: null,          // 如果需要記錄學生 ID，可以從 exportList 中取出
                    pointsId: null,           // 如果適用，填入相應的 pointsId
                    ipAddress: clientIp,
                    deviceInfo: navigator.userAgent,
                    previousData: null,
                    updatedData: null,
                    addedData: null,
                    exportParams: exportList // 記錄導出參數
                };
        
                // 傳送 LOG
                await dispatch('log/createLog', { logData, token: auth.state.token }, { root: true });
                console.log("導出數據操作已記錄日誌。");
        
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