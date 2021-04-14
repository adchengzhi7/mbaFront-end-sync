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
        async insertStudentasList({dispatch},data){
            dispatch("progressBarPrecent")
            dispatch("isInsertingStudent",true)
            await axios.post('/users/',data,{ 
                headers:{'Authorization':'Bearer ' +auth.state.token },
             },)
             .then(function (response) {
                 dispatch("newStudent",response.data)
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