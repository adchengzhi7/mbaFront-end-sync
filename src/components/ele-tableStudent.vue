<template>
    <div>
        <customTable>
           
            <template #thead>
                  <tr>
                    <th class="" :key="th.key" v-for="th in thead" @click ="sortSelector(th.id,th.isSort)" :class="{'text-center':isDisplaySmall==true}"   scope="col">
                        <span :class="{'title-green':sortBy == th.id}">
                            {{th.title}}
                            <i v-if="sortBy == th.id && isReverse== false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy == th.id && isReverse== true" class="fas fa-sort-up"></i>
                            <span v-else-if="!th.isSort"></span>
                            <i v-else class="fas fa-sort"></i>
                        </span>

                    </th>
                
                    <th></th>
                </tr>
            </template>
            <template #tbody>
                <tr class="bg-shadow-hover rounded " :key="index" v-for="(item,index) in filterData">
                    <td class="align-middle ">
                        <div class="ms-2 ms-md-0">
                            <div class="font-weight-bold"> {{item.section}}</div>
                            <div class="text-muted">
                                <span>{{item.section_title}}</span>
                                <span v-if ="item.englishCredit!= null" > -{{item.englishCredit}}分</span>
                            </div>
                        </div>

                    </td>
                    <td class="align-middle" :class="{'text-center':isDisplaySmall==true}" >{{splitAndJoin(item.semester)}}</td>
                    <td class="align-middle" :class="{'text-center':isDisplaySmall==true}"  v-html="(item.point)"></td>
                    <td class="align-middle" :class="{'text-center':isDisplaySmall==true}" >
                        <span v-if="item.status == 1">
                            <button class="font-weight-bold" :class="{'badge bg-success border-0':isDisplaySmall==true,'btn btn-outline-secondary ':isDisplaySmall==false}"> 待審核</button>
                        </span>
                        <span v-else>
                            <button class="font-weight-bold" :class="{'badge bg-success border-0':isDisplaySmall==true,'btn btn-outline-success':isDisplaySmall==false}" > 已通過</button>
                        </span>
                    </td>
                    <td class="align-middle ">
                        <span class="">
                            <span v-if="item.status != 1 " class="btn" :class="{'btn-sm':isDisplaySmall==true}"  >
                                    <i  class="fas fa-pen " :class="{'icon-clickable':item.status == 1 , 'icon-disable':item.status != 1}"></i>
                            </span>
                            <span v-else  class="btn btn-light"  @click="routerToWithParam(stuId,item.pointId)" :class="{'btn-sm':isDisplaySmall==true}" >
                                <i class="fas fa-pen " :class="{'icon-clickable':item.status == 1 , 'icon-disable':item.status != 1}"></i>
                            </span>
                        </span>
                        <span >
                            <span v-if="isTA" >
                                <button class="btn btn-light" :disabled="item.status != 1 " @click="showAlert({pointId:item.pointId,status:item.status,stuId:stuId})" :class="{'btn-sm':isDisplaySmall==true}" >
                                <i class="fas fa-check" :class="{'icon-success':item.status == 1 , 'icon-disable':item.status != 1}"></i>
                                </button>
                            </span>
                            <span v-if="(item.status == 1 && !isTA) || isTA" >
                                <button class="btn btn-light"  @click="warningAlert({pointId:item.pointId,status:item.status,stuId:stuId})" :class="{'btn-sm':isDisplaySmall==true}"  >
                                    <i class="fas fa-times icon-danger" ></i>
                                </button>

                            </span>
                        </span>
                        

                    </td>
                </tr>
                <tr class="bg-shadow-hover rounded text-center pointer">
                    <td v-if="!isTA" style=" padding: 0.6rem !important;" :colspan="thead.length+1" @click="routerTo('StudentReg',stuId)">
                         <router-link to="/"><i class="fas fa-plus"></i> 登錄點數</router-link>
                    </td>
                    <td v-else style=" padding: 0.6rem !important;" :colspan="thead.length+1" @click="routerTo('TaReg',stuId)">
                         <router-link to="/"><i class="fas fa-plus"></i> 登錄點數</router-link>
                    </td>


                </tr>
            </template>
        </customTable>
    </div>
</template>
<script>
import customTable from "./tmp-table";
import { mapGetters,mapActions} from 'vuex'

