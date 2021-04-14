<template>
  <div > 
     <student-page :key="ConfirmGetUserId" :isTA="isTA" :userData="userData" :userPoints="userPoints" ></student-page>
  
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
       if(this.$store.state.auth.userType == 0){
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
      },
    }
  },

}
</script>
<style scoped>



</style>>
