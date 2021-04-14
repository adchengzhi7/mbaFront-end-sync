<template>
  <div > 
    <register-form :isTA="isTA" :currentRegPointUser="currentRegPointUser" :pointType="pointType"  ></register-form>
  </div>
</template>

<script>
  import registerForm from '../components/ele-registerForm'
import {mapGetters} from 'vuex'

export default {

  components:{
    registerForm
  },
  computed:{
    ...mapGetters({
          currentRegPointUser:'currentRegPointUser'
        }),
    },
   mounted() {
      let vm =this;
      if(!vm.currentRegPointUser && vm.isTA){
        vm.$router.push({ name: 'TaDash' })
      }
      if(!vm.currentRegPointUser && !vm.isTA){
        vm.$router.push({ name: 'StudentDash' })
      }
      if(!vm.$route.params.type && !vm.isTA){
      vm.$router.push({ name: 'StudentReg' })
      }
      if(!vm.$route.params.type && vm.isTA) {
          vm.$router.push({ name: 'TaReg' })
      }
      vm.pointType.title =vm.$route.params.title;
      vm.pointType.icon = vm.$route.params.icon;
      vm.pointType.type= vm.$route.params.type;

    },
  
data() {
    return {
      pointType:{
        title:"",
        icon:"",
        type:"",
      },
      isTA:true,
      
    }
  },
  

}
</script>
<style scoped>

</style>>
