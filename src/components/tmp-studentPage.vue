<template>
    <div>
        <div class="partTop">
       <div class="row m-0">
        <div class="col d-none d-sm-block d-xl-block "></div>
        <div class="col-12 col-xl-9 col-md-9  col-sm-10 col-xs-12 row">
            <div class="col-12 col-md-6 cus-dflex" >
                <div class="d-flex  justify-content-center ">
                <avatar :image="img(userData.name)" size="lg"></avatar>
                <div class=" avatar-box">
                    <h4 class="font-weight-bold m-0">{{userData.name}}</h4>
                    <div>{{userData.stuId}}</div>
                    <a class="link-primary" v-if="isTA" @click="updateBox"  >編輯資訊</a>
                </div>
                </div>
            </div>

            <div class="col-12 col-md-6 mt-3 mt-md-0 ">
              <div class="avatar-box p-0 p-md-3 ">
                  <div class="d-flex flex-wrap pb-3 ">
                  <div >已確認點數</div>
                  <div class="ms-auto" >{{totalPoint}}/3</div>
                  </div>
                  <div class="progress">
                  <div class="progress-bar success" role="progressbar" :style="{'width':totalPointToPrecent }" :aria-valuenow="totalPointToPrecent" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
              <div v-if="isSub" class="avatar-box p-0 p-md-3 ">
                  <div class="d-flex flex-wrap pb-3 ">
                  <div >已服務時數</div>
                  <div class="ms-auto" >{{totalHours}}/160</div>
                  </div>
                  <div class="progress">
                  <div class="progress-bar success" role="progressbar" :style="{'width':totalHoursToPrecent }" :aria-valuenow="totalHoursToPrecent" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
            </div>
        </div>
        <div class="col d-none d-sm-block d-xl-block"></div>
       </div>
       
       
       <div v-if="pointsLength == 0" class="row mt-2 mt-md-5 " >
         <div class="col-2"></div>
         <div class="col content-box" >
           <div style="margin:auto">

           <img width="500" class="img-fluid" src="../assets/bro.svg" alt="">
           </div>
         </div>
         <div class="col content-box text-center" >
           <h2 class="font-weight-bold">尚未登錄點數</h2>
           <p>點擊按鈕開始登錄點數吧！</p>
           <button v-if="isTA" class="btn btn-success success" @click="routerTo('TaReg',userData.stuId)"> <i class="fas fa-plus"></i>  登錄點數</button>
           <button v-else class="btn btn-success success" @click="routerTo('StudentReg',userData.stuId)"> <i class="fas fa-plus"></i>  登錄點數</button>
         </div>
         <div class="col-2"></div>


       </div>
       <div v-else class="row m-0 mt-5">
         <div class="d-none col d-md-block d-xl-block"></div>
         <div class="p-0 p-sm-3 col-12 col-xl-9 col-md-9 overflow-auto ">

         <tables :isTA="isTA" :stuId="userData.stuId"></tables>
         </div>
         <div class="col d-none d-sm-block d-xl-block"></div>
       </div>
     </div>
    </div>
</template>
<script>
import avatar from "../components/ele-avatar"
import tables from "../components/ele-tableStudent"
import {mapActions,mapGetters} from "vuex"

