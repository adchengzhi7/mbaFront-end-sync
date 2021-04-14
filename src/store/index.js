import {createStore } from 'vuex'
import auth from './auth'
import points from './points'
import student from './student'

export default createStore({
    state:{
        currentRegPointUser:null,
        windowWidth:null,

    },
    getters:{
        currentRegPointUser(state){
            return state.currentRegPointUser
        },
        windowWidth(state){
            return state.windowWidth
        }
    },
    mutations:{
        SET_CURRENTREGPOINTUSER(state,payload){
            state.currentRegPointUser = payload;
        },
        SET_WINDOWWIDTH(state,payload){
            state.windowWidth = payload;
        }
        
    },
    actions:{
        regStudentIs({commit},data){
            commit('SET_CURRENTREGPOINTUSER',data)
        },
        getWidth({commit}){
            let width = window.innerWidth;
            commit("SET_WINDOWWIDTH",width)
        }
    },
    modules:{
        userPoint:points,
        auth:auth,
        student:student,
    }
})