<template>
  <div > 
     <student-page :key="ConfirmGetUserId" :userData="userData" :isTA="isTA" :isSub="isSub" :userPoints="userPoints"></student-page>
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
         type: null,
       } 
      if(vm.$store.state.student.studentData){
        
        userData.name = vm.studentData.cName
        userData.type = vm.studentData.type
        userData.pId = vm.studentData.psId
        userData.email= vm.studentData.email
        
        
      }
       
       return userData

     },
     isSub() {
      let vm = this;
      // 確認 studentData 存在並檢查 type 是否為 -1
      if (vm.$store.state.student.studentData && vm.$store.state.student.studentData.type === -1) {
        return true;
      } else {
        return false;
      }
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



</style>
