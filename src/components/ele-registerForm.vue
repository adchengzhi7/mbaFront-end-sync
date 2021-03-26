<template>
    <div class="partTop">
       <div class="row mt-5 mb-4">
         <div class="col align-self-center">
              <div class="align-self-center" v-if="isTA">
                <h3 class="pointer hover" @click="$router.go(-1)">
                    <i class="fas fa-arrow-left icon-clickable"></i>
                </h3>
            </div>
         </div>
         <div class="col-8 align-self-center">
             
           <div class="d-flex">
            
             <div class="align-self-center">
               <img v-if="icon == 'global' " class="img-fluid" src="../assets/icon/global.svg" alt="">
               <img v-if="icon == 'intern' " class="img-fluid" src="../assets/icon/intern.svg" alt="">
               <img v-if="icon == 'confrence' " class="img-fluid" src="../assets/icon/confrence.svg" alt="">
               <img v-if="icon == 'competition' " class="img-fluid" src="../assets/icon/competition.svg" alt="">
               <img v-if="icon == 'volunteer' " class="img-fluid" src="../assets/icon/volunteer.svg" alt="">
               <img v-if="icon == 'caseStudy' " class="img-fluid" src="../assets/icon/caseStudy.svg" alt="">
               <img v-if="icon == 'english' " class="img-fluid" src="../assets/icon/english.svg" alt="">
             </div>
             <div class="text-left align-self-center">
               <h3 class="font-weight-boldest m-0   ">{{title}}</h3>
               <div class="text-muted">請輸入完整的單位名稱</div>
             </div>
           </div>
          
          
         </div>
         <div class="col"></div>
         

       </div>
       <div class="row">
           <div class="col"></div>
           <div class="col-8">
               <form v-if="type != 'english'" class="text-left needs-validation" v-on:submit.prevent="submit"> 
                  <div class="row">
                      <div class="col input-col">
                          <select class="form-control" name="" id="" v-model="yearSelected">
                            <option value="none" class="select-default"  disabled >選擇學年</option>
                            <option :key="'year'+year" v-for="year in getYear" :value="year"> {{year}} 學年</option>
                          </select>
                          <div class="invalid-feedback">
                            Please choose a username.
                          </div>
                      </div>
                      <div class="col input-col">
                          <select class="form-control" name="" id="" v-model="semesterSelected"  :class="{'is-invalid':isSelectedNull && selectedBlured ,'is-valid':!isSelectedNull &&selectedBlured }" @blur="selectedBlured = true">
                            <option value="none" class=" select-default" disabled  >選擇學期</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                          <div class="invalid-feedback">
                            請選擇選擇學期
                          </div>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col input-col">
                    <input class="form-control" :class="{'is-invalid':isSectionNull && sectionBlured,'is-valid':!isSectionNull &&sectionBlured }" @blur="sectionBlured = true" type="text" v-model="sectionTitle" placeholder="請輸入完整單位名稱" >
                          <div class="invalid-feedback">
                            請輸入完整的單位名稱
                          </div>
                    </div>
                  </div>
                  
                  <div class="row" v-if="isTA">
                    <div class="col input-col">
                        <div class="input-group ">
                          <div class="input-group-append">
                            <button class="btn btn-secondary" type="button" @click="minusPoints" >
                              <i class="fas fa-minus"></i>
                            </button>
                          </div>
                          <input class="form-control" type="number" max="2"  v-model="checkPoint"  >
                          <div class="input-group-append">
                            
                            <button class="btn btn-secondary " type="button" @click="addPoints" >
                              <i class="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-success btn-lg success " @click="submit">提交申請</button>
                  </div>
              </form>

          <div v-else class="text-left">
            <div class="row">
                <div class="col input-col">
                    <select class="form-control" name="" id="" v-model="englishSelected" :class="{'is-invalid':isEnglishSelectedNull && englishSelectedBlured,'is-valid':!isEnglishSelectedNull &&englishSelectedBlured }" @blur="englishSelectedBlured = true">
                      <option value="none" disabled  >選擇英語檢定類別</option>
                      <option :key="'test-'+test" v-for="test in englishTest" :value="test"> {{test}} </option>
                    </select>
                </div>
                
            </div>
            <div class="row">
              <div class="col input-col">
                <input class="form-control" type="number" v-model="englishPoint" :class="{'is-invalid':isEnglishPointNull && englishPointBlured,'is-valid':!isEnglishPointNull &&englishPointBlured }" @blur="englishPointBlured = true"  placeholder="輸入英語檢定分數">
              </div>
              <div class="invalid-feedback">請輸入英語檢定分數 </div>
            </div>
            
            <div class="mt-3">
              <button class="btn btn-success btn-lg success " @click="submitEnglish">提交申請</button>
            </div>
          </div>
           </div>
           <div class="col"></div>
       </div>
     </div>
</template>
<script>
export default {

  props:["isTA","userData"],
  mounted() {
    let vm =this;
    if(!vm.$route.params.type && !vm.isTA){
      vm.$router.push({ name: 'StudentReg' })
    }else if(!vm.$route.params.type && vm.isTA) {
         vm.$router.push({ name: 'TaReg' })
    }
    vm.title =vm.$route.params.title;
    vm.icon = vm.$route.params.icon;
    vm.type= vm.$route.params.type;


  },
  
data() {
    return {
      title:"",
      sectionBlured:false,
      selectedBlured:false,
      valid:false,
      icon:"",
      type:"",
      sectionTitle:'',
      yearSelected:"",
      points:1,
      semesterSelected:"none",
      englishPoint:"",
      englishSelected:"none",
      englishTest:["TOEFL PBT","TOEFL CBT","TOEFL IBT","IELTS","TOEIC"],
      englishPointBlured:false,
      englishSelectedBlured:false,
      studentDoneMessage:'請靜待辦公室助教完成審核作業！',
      taDoneMessage:'請前往完成審核作業！',
     
      
    }
  },
  computed:{
    isSectionNull(){
      let vm = this;
      if(vm.sectionTitle == "" || vm.sectionTitle == null ){ return true}
      else{return false}
    },
    isSelectedNull(){
      let vm = this;
      if(vm.semesterSelected == "none" || vm.semesterSelected == null ){ return true}
      else{return false}
    },
    isEnglishPointNull(){
      let vm = this;
      if(vm.englishPoint == "none" || vm.englishPoint == null || vm.englishPoint == 0 ){ return true}
      else{return false}
    },
    isEnglishSelectedNull(){
      let vm = this;
      if(vm.englishSelected == "none" || vm.englishSelected == null || vm.englishSelected == ""){ return true}
      else{return false}
    },
    imageUrl(){
      let vm = this;
      return "../assets/icon/"+vm.icon+".svg"
    },
     checkPoint:{
       get() {
           let vm =this;
           if(vm.points >2){
             const error=">2";
             alert(error)
        }
            return vm.points
            
       },
       set(newValue){
        let vm =this;
        if(newValue >2){
           vm.points=2;
        }
        
       }
    
     
    },
    getYear(){
      let vm =this;
      const date = new Date();
      const year = date.getFullYear();
      const mingYear = year -1911;
      vm.yearSelected = mingYear;
      const yearStart=mingYear -5;
      const yearEnd=mingYear +5 ;
      const yearList=[];
      for (let i = yearStart; i < yearEnd; i++) {
          yearList.push(i)
      }
      return yearList
      
      
    }
  },
  methods: {
      async showAlert(routeName,msg) {
        let vm =this;
        
        await vm.$swal({
          title: '<h2 class="font-weight-boldest m-0">已成功提交！</h2>',
          html: '<div class="small  text-muted"> '+ msg +' </div>',
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false,
          timer:5000
          }),
        await vm.$router.push({ name: routeName  })
      },
     validate(){
       let vm =this;
       vm.selectedBlured =true;
       vm.sectionBlured =true;
         if(vm.checkInputStatus(vm.semesterSelected) && vm.checkInputStatus(vm.sectionTitle)  ){
         vm.valid = true
       }
       
     },
     validateEnglish(){
       let vm =this;
       vm.englishPointBlured =true;
       vm.englishSelectedBlured =true;
         if(vm.checkInputStatus(vm.englishPoint) && vm.checkInputStatus(vm.englishSelected)  ){
         vm.valid = true
       }
       
     },
     checkInputStatus : function(email) {
        if(email == "" || email == null  || email=="none" || email==0){ return false}
        else{return true}
    },
    
    submit(){
      
      let vm =this;
      const sectionTitle = this.sectionTitle;
      const yearSelected = this.yearSelected;
      const points = this.points;
      const semesterSelected = this.semesterSelected;
      const type =vm.$route.params.type;
      vm.validate();
      if(vm.valid){
        console.log(sectionTitle,yearSelected,points,semesterSelected,type);
        if(!vm.isTA){
            vm.showAlert("StudentDash",vm.studentDoneMessage)
          }else {
            vm.showAlert("TaDash",vm.taDoneMessage)
          }
      }
      
      

    },

    submitEnglish(){
      let vm =this;
      const englishPoint = this.englishPoint;
      const englishSelected = this.englishSelected;
      const type =vm.$route.params.type;
       vm.validateEnglish();
      if(vm.valid){
        console.log(englishSelected,englishPoint,type);
         if(!vm.isTA){
            vm.showAlert("StudentDash",vm.studentDoneMessage)
          }else {
            vm.showAlert("TaDash",vm.taDoneMessage)
          }
      }

    },
    addPoints(){
      let vm =this;
      if(vm.points >=2){vm.points=2}
      else{vm.points =  vm.points+1}
     
    },
    minusPoints(){
      let vm =this;
      if(vm.points === 0){vm.points=0}
      else{vm.points =  vm.points-1}
    }
    
  },

}
</script>
<style scoped>
.input-col{
  margin-bottom:20px
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("../assets/icon/arrowDown.svg");
  background-repeat: no-repeat;
  background-position-x: 97%;
  background-position-y: 50%;
  border-radius: 2px;
  padding: 1rem;
  font-weight: 700;
    font-size: 18px;
}
::placeholder {
  font-weight: 700;
   color:var(--disableColor)
}
.select-default {
  font-weight: 700 !important;
   color:var(--disableColor) !important;
}
option:first-of-type {
   color:var(--disableColor)
}
.form-control.is-invalid, .was-validated .form-control:invalid {
    border: 1px solid rgba(245,81,52,0.5) !important; 
     box-shadow: 0 5px 10px rgba(245,81,52,0.05) ,
      0 15px 40px rgba(245,81,52,0.15)  !important;
    }
.form-control.is-valid, .was-validated .form-control:valid {
   border: 1px solid rgba(56, 178, 105,0.5) !important; 
     box-shadow: 0 5px 10px rgba(56, 178, 105,0.05) ,
      0 15px 40px rgba(56, 178, 105,0.15)  !important;

}

</style>>