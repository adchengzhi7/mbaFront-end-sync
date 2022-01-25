import axios from 'axios'
import jwt_decode from "jwt-decode";
export default {
    namespaced:true,
    state:{
        token:null,
        user:null,
        invalidUserMsg:null,
        userType:null,
        userId:null,
        isInvalidToken:null,
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
        },
        SET_invalidUserMsg(state,data){
            state.invalidUserMsg = data
        },
        SET_ISINVALIDTOKEN(state,data){
            state.isInvalidToken =data;
        }
    },
    actions:{
        async signIn ({dispatch},credentials){
            let response = await axios.post('/users/login',credentials)
            dispatch('errorMsg',response.data)
            return dispatch('attempt', response.data.token)
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
        async checkTokenInvalid({commit},state){
            await axios.get('/users/check',{ 
                headers:{'Authorization':'Bearer ' + state.token }
             })
            .then((res)=> {
                commit('SET_ISINVALIDTOKEN',false)
                console.log(res);
            })
            .catch((error)=>{
                commit('SET_ISINVALIDTOKEN',true)
                console.log(error);
            })
        }
        
    },
    modules:{
    }
}