export default {
    props:["isTA","stuId"],
    components:{
        customTable
    },
    mounted() {
    },
    methods: {
        ...mapActions({
            regStudentIs:'regStudentIs',
            approvePointId:'userPoint/approvePointId',
            deletePointId:'userPoint/deletePointId',
            getWidth:'getWidth'
            
        }),
      
      async showAlert(object) {
        let vm =this;
        
        await vm.$swal({
            title: '<h2 class="font-weight-boldest m-0">您確定要審核通過？</h2>',
            showCloseButton: true,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009F40',
            cancelButtonColor: '#A0A9BA',
            confirmButtonText: '確定',
            cancelButtonText: '取消',
         })
         .then((result) => {
            if (result.isConfirmed) {
                vm.approvePointId(object).then(()=>{
                    vm.successAlert("審核通過!")
                }).catch((e)=>{
                    console.log(e);
                })
                
            }
        })
      },
      async warningAlert(object){
          let vm = this;
          await vm.$swal({
            title: '<h2 class="font-weight-boldest m-0">您確定要刪除？</h2>',
            showCloseButton: true,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DB3058',
            cancelButtonColor: '#A0A9BA',
            confirmButtonText: '刪除',
            cancelButtonText: '取消',
         }) .then((result) => {
            if (result.isConfirmed) {
                  vm.deletePointId(object).then(()=>{
                    vm.successAlert("已刪除！!")
                }).catch((e)=>{
                    console.log(e);
                })
            }
        })
      },
      successAlert(msg){
          let vm =this;
          vm.$swal({
                title: '<h2 class="font-weight-boldest success m-0">'+msg+'</h2>',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton:false,
                timer:2000
                })
                // .then(()=>{
                //     vm.$router.go(routeName)
                // })

      },
      routerTo(path,id){
          let vm = this;
          vm.regStudentIs(id);
          vm.$router.push({name:path})
        },
        routerToWithParam(id,param){
          let path = null;
          let vm = this;
          vm.regStudentIs(id);
          if(!vm.isTA){
              path="StudentRegFormEdit";
              vm.$router.push({name:path,query: { pointsId:param }})
          }else{
              path="TaRegFormEdit";
              vm.$router.push({name:path,query: { pointsId:param }})
          }
        },
          sortSelector(selected,isSort){
            let vm = this;
            if(isSort){
                vm.sortBy = selected;
                vm.isReverse = !vm.isReverse;
            }else{
                vm.sortBy = "";
            }
        },
        splitAndJoin(str){
            if(str != "00"){
                const year = str.slice(0,3)
                const smester = str.slice(3,4)
                return year + "/"+smester
            }
            return "-"
         }
    },
    computed:{
        ...mapGetters({
        userPoints:'userPoint/userPoints',
        windowWidth:'windowWidth'
    }),
       
    filterData(){
        let vm =this;
        if(vm.userPoints){
            return vm.userPoints.sort(function(a, b) {
                if (!vm.isReverse) {
                return a[vm.sortBy] - b[vm.sortBy];
                } else {

                return b[vm.sortBy] - a[vm.sortBy];
                }
            });
        }
        return vm.nameList
        
    },
    isDisplaySmall() {
        let vm = this;
        vm.getWidth();
        if (vm.windowWidth > 768) {
            return false;
        } else {
            return true;
        }
    }

    },
    data() {
        return {
            filter:"",
            sortBy :'semester',
            isReverse:false,
            isDisplaySm:false,
            thead:
                [
                {key:'th02',id:"section",title:"項目",isSort:false},
                {key:'th03',id:"semester",title:"學期",isSort:true},
                {key:'th04',id:"point",title:"點數",isSort:true},
                {key:'th05',id:"status",title:"狀態",isSort:true},
                ],
                
            nameList:[
                {id:"1",section:"",section_title:"",semester:"",point:"",status:""},
            ]
        }
    },
    
}
</script>
<style scoped>

.table td, .table th {
    border-top: 0px !important;
    border-bottom-width:0px !important;
    padding: 0rem 0.15rem !important;
    font-size: 12px !important;


}

.table tbody td, .table tbody th {
    padding: 0.35rem 0.15rem !important;
}

.table {
    border-collapse: separate;
    border-spacing: 0px 0.5rem;

}
.table thead th {
    border-bottom: 0px;
    font-weight:900px;
    font-size: 14px;
    color:#c0c0c0;
}
table tbody tr:hover {
    background-color:var(--hoverBgColor);

}
.rounded {
    border-radius: .5rem!important;
}
a{
    color:var(--green);
    font-weight:900;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .table td, .table th {
        padding: 0rem 0.15rem !important;
        font-size: 12px !important;
    }
    .table tbody td, .table tbody th {
        padding: 0.35rem 0.15rem !important;
    }
    .table {
        font-size: 12px !important;
    }
    
 }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    .table td, .table th {
        padding:  0rem  1.75rem !important;
        font-size: 16px !important;
    }
     .table tbody td, .table tbody th {
        padding: 1.75rem !important;
    }
    .table {
        font-size: 16px;
    }
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
     .table td, .table th {
        padding:  0rem  1.75rem !important;
        font-size: 16px !important;
    }
    .table tbody td, .table tbody th {
        padding: 1.75rem !important;
    }
    .table {
        font-size: 16px;
    }
 }

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
      .table td, .table th {
        padding:  0rem  1.75rem !important;
        font-size: 16px !important;

    }
     .table tbody td, .table tbody th {
        padding: 1.75rem !important;
    }
    .table {
        font-size: 16px;
    }

}


</style>