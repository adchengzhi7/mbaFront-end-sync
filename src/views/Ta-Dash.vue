
<template>
  <div > 
     <div  class="partTop mt-0 mt-md-5">
       <div class="row m-0 mb-3">
         <div class="col d-none d-sm-block d-xl-block"></div>
         <div class="col-12 col-md-6">
            <input class="form-control" v-model="filter" placeholder="輸入查詢的姓名、學號" type="text"  >

         </div>
         <div class="col-4 d-none d-sm-block d-xl-block "></div>
         <div class="col d-none d-sm-block d-xl-block"></div>
       </div>
       <div class="row m-0 ">
         <div class="col d-none d-sm-block d-xl-block"></div>
         <div class="col-12 col-md-6">
            <tables :filter= "filter" :studentList="studentList"></tables>
         </div>
         <div class="col-12 col-md-4 ">
           <div class="d-flex flex-wrap">
             <h5 class="font-weight-bold">待審核清單</h5>
             <div  >
                <span class="danger float-left badge badge-pill badge-danger " >
                    <span v-if="unreviewPoints != null">{{unreviewPoints.length}}</span>
                    <span v-else>0</span>
                </span>
              </div>
            </div>
           <div v-if="unreviewPoints">
             <div :key="item.id" v-for="item in unReviewListLimited" class="bg-shadow-hover review-box  pointer" @click="routerTo('TaStudentPage',item.stuId)">
               <div class="d-flex flex-wrap">
                 <div class="col-1  ">
                  <div class="circle small p-1"></div>
                 </div>
                 <div class="col pl-0 d-flex flex-wrap">
                   <div>
                      <div class="h5 d-flex flex-wrap m-0">
                      <div class="font-weight-bold ">{{item.name}}</div>
                      <div class="text-muted ">  {{  item.stuId}}</div>
                    </div>
                    <p class='text-muted m-0'>{{item.section}}</p>
                    <div>
                      <small class="text-muted">
                    {{  dateShow(item.date)}}
                      </small>
                    </div>
                   </div>
                   <div class="ms-auto align-self-center">
                      <button class="btn btn-outline-secondary font-weight-bold">待審核</button>
                   </div>
                    
                 </div>

               </div>
              
             </div>
             <div class="text-center ">
               <div class="m-2 p-2">
                 <router-link to="review">查看更多</router-link>
               </div>
             </div>
           </div>
           <div v-else>
             <div  class="bg-shadow-hover review-box  pointer">
                <div class="d-flex flex-wrap">
                <div class="col pl-0 text-center icon-disable ">
                  <h3 class="font-weight-boldest m-0">尚無資料</h3>
                </div>
               </div>
             </div>
           </div>
         </div>
         <div class="col d-none d-sm-block d-xl-block"></div>
       </div>
     </div>
  </div>
</template>

<script>
import tables from "../components/ele-tableTA"
import {mapGetters,mapActions} from "vuex"

export default {

  components:{
    tables,
  },

  computed:{
    ...mapGetters({
      studentList:'student/studentList',
      authenticated:'auth/authenticated',
      unreviewPoints:'userPoint/unreviewPoints'
    }),
   
    unReviewListLimited(){
      let vm = this;
      const unreviewPoints = vm.unreviewPoints;
      if(unreviewPoints){
        const arrayList =unreviewPoints.map((item)=>{
              return Object(item)
          })
        return arrayList.filter((row, index) => {
          let start = (vm.currentPage-1)*vm.pageSize;
          let end = vm.currentPage*vm.pageSize;
        if(index >= start && index < end) return true;
      })
      }return []

    }
  },
  methods: {
    
    ...mapActions({
      getStudentList:'student/getStudentList',
      getUnreviewPoint:'userPoint/getUnreviewPoint'

    }),
    
     routerTo(path,stuId){
            let vm = this;
            vm.$router.push({ name: path, query: {stuId:stuId } })

        },
     dateShow(date){
             let gotDate =new Date(date);
             gotDate.setHours(gotDate.getHours() - 8);
             let today = new Date()
             const diffTimeStamp = today.getTime()- gotDate.getTime()
             const diffMin = Math.floor(diffTimeStamp / (1000*60)) ;
             const diffTime = Math.floor(diffTimeStamp / (1000*3600)) ;
             const diffDays = Math.floor(diffTimeStamp / (1000*3600*24)) ;
             const displayDate = gotDate.getUTCFullYear()+"年" + gotDate.getUTCMonth()+"月"+ gotDate.getUTCDate()+"日  "+gotDate.getUTCHours()+":"+gotDate.getUTCMinutes()
             if(diffMin < 60){return diffMin+ "分鐘前" }
             else if(diffTime < 24){ return diffTime + "小時前"}
             else if (diffDays < 5){return diffDays+"天前"}
             else{return displayDate}
         }
  },
data() {
    return {
      filter:"",
      currentPage:1,
      pageSize:5,
    }
  },
  mounted() {
    this.getStudentList()
    this.getUnreviewPoint()
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
a{
    color:var(--green);
    font-weight:900;
}
/* HORIZONTAL */

@-webkit-keyframes horizontal {
  0% {
    -webkit-transform: translate(0,0);
    transform: translate(0,0);
  }

  6% {
    -webkit-transform: translate(5px,0);
    transform: translate(5px,0);
  }

  12% {
    -webkit-transform: translate(0,0);
    transform: translate(0,0);
  }

  18% {
    -webkit-transform: translate(5px,0);
    transform: translate(5px,0);
  }

  24% {
    -webkit-transform: translate(0,0);
    transform: translate(0,0);
  }

  30% {
    -webkit-transform: translate(5px,0);
    transform: translate(5px,0);
  }

  36% {
    -webkit-transform: translate(0,0);
    transform: translate(0,0);
  }
}

@keyframes horizontal {
  0% {
    -webkit-transform: translate(0,0);
    -ms-transform: translate(0,0);
    transform: translate(0,0);
  }

  6% {
    -webkit-transform: translate(5px,0);
    -ms-transform: translate(5px,0);
    transform: translate(5px,0);
  }

  12% {
    -webkit-transform: translate(0,0);
    -ms-transform: translate(0,0);
    transform: translate(0,0);
  }

  18% {
    -webkit-transform: translate(5px,0);
    -ms-transform: translate(5px,0);
    transform: translate(5px,0);
  }

  24% {
    -webkit-transform: translate(0,0);
    -ms-transform: translate(0,0);
    transform: translate(0,0);
  }

  30% {
    -webkit-transform: translate(5px,0);
    -ms-transform: translate(5px,0);
    transform: translate(5px,0);
  }

  36% {
    -webkit-transform: translate(0,0);
    -ms-transform: translate(0,0);
    transform: translate(0,0);
  }
}

.faa-horizontal.animated,
.faa-horizontal.animated-hover:hover,
.faa-parent.animated-hover:hover > .faa-horizontal {
  -webkit-animation: horizontal 2s ease infinite;
  animation: horizontal 2s ease infinite;
}
</style>
