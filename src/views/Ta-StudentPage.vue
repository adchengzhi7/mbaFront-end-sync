<template>
  <div > 
     <student-page :key="ConfirmGetUserId" :userData="userData" :isTA="isTA" :userPoints="userPoints"></student-page>
  </div>
</template>

<script>
import studentPage from "../components/tmp-studentPage"
import {mapActions, mapGetters} from 'vuex'

export default {

  components:{
    studentPage,
  },

  mounted() {
    let vm =this;
    try{
     
      vm.getStudentDataById(vm.$route.query.stuId);
    }catch(e){
      console.log(e);
    }
    
  },
  computed:{
    ...mapGetters({
      user:'auth/user',
      userPoints:'userPoint/userPoints',
      studentData:'student/studentData'

      
    }),
     isTA(){
       if(this.$store.state.auth.userType == 0) return false
       else return true
     },
     ConfirmGetUserId(){
      if(this.$route.query.stuId){
           return this.getPointsData(this.$route.query.stuId)
          }
            return null
     },
     userData(){ 
       let vm =this;
      let userData ={
         stuId : vm.$route.query.stuId,
         name : null,
       } 
      if(vm.$store.state.student.studentData){
        
        userData.name = vm.studentData.cName
      }
       
       return userData

     }
     
  },
  
  methods: {
     ...mapActions({
       getUserPoint:'userPoint/getUserPoint',
      signOutAction:'auth/signOut',
      getStudentDataById:"student/getStudentDataById"

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
data() {
    return {
       
      
   
      
    }
  },

}
</script>
<style scoped>



</style>>
