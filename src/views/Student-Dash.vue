<template>
  <div > 
     <student-page :key="ConfirmGetUserId" :isTA="isTA"  :isSub="isSub" :userData="userData" :userPoints="userPoints" ></student-page>
  
  </div>
</template>

<script>
import studentPage from "../components/tmp-studentPage"
import {mapActions, mapGetters} from 'vuex'

export default {
  
  
computed:{
    ...mapGetters({
      userId:'auth/userId',
      user:'auth/user',
      userPoints:'userPoint/userPoints'

      
    }),
     isTA(){
       if(this.$store.state.auth.userType == 0 || this.$store.state.auth.userType == -1){
          return false
        } else {
          return true
        }
       
     },
     ConfirmGetUserId(){
      if(this.$store.state.auth.userId){
          this.regStudentIs(this.$store.state.auth.userId)
           return this.getPointsData(this.$store.state.auth.userId)

          }
          return null
     },

     isSub() {
      let vm = this;
        if (vm.$store.state.auth.userType === -1) {
        return true;
      } else {
        return false;
      }
    }
     
  },
  components:{
    studentPage,
  },
  methods: {
    ...mapActions({
       getUserPoint:'userPoint/getUserPoint',
        regStudentIs:'regStudentIs',
      signOutAction:'auth/signOut'

    }),
    getPointsData(id){
       let vm = this;
         vm.points = this.getUserPoint(id)
         .catch(function(e){
           vm.signOutAction().then(() =>{
             vm.$router.replace({
               name:"Home"
          })
          })
          console.log(e);
          })
         
    }
  },
   mounted() {
     
     
     
  },
data() {
    return {
      userData:{
        name:this.$store.state.auth.user,
        stuId:this.$store.state.auth.userId,
        email:this.$store.state.auth.userEmail,
        pId:this.$store.state.auth.userPId,
        type:this.$store.state.auth.userType,
      },
    }
  },

}
</script>
<style scoped>



</style>>
