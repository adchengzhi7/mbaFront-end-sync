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
        }
        
        
        
    },
    actions:{
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
                  console.log(response);
                   throw error;
              });
         dispatch('getUserPointCommit', response.data)



        },
        getUserPointCommit({commit},data){
            return commit('SET_USERPOINTS',data)
        },
        async insertUserPoint({dispatch},credentials){
            let response = await axios.post('/points/',credentials,{
                    headers:{'Authorization':'Bearer ' +auth.state.token }
            }).then(
                dispatch('getUserPoint', credentials.stuId)
            )
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
        return dispatch('getPointByPointIdCommit', response.data)

        },
        getPointByPointIdCommit({commit},data){
            return commit('SET_GETBYIDPOINT',data)
        },
        async updatePointByPointId({dispatch},data){
        let response = await axios.patch('/points/edit/',data,{
            headers:{'Authorization':'Bearer ' +auth.state.token }
            })
            dispatch('updateStsCommit', true)
            return response;
        },
        updateStsCommit({commit},data){
           commit('SET_UPDATESTS',data)
        },
        async approvePointId({dispatch},data){
            console.log(data);
            let response = await axios.patch('/points/approve/',data,{
                headers:{'Authorization':'Bearer ' +auth.state.token }
                })
                dispatch('getUserPoint', data.stuId)
                dispatch('getUnreviewPoint')
                return response;
        },
        async deletePointId({dispatch},data){
            console.log(data);
            let response = await axios.patch('/points/delete/',data,{
                headers:{'Authorization':'Bearer ' +auth.state.token }
                })
                dispatch('getUserPoint', data.stuId)
                dispatch('getUnreviewPoint')
                return response;
        },
        
    },
    modules:{
        auth
    }
}
export default  points