export default {
    props:["isTA","isSub","userData","userPoints"],
    data() {
        return {
            finalPoints:0,
            finalHours:0,
            // avatarImg:"",
           }
    },
     components:{
    avatar,
    tables
  },
  mounted() {
    
  },
  computed:{
    ...mapGetters({
      avatarViewer:'avatarViewer'
    }),
   
    pointsLength(){
      let vm =this; 
      if(vm.userPoints){
        return vm.userPoints.length;
       }
      return 0;

    },
     totalPoint(){
      let vm =this; 
      if(vm.userPoints){  
        const pointArray=Object.values(vm.userPoints).map(
          function(item) {
            if(item.status ==2){
              return item.point
            }
            return 0
          }
            
        );
        try{

          return vm.finalPoints= pointArray.reduce((sum,key)=> sum+key)
        }catch(e){
          // console.log(e);
          return vm.finalPoints=0;
          }
       }
      return 0;
    },
    totalHours(){
      let vm =this; 
      if(vm.userPoints){  
        const pointArray=Object.values(vm.userPoints).map(
          function(item) {
            if(item.status ==2){
              return item.scholarshipHours
            }
            return 0
          }
            
        );
        try{

          return vm.finalHours= pointArray.reduce((sum,key)=> sum+key)
        }catch(e){
          // console.log(e);
          return vm.finalHours=0;
          }
       }
      return 0;
    },
    totalPointToPrecent(){
      let vm =this;
      const pointPercent = vm.finalPoints/ 3 *100;
      return pointPercent.toString()+"%";
      
    },
    totalHoursToPrecent(){
      let vm =this;
      const hourPercent = vm.finalHours/ 160 *100;
      return hourPercent.toString()+"%";
      
    }
  },
  methods: {
     ...mapActions({
          regStudentIs:'regStudentIs',
          avatarImg:'avatarImg',
        updateStudent:'student/updateStudent',

          

      }),
      img(id){
      if(id){
       this.avatarImg({id:id,type:"admin"})
        return this.avatarViewer
      }
      
      
    },
    routerTo(path,id){
      let vm = this;
      vm.regStudentIs(id);
      vm.$router.push({name:path})
    },
    async updateBox(){
        let vm =this;
        const { value: formValues } = await vm.$swal.fire({
        icon:'info',
        title: '修改資訊',
        html:
            '<input id="swal-input1" type="text" value="'+vm.userData.name +'" placeholder="姓名"class="form-control m-2">' +
            '<input id="swal-input4" type="number" value="'+vm.userData.stuId +'" disabled placeholder="輸入代號/學號" class="form-control m-2">' +
            '<input id="swal-input2" type="text" value="'+vm.userData.email +'" placeholder="電子郵件"class="form-control m-2">' +
            '<input id="swal-input3" type="text" value="'+vm.userData.pId +'" placeholder="身分證號/居留證號" class="form-control m-2">' +
            '<div class="form-check m-2 text-start">' +
            '  <input id="swal-input-checkbox" class="form-check-input" type="checkbox" '+ (vm.userData.type === -1 ? 'checked' : '') + '>' +
            '  <label class="form-check-label" for="swal-input-checkbox">獎學金學生</label>' +
            '</div>' ,

        focusConfirm: true,
        confirmButtonColor: '#38b269',
        confirmButtonText: '<i class="fas fa-save"></i> 更新資料',
         confirmButtonAriaLabel: '更新資料',
        preConfirm: () => {
            if(!document.getElementById('swal-input1').value ||!document.getElementById('swal-input4').value){
                let msg = '未輸入'
                if (!document.getElementById('swal-input1').value) {
                    msg = msg+' 姓名、';
                }
                if (!document.getElementById('swal-input4').value) {
                      msg = msg+' 學號、 ';
                } 
                if (!document.getElementById('swal-input2').value) {
                    msg = msg+' 電子郵件、';
                }
                if (!document.getElementById('swal-input3').value) {
                      msg = msg+' 身分證號/居留證號 ';
                } 
                    vm.$swal.showValidationMessage(msg)   

            }
            else {
            // 判斷 checkbox 是否選中，若選中則 type 設置為 -1，否則為 0
            const typeValue = document.getElementById('swal-input-checkbox').checked ? -1 : 0;
            return {
                name: document.getElementById('swal-input1').value,
                studentid: document.getElementById('swal-input4').value,
                email: document.getElementById('swal-input2').value,
                pId: document.getElementById('swal-input3').value,
                type: typeValue  // 傳回選擇的 type 值
            };
            }

        }
        })
        
        if (formValues) {
            vm.updateStudent(formValues).then((res)=>{
              console.log(res)
                if(res == 200){
                    vm.$swal.fire({
                        icon: 'success',
                        title: '修改完畢',
                    })
                }else{  
                    vm.$swal.fire({
                            icon: 'error',
                            title: '發生錯誤',
                            text: res,
                        })

                }
            })
          
        }
    }

  },
 

    
}
</script>
<style scoped>
    .avatar-box{
  margin: auto 17px;
}
.partTop{
  padding:20px;
  text-align: left;
  color :var(--color)
}

.success{
  background-color: var(--green);
  }

.content-box{
  margin: auto 0;
}
.review-box{
  padding:15px;
}
.review-box:hover{
  background-color: var(--hoverBgColor);
}
.circle.small {
  background:var(--success);
	border-radius: 50%;
	width: 5px;
	height: 5px;

}
.cus-dflex{
  display: flex;
  align-items: center;
}
</style>