<template>
    <div>
        <customTable>
           
            <template #thead>
                  <tr>
                    <th :key="th.key" v-for="th in thead" @click ="sortSelector(th.id,th.isSort)"  scope="col">
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
                <tr class="bg-shadow-hover rounded " :key="item.id" v-for="item in filterData">
                    <th scope="row" class="align-middle">{{item.id}}</th>
                    <td class="align-middle">
                        <div class="font-weight-bold"> {{item.section}}</div>
                        <div class="text-muted">{{item.sectionTitle}}</div>
                    </td>
                    <td class="align-middle">{{splitAndJoin(item.semester)}}</td>
                    <td class="align-middle"  v-html="(item.point)"></td>
                    <td class="align-middle">
                        <span v-if="item.status == 1">
                            <button class="btn btn-outline-secondary font-weight-bold" > 待審核</button>
                        </span>
                        <span v-else>
                            <button class="btn btn-outline-success font-weight-bold" > 已通過</button>
                        </span>
                    </td>
                    <td class="align-middle ">
                        <span class="">
                            <span v-if="item.status != 1 " class="btn">
                                <i  class="fas fa-pen " :class="{'icon-clickable':item.status == 1 , 'icon-disable':item.status != 1}"></i>
                            </span>
                            <span v-else  class="btn btn-light" >
                                <router-link  to="/"><i class="fas fa-pen " :class="{'icon-clickable':item.status == 1 , 'icon-disable':item.status != 1}"></i></router-link>
                            </span>
                        </span>
                        <span v-if="isTA">
                            <span class="" >
                                <button class="btn btn-light" :disabled="item.status != 1 " @click="showAlert()">
                                <i class="fas fa-check" :class="{'icon-success':item.status == 1 , 'icon-disable':item.status != 1}"></i>
                                </button>
                            </span>
                            <span class="" >
                                <button class="btn btn-light"  @click="warningAlert()">
                                    <i class="fas fa-times icon-danger" ></i>
                                </button>

                            </span>
                        </span>
                        

                    </td>
                </tr>
                <tr class="bg-shadow-hover rounded text-center pointer">
                    <td v-if="!isTA" style=" padding: 0.6rem !important;" :colspan="thead.length+1" @click="routerTo('StudentReg')">
                         <router-link to="/"><i class="fas fa-plus"></i> 登錄點數</router-link>
                    </td>
                    <td v-else style=" padding: 0.6rem !important;" :colspan="thead.length+1" @click="routerTo('TaReg')">
                         <router-link to="/"><i class="fas fa-plus"></i> 登錄點數</router-link>
                    </td>


                </tr>
            </template>
        </customTable>
    </div>
</template>
<script>
import customTable from "./tmp-table"
export default {
    props:["isTA"],
    components:{
        customTable
    },
    methods: {
        async showAlert() {
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
                vm.successAlert("審核通過!")
                
            }
        })
      },
      async warningAlert(){
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
                vm.successAlert("已刪除！")
                
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
        routerTo(path){
            let vm = this;
            vm.$router.push({name:path})
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
            const year = str.slice(0,3)
            const smester = str.slice(3,4)
           
            return year + "/"+smester
            

         }
    },
    computed:{
       
        filterData(){
            let vm =this;
            return vm.nameList.sort(function(a, b) {
                if (!vm.isReverse) {
                return a[vm.sortBy] - b[vm.sortBy];
                } else {

                return b[vm.sortBy] - a[vm.sortBy];
                }
            });
            
           
        }

    },
    data() {
        return {
            filter:"",
            sortBy :'id',
            isReverse:false,
            thead:
                [
                {key:'th01',id:"id",title:"#",isSort:true},
                {key:'th02',id:"section",title:"項目",isSort:false},
                {key:'th03',id:"semester",title:"學期",isSort:true},
                {key:'th04',id:"point",title:"點數",isSort:true},
                {key:'th05',id:"status",title:"狀態",isSort:true},
                ],
            nameList:[
                {id:"1",section:"國際交換或雙聯學位",sectionTitle:"SKEMA Business School",semester:"1091",point:"1",status:"1"},
                {id:"2",section:"國際交換或雙聯學位",sectionTitle:"SKEMA Business School",semester:"1082",point:"3",status:"2"},
                {id:"3",section:"英語檢定",sectionTitle:"TOEFL PBT",semester:"1081",point:"0",status:"2"},
            ]
        }
    },
    
}
</script>
<style scoped>
.table td, .table th {
    border-top: 0px !important;
    padding:  0rem  1.75rem !important;

}

.table tbody td, .table tbody th {
    padding: 1.75rem !important;
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



</style>