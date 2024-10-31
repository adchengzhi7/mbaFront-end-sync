import axios from 'axios'   
import auth from './auth'

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

        setNewStudentNull({commit,dispatch}){
            commit('SET_NEWSTUDENTLIST',null)
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
                await dispatch('log/createLog', { logData, token: auth.state.token }, { root: true });

        
                return response.status;
            } catch (error) {
                console.error("更新學生資料時出錯:", error.response || error.message);
                throw error; // 繼續拋出錯誤供其他部分處理
            }
        },
        async insertStudentasList({ dispatch, commit }, studentsList) {
            dispatch("progressBarPrecent");
            dispatch("isInsertingStudent", true);
        
            try {
                // 將整個學生列表發送到後端進行批量處理
                const response = await axios.post('/users/', studentsList, {
                    headers: { 'Authorization': 'Bearer ' + auth.state.token },
                });
        
                // 確認所有成功新增的學生資料後進行 log 記錄
                if (response.data) {
                    const updatedStudentList = [];
        
                    for (const studentResponse of response.data) {
                        // 只記錄成功新增的學生
                        if (studentResponse.success === 1) {
                            // 獲取客戶端 IP
                            const clientIp = await dispatch('auth/getClientIp', null, { root: true });
        
                            // 構建 LOG 資料
                            const logData = {
                                logType: 'add_student',
                                userId: auth.state.userId,
                                studentId: studentResponse.studentid,
                                ipAddress: clientIp,
                                deviceInfo: navigator.userAgent,
                                addedData: studentResponse
                            };
        
                            // 傳送 LOG
                            await dispatch('log/createLog', { logData, token: auth.state.token }, { root: true });


                            console.log("成功新增的學生資料已記錄日誌。");
                        } else if (studentResponse.success === 0) {
                            console.error(studentResponse.stsMsg);
                        }
        
                        // 將當前學生資料推入更新列表
                        updatedStudentList.push(studentResponse);
                    }
        
                    // 更新前端顯示列表
                    commit("SET_NEWSTUDENTLIST", updatedStudentList);
                } else {
                    console.warn("未找到有效的新增結果，請檢查 API 回應結構");
                }
        
            } catch (error) {
                console.error("批量新增學生資料時出錯:", error.message || error);
                throw error;
            } finally {
                dispatch("isInsertingStudent", false);
            }
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