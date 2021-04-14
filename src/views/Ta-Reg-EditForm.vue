<template>
  <div > 
    <register-form :isTA="isTA" :currentRegPointUser="currentRegPointUser" :pointType="pointType" :pointData="pointData" :sycnDataToComp="sycnDataToComp" ></register-form>
  </div>
</template>

<script>
  import registerForm from '../components/ele-registerForm'
import {mapGetters,mapActions} from 'vuex'

export default {

  components:{
    registerForm
  },
  computed:{
    ...mapGetters({
          currentRegPointUser:'currentRegPointUser',
          pointById:'userPoint/pointById'
        }),
        sycnDataToComp(){
        let vm = this;
        if(vm.pointById){
        vm.pointType.title =vm.$store.state.userPoint.pointById.section;
        vm.pointType.icon = vm.$store.state.userPoint.pointById.icon;
        vm.pointType.type= vm.$store.state.userPoint.pointById.type;

        vm.pointData.sectionTitle= vm.$store.state.userPoint.pointById.sectionTitle;
        vm.pointData.yearSelected= vm.$store.state.userPoint.pointById.yearSelected;
        vm.pointData.points= vm.$store.state.userPoint.pointById.point;
        vm.pointData.semesterSelected= vm.$store.state.userPoint.pointById.semesterSelected;
        vm.pointData.type= vm.$store.state.userPoint.pointById.type;
        vm.pointData.status= vm.$store.state.userPoint.pointById.status;
        vm.pointData.stuId= vm.$store.state.userPoint.pointById.stuId;
        vm.pointData.englishCredit= vm.$store.state.userPoint.pointById.englishCredit;
        vm.pointData.pointId= vm.$store.state.userPoint.pointById.pointId;
        return true
      }
        return false



      }
    },
   mounted() {
      let vm =this;
      let pointsId = vm.$route.query.pointsId;
      if(!vm.currentRegPointUser && vm.isTA){
        vm.$router.push({ name: 'TaDash' })
      }
      if(!vm.currentRegPointUser && !vm.isTA){
        vm.$router.push({ name: 'StudentDash' })
      }
      if(pointsId){
        vm.getPointByPointId(pointsId);
      }
     
      

    },
    methods: {
    ...mapActions({
      getPointByPointId:'userPoint/getPointByPointId',
    }),
     
    },
  
data() {
    return {
      pointType:{
        title:"",
        icon:"",
        type:"",
      },
      pointData:{
        sectionTitle:null,
        yearSelected : null,
        points : null,
        semesterSelected : null,
        type :null,
        status : null,
        stuId : null,
        englishCredit: null,
        pointId:null
      },
      isTA:true,
      
    }
  },
  

}
</script>
<style scoped>

</style>>
