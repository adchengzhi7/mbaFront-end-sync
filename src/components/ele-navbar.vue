<template >
<nav class="navbar  fixed-top navbar-expand-lg navbar-light bg-light bg-shadow">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img class="img-fluid" src="../assets/mba-logo.png" width="30" height="30" alt="">
       <router-link :to="{ name: 'Home' }">
      <span class="ms-2 me-2 theme">特色學習登錄</span>
      </router-link>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
     <ul class="navbar-nav me-auto mb-2 mb-lg-0 "></ul>
     <div class="d-flex">
       <avatar class="me-1 ms-1" :image="avatar" size="default" :api="avatarImg" ></avatar>
       
       <ul class="navbar-nav me-2">
       <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{user}}
            </a>
            <div class="dropdown-menu dropdown-menu-start dropdown-menu-lg-end " aria-labelledby="navbarScrollingDropdown">
              <a class="dropdown-item" href="#" @click.prevent="signOut">登出</a>
            </div>
          </li>
      
      </ul>
     </div>

    </div>
  </div>
</nav>


</template>
<script>
import avatar from "./ele-avatar"
  import {mapGetters,mapActions} from 'vuex'

export default {
  data() {
    return {
      // avatarImg:"https://avatars.dicebear.com/v2/male/c99f18efa2fbc33e0090345423012607.svg"
    }
  },
  components:{
    avatar
  },
  methods: {
    ...mapActions({
      signOutAction:'auth/signOut',
      checkTokenInvalid:'auth/checkTokenInvalid',
      avatarImg:'avatarImg'
    }),
    signOut(){
        this.signOutAction().then(() =>{
          this.$router.replace({
            name:"Home"
          })
        })
    },
    async checkIsLogin(){
      let vm = this;
      await vm.checkTokenInvalid().then( ()=>{
        if(vm.isInvalidToken == true){
          vm.signOutAction()
        }

      }
      )
    },
   
  },
  computed:{
    ...mapGetters({
      authenticated:'auth/authenticated',
      user:'auth/user',
      userId:'auth/userId',
      isInvalidToken:'auth/isInvalidToken',
      avatar:'avatar'
    }),
    
  },
  mounted() {
    this.checkIsLogin()
    this.avatarImg({id:this.user,type:"loginUser"})
  },
}
</script>
<style scoped>
.bg-shadow {
    box-shadow: 0 5px 10px rgba(154,160,185,0.05), 0 15px 40px rgba(166,173,201,0.2);
}
.theme{
    color: #38b269;
  font-weight: 900;
}
a {
    text-decoration: none;
}
.dropdown-menu > a:hover, .dropdown-menu > a:focus {
   background-color:var(--hoverBgColor)
}

</style>