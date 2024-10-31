import {createStore } from 'vuex'
import auth from './auth'
import points from './points'
import student from './student'
import log from './log';

export default createStore({
    state:{
        currentRegPointUser:null,
        windowWidth:null,
        avatar:null,
        avatarViewer:null,

    },
    getters:{
        currentRegPointUser(state){
            return state.currentRegPointUser
        },
        windowWidth(state){
            return state.windowWidth
        },
        avatar(state){
            return state.avatar
        },
        avatarViewer(state){
            return state.avatarViewer
        }
    },
    mutations:{
        SET_CURRENTREGPOINTUSER(state,payload){
            state.currentRegPointUser = payload;
        },
        SET_WINDOWWIDTH(state,payload){
            state.windowWidth = payload;
        },
        SET_AVATAR(state,payload){
            state.avatar = payload;
        },
        SET_AVATARVIEWER(state,payload){
            state.avatarViewer = payload;
        }
        
        
    },
    actions:{
        regStudentIs({commit},data){
            commit('SET_CURRENTREGPOINTUSER',data)
        },
        getWidth({commit}){
            let width = window.innerWidth;
            commit("SET_WINDOWWIDTH",width)
        },
        avatarImg({commit},data){
            let lastTwoChars = data.id.slice(-2);
            let api = " https://api.dicebear.com/9.x/initials/svg?seed="+lastTwoChars;
            if(data.type == "loginUser"){
                commit("SET_AVATAR",api)
            }else{
                commit("SET_AVATARVIEWER",api)
                
            }
          }
    },
    modules:{
        userPoint:points,
        auth:auth,
        student:student,
        log:log
    }
})