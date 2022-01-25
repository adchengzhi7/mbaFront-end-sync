<template>
    <div>
        <div class="partTop">
       <div class="row m-0">
        <div class="col d-none d-sm-block d-xl-block "></div>
        <div class="col-12 col-xl-9 col-md-9  col-sm-10 col-xs-12 row">
            <div class="col-12 col-md-6">
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
    props:["isTA","userData","userPoints"],
    data() {
        return {
            finalPoints:0,
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
    totalPointToPrecent(){
      let vm =this;
      const pointPercent = vm.finalPoints/ 3 *100;
      return pointPercent.toString()+"%";
      
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
            '<input id="swal-input4" type="number" value="'+vm.userData.stuId +'" disabled placeholder="輸入代號/學號" class="form-control m-2">',
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
                      msg = msg+' 輸入學號 ';
                } 
                    vm.$swal.showValidationMessage(msg)   

            }
            else {
            return {
                    name: document.getElementById('swal-input1').value,
                    studentid:document.getElementById('swal-input4').value,
                }
            }

        }
        })

        if (formValues) {
          console.log(formValues);
            vm.updateStudent(formValues);
            // .then((res)=>{
            //     if(res.data.affectedRows){
            //         vm.$swal.fire({
            //             icon: 'success',
            //             title: '修改完畢',
            //             text: '修改資料為：'+JSON.parse(res.config.data),
            //         })
            //     }else{  
            //         vm.$swal.fire({
            //                 icon: 'error',
            //                 title: '發生錯誤',
            //                 text: res.data.code,
            //             })

            //     }
            // })
          
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
</style>