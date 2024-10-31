import axios from 'axios'   
import auth from './auth'
import log from './log'; // 引入 log 模塊

 const student = {
    namespaced:true,
    state:{
        studentList:null,
        studentData:null,
        newStudentList:null,
        isInsertingStudent:null,
        loadingPrecentage:0,
        adminRegSts:null,
        updatedStudent:null,
    },
    getters:{
        studentList(state){
            return state.studentList

        },
        studentData(state){
            return state.studentData

        },
        newStudentList(state){
            return state.newStudentList
        },
        isInsertingStudent(state){
            return state.isInsertingStudent
        },
        loadingPrecentage(state){
            return state.loadingPrecentage
        },
        adminRegSts(state){
            return state.adminRegSts
        }
    },
    mutations:{
        SET_STUDENTLIST(state,data){
            state.studentList = data.data;

        },
        SET_STUDENTDATA(state,data){
            state.studentData = data.data;

        },
        SET_NEWSTUDENTLIST(state,data){
            state.newStudentList = data;
        },
        SET_STUDENTSTS(state,data){
            state.isInsertingStudent = data;
        },
        SET_LOADINGPERCENTAGE(state,data){
            state.loadingPrecentage = data;
        },
        SET_ADMINREGSTS(state,data){
            state.adminRegSts = data;

        },
        SET_UPDATEDSTUDENT(state,data){
            state.updatedStudent =data;
        }
        
        
    },
    actions:{
        async getStudentList  ({dispatch}){
            let response = await 
            axios.get('/users/',{ 
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
        return dispatch('studentListCommit', response.data)



        },
        studentListCommit({commit},data){
            return commit('SET_STUDENTLIST',data)
        },
        async getStudentDataById({commit},data){
            let response = await 
            axios.get('/users/'+data,{ 
                headers:{'Authorization':'Bearer ' +auth.state.token }
             })
             .then(function (response) {
                 if(response.data.success ==0){
                    throw "invalid Token";
                 }
                 return response;
              })
              .catch(function (response,error) {
                  console.log(response);
                   throw error;
              });
        return commit('SET_STUDENTDATA', response.data)
        },
        newStudent({commit,dispatch},data){
            commit('SET_NEWSTUDENTLIST',data)
            dispatch("setProgressNull");

        },
        async updateStudent({ dispatch }, data) {
            try {
        
                // 1. 取得原始學生資料
                const originalDataResponse = await axios.get(`/users/${data.studentid}`, {
                    headers: { 'Authorization': 'Bearer ' + auth.state.token }
                });
                const originalData = originalDataResponse.data?.data || null; 
        
                // 2. 執行更新操作
                let response = await axios.patch('/users/', data, { 
                    headers: { 'Authorization': 'Bearer ' + auth.state.token },
                });
        
                // 3. 確保資料更新後重新加載
                await dispatch("getStudentDataById", data.studentid);
        
                // 4. 獲取客戶端 IP
                const clientIp = await dispatch('auth/getClientIp', null, { root: true });
        
                // 5. 構建 LOG 資料
                const logData = {
                    logType: 'edit_student',
                    userId: auth.state.userId,
                    studentId: data.studentid,
                    ipAddress: clientIp,
                    deviceInfo: navigator.userAgent,
                    previousData: originalData, // 修改前的資料
                    updatedData: data           // 修改後的資料
                };
        
                // 6. 傳送 LOG
                await log.createLog(logData, auth.state.token);
        
                return response.status;
            } catch (error) {
                console.error("更新學生資料時出錯:", error.response || error.message);
                throw error; // 繼續拋出錯誤供其他部分處理
            }
        },
        setNewStudentNull({commit,dispatch}){
            commit('SET_NEWSTUDENTLIST',null)
            dispatch("setProgressNull");
        },
        async insertStudentasList({dispatch},data){
            dispatch("progressBarPrecent")
            dispatch("isInsertingStudent",true)
            await axios.post('/users/',data,{ 
                headers:{'Authorization':'Bearer ' +auth.state.token },
             },)
             .then(function (response) {
                 dispatch("newStudent",response.data)
                 return response.status;
              })
              .catch(function (error) {
                   throw error;
              })    
              .finally( function(){
                dispatch("isInsertingStudent",false);

              });
              
        },
       
        isInsertingStudent({commit},data){
            commit("SET_STUDENTSTS",data)
            
        },
        progressBarPrecent({commit,state}){
            let timerId, percent=0;
            timerId = setInterval(function() {

                // increment progress bar
                percent += 20;
                commit("SET_LOADINGPERCENTAGE",percent)
                // complete
                if (percent >= 100 || state.isInsertingStudent== false ) {
                  clearInterval(timerId);
                    percent = 100;
                    commit("SET_LOADINGPERCENTAGE",percent)
                }   
            
              }, 200);
        },
        setProgressNull({commit}){
            commit("SET_LOADINGPERCENTAGE",0)
        },
        
       
        
    },
    modules:{
        auth
    }
}
export default  student