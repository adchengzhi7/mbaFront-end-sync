<template>
    <div class="partTop">
       <div class="row m-0 mt-3 mb-2  mt-md-5 mb-md-4">
         <div class="col d-none d-sm-block d-xl-block align-self-center">
              <div class="align-self-center" v-if="isTA" :isEdit="editDataByUser">
                <h3 class="pointer hover" @click="$router.go(-1)">
                    <i class="fas fa-arrow-left icon-clickable"></i>
                </h3>
            </div>
         </div>
         <div class="col-12 col-xl-9 col-md-9  col-sm-10 col-xs-12 align-self-center">
             
           <div class="d-flex">
            
             <div class="align-self-center">
               <img v-if="pointType.icon == 'global' " class="img-fluid" src="../assets/icon/global.svg" alt="">
               <img v-if="pointType.icon == 'intern' " class="img-fluid" src="../assets/icon/intern.svg" alt="">
               <img v-if="pointType.icon == 'confrence' " class="img-fluid" src="../assets/icon/confrence.svg" alt="">
               <img v-if="pointType.icon == 'competition' " class="img-fluid" src="../assets/icon/competition.svg" alt="">
               <img v-if="pointType.icon == 'volunteer' " class="img-fluid" src="../assets/icon/volunteer.svg" alt="">
               <img v-if="pointType.icon == 'caseStudy' " class="img-fluid" src="../assets/icon/caseStudy.svg" alt="">
               <img v-if="pointType.icon == 'english' " class="img-fluid" src="../assets/icon/english.svg" alt="">
             </div>
             <div class="text-start align-self-center">
               <h3 v-if="pointType" class="font-weight-boldest m-0   ">{{pointType.title}}</h3>
               <div class="text-muted">請輸入完整的單位名稱</div>
             </div>
           </div>
          
          
         </div>
         <div class="col d-none d-sm-block d-xl-block"></div>
         

       </div>
       <div class="row m-0">
           <div class="col d-none d-sm-block d-xl-block"></div>
           <div class=" col-12 col-xl-9 col-md-9  col-sm-10 col-xs-12">
               <form v-if="pointType.type != 7 " class="text-start needs-validation" v-on:submit.prevent="submit"> 
                  <div class="row m-0">
                       <div class="text-muted mb-3 h6 text-start" >
                        學號： {{currentRegPointUser}}
                      </div>
                      <div class="col input-col">
                          <select class="form-control" name="" id="year" v-model="yearSelected">
                            <option value="none" class="select-default" id="0" disabled >選擇學年</option>
                            <option :id="'year'+year" :key="'year'+year" v-for="year in getYear" :value="year"> {{year}} 學年</option>
                          </select>
                          <div class="invalid-feedback">
                            請選擇選擇學年
                          </div>
                      </div>
                      <div class="col input-col">
                          <select class="form-control" name="" id="semester" v-model="semesterSelected"  :class="{'is-invalid':isSelectedNull && selectedBlured ,'is-valid':!isSelectedNull &&selectedBlured }" @blur="selectedBlured = true">
                            <option id="semester0"  value="none" class=" select-default" disabled  >選擇學期</option>
                            <option id="semester1"  value="1">1</option>
                            <option id="semester2" value="2">2</option>
                          </select>
                          <div class="invalid-feedback">
                            請選擇選擇學期
                          </div>
                      </div>
                  </div>
                  <div class="row m-0">
                    <div class="col input-col">
                    <input class="form-control" :class="{'is-invalid':isSectionNull && sectionBlured,'is-valid':!isSectionNull &&sectionBlured }" @blur="sectionBlured = true" type="text" v-model="sectionTitle" placeholder="請輸入完整單位名稱" >
                          <div class="invalid-feedback">
                            請輸入完整的單位名稱
                          </div>
                    </div>
                  </div>
                  
                  <div class="row m-0" >
                    <div class="col input-col" v-if="isTA">
                      
                        <div class="input-group ">
                            <button class="btn btn-secondary" type="button" @click="minusPoints" >
                              <i class="fas fa-minus"></i>
                            </button>
                            <input class="form-control" :class="{'is-invalid':isNumberTooLarge && numberBlured,'is-valid':!isNumberTooLarge &&numberBlured }" @blur="numberBlured = true" type="number" max="2"  v-model="checkPoint"  >
                            <button class="btn btn-secondary " type="button" @click="addPoints" >
                              <i class="fas fa-plus"></i>
                            </button>
                        </div>
                         <div class="invalid-feedback">
                            點數不可大於2
                          </div>
                    </div>
                    <div class="mt-3" :class="{'d-grid gap-2':isDisplaySmall==true}">
                      <button v-if="!isEdit" class="btn btn-success btn-lg success " >提交申請</button>
                      <button v-else class="btn btn-success btn-lg success " >保存變更</button>
                    </div>
                  </div>
              </form>

              <div v-else class="text-start">
                <div class="row m-0">
                    <div class="text-muted mb-3 h6 text-start" >
                      學號： {{currentRegPointUser}}
                    </div>
                    <div class="col input-col">
                        <select class="form-control" name="" id="" v-model="englishSelected" :class="{'is-invalid':isEnglishSelectedNull && englishSelectedBlured,'is-valid':!isEnglishSelectedNull &&englishSelectedBlured }" @blur="englishSelectedBlured = true">
                          <option value="none" disabled  >選擇英語檢定類別</option>
                          <option :key="'test-'+test" v-for="test in englishTest" :value="test"> {{test}} </option>
                        </select>
                    </div>
                    
                </div>
                <div class="row m-0">
                  <div class="col input-col">
                    <input class="form-control" type="number" v-model="englishPoint" :class="{'is-invalid':isEnglishPointNull && englishPointBlured,'is-valid':!isEnglishPointNull &&englishPointBlured }" @blur="englishPointBlured = true"  placeholder="輸入英語檢定分數">
                  </div>
                  <div class="invalid-feedback">請輸入英語檢定分數 </div>
                  <div class="mt-3" :class="{'d-grid gap-2':isDisplaySmall==true}">
                    <button v-if="!isEdit" class="btn btn-success btn-lg success " @click="submitEnglish">提交申請</button>
                    <button v-else class="btn btn-success btn-lg success " @click="submitEnglish">保存變更</button>
                  </div>
                </div>
                
              </div>
           </div>
           <div class="col d-none d-sm-block d-xl-block"></div>
       </div>
     </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {

  props:["isTA","currentRegPointUser","pointType","pointData"],
  data() {
      return {
        title:"",
        stuId:"",
        sectionBlured:false,
        selectedBlured:false,
        numberBlured:false,
        valid:false,
        icon:"",
        type:"",
        sectionTitle:'',
        yearSelected:"",
        points:1,
        status:1,
        semesterSelected:"none",
        englishPoint:"",
        englishSelected:"none",
        englishTest:["TOEFL PBT","TOEFL CBT","TOEFL IBT","IELTS","TOEIC"],
        englishPointBlured:false,
        englishSelectedBlured:false,
        studentDoneMessage:'請靜待辦公室助教完成審核作業！',
        taDoneMessage:'請前往完成審核作業！',
        editMessage:'資料已更新成功',
        isEdit:false,
      
        
      }
    },
  mounted() {
  },
  computed:{
     ...mapGetters({
        windowWidth:'windowWidth'
    }),
    isDisplaySmall() {
        let vm = this;
        vm.getWidth();
        if (vm.windowWidth > 768) {
            return false;
        } else {
            return true;
        }
    },
     editDataByUser(){
        let vm=this;
        if(vm.pointData){
          vm.isEdit = true;
          vm.sectionTitle= vm.pointData.sectionTitle;
          vm.englishSelected= vm.pointData.sectionTitle;
          vm.yearSelected= vm.pointData.yearSelected;
          vm.points= vm.pointData.points;
          vm.semesterSelected= vm.pointData.semesterSelected;
          vm.type= vm.pointData.type;
          vm.status= vm.pointData.status;
          vm.stuId= vm.pointData.stuId;
          vm.englishPoint= vm.pointData.englishCredit;
          return true
        }
        return false
        
      },
    isSectionNull(){
      let vm = this;
      if(vm.sectionTitle == "" || vm.sectionTitle == null ){ return true}
      else{return false}
    },
    isNumberTooLarge(){
      let vm = this;
      if(vm.points>2){ return true}
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
    ...mapActions({
       insertUserPoint:'userPoint/insertUserPoint',
       updatePointByPointId:'userPoint/updatePointByPointId',
       getWidth:'getWidth'

    }),
    currentTime(){
      const date = new Date(+new Date() + 8 * 3600 * 1000)
      const insertTime =  date.toISOString().slice(0, 19).replace('T', ' ');
      return insertTime 
    },
    async showAlert(routeName,msg,id) {
      let param={ name: routeName }
      if(id != null ){
        param={ name: routeName,query:{stuId:id }  }
      }
        let vm =this;
        await vm.$swal({
          title: '<h2 class="font-weight-boldest m-0">已成功提交！</h2>',
          html: '<div class="small  text-muted"> '+ msg +' </div>',
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false,
          timer:5000
          }),
        await vm.$router.replace(param)
      },
     validate(){
       let vm =this;
       vm.selectedBlured =true;
       vm.sectionBlured =true;
       vm.numberBlured =true;
         if(vm.checkInputStatus(vm.semesterSelected) && vm.checkInputStatus(vm.sectionTitle) && vm.checkPointStatus(vm.points)){
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
        if(email == "" || email == null  || email=="none" || email==0 ){ return false}
        else{return true}
    },
    checkPointStatus : function(point) {
        if(point >2){ return false}
        else{return true}
    },
    
    submit(){
      
      let vm =this;
      let insertDate = vm.currentTime();
      const pointList = {
        sectionTitle:vm.sectionTitle,
        yearSelected : vm.yearSelected,
        points : vm.points,
        semesterSelected : vm.semesterSelected,
        type :vm.pointType.type,
        status : vm.status,
        stuId : vm.currentRegPointUser,
        englishCredit: null,
        insertDate:insertDate,
      }
      vm.validate();
      if(vm.valid && !vm.isEdit){
        vm.insertUserPoint(pointList).then((res)=>{
          if(res.data.success == 1){
            if(!vm.isTA){
              vm.showAlert("StudentDash",vm.studentDoneMessage,null)
            }else {
              vm.showAlert("TaStudentPage",vm.taDoneMessage,vm.currentRegPointUser)
            }
          }else{
            alert("unvalid")
          }
        })
      }

      if(vm.valid && vm.isEdit){
        pointList.pointsId = vm.pointData.pointId;
        vm.updatePointByPointId(pointList).then((res)=>{
          if(res.data.success == 1){
            if(!vm.isTA){
              vm.showAlert("StudentDash",vm.editMessage,null)
            }else {
              vm.showAlert("TaStudentPage",vm.taDoneMessage,vm.currentRegPointUser)
            }
          }else{
            alert("unvalid")
          }
        })
      }
      
      

    },

    submitEnglish(){
      let vm =this;
      let insertDate = vm.currentTime();
      const pointList = {
        sectionTitle:vm.englishSelected,
        yearSelected : 0,
        points : 0,
        semesterSelected : 0,
        type :vm.pointType.type,
        status : vm.status,
        stuId : vm.currentRegPointUser,
        englishCredit: vm.englishPoint,
        insertDate:insertDate,

      }
     
       vm.validateEnglish();
       if(vm.valid && !vm.isEdit){
        vm.insertUserPoint(pointList).then((res)=>{
          if(res.data.success == 1){
            if(!vm.isTA){
              vm.showAlert("StudentDash",vm.studentDoneMessage,null)
            }else {
              vm.showAlert("TaStudentPage",vm.taDoneMessage,vm.currentRegPointUser)
            }
          }else{
            //show error modal
          }
        })
      }
       if(vm.valid && vm.isEdit){
        pointList.pointsId = vm.pointData.pointId;
        vm.updatePointByPointId(pointList).then((res)=>{
          console.log(res);
          if(res.data.success == 1){
            if(!vm.isTA){
              vm.showAlert("StudentDash",vm.editMessage,null)
            }else {
              vm.showAlert("TaStudentPage",vm.taDoneMessage,vm.currentRegPointUser)

            }
          }else{
            alert("unvalid")
          }
        })
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
div{
  font-size:14px !important;
}
.form-control{
  font-size:14px !important;
}
h3{
  font-size: 18px !important;
}
.img-fluid {
    max-width: 80%;
    height: auto;
}
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
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  div{
    font-size:14px !important;
  }
  .form-control{
    font-size:14px !important;
  }
  h3{
    font-size: 18px !important;
  }
  .img-fluid {
      max-width: 80%;
      height: auto;
  }
 }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
  div{
    font-size:16px !important;
  }
  .form-control{
    font-size:18px !important;
  }
  h3{
    font-size: 28px !important;
  }
  .img-fluid {
      max-width: 100%;
      height: auto;
  }
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  div{
    font-size:16px !important;
  }
  .form-control{
    font-size:18px !important;
  }
  h3{
    font-size: 28px !important;
  }
  .img-fluid {
      max-width: 100%;
      height: auto;
  }
 }

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  div{
    font-size:16px !important;
  }
  .form-control{
    font-size:18px !important;
  }
  h3{
    font-size: 28px !important;
  }
  .img-fluid {
      max-width: 100%;
      height: auto;
  }
}

</style>>