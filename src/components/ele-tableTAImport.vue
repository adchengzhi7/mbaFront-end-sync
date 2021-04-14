<template>
    <div>
         <div>
            <div class="progress" style="height: 3px;">
                <div class="progress-bar progress-bar-striped  progress-bar-animated bg-success" role="progressbar" :style="{'width': loadingPrecentage +'%'}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <customTable>
            <template #thead>
                  <tr>
                      <th></th>
                       <th :key="th.key" v-for="th in thead" @click ="sortSelector(th.id,th.isSort)"  scope="col">
                        <span :class="{'title-green':sortBy == th.id}">
                            {{th.title}}
                            <i v-if="sortBy == th.id && isReverse== false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy == th.id && isReverse== true" class="fas fa-sort-up"></i>
                            <span v-else-if="!th.isSort"></span>
                            <i v-else class="fas fa-sort"></i>
                        </span>

                    </th>
                    
                </tr>
            </template>
            <template #tbody>
                <tr class="bg-shadow-hover rounded" :class="{'alert alert-danger':item.success==0}" :key="'THT'+index" v-for="(item,index) in sortData">
                    <td></td>
                    <td   v-html="(item.name)"></td>
                    <td  v-html="(item.email)"></td>
                    <td  v-html="(item.personalid)"></td>
                    <td> {{item.studentid}}</td>
                    <td  v-if="item.success != null"> 
                        <div v-if="item.stsMsg=='ER_DUP_ENTRY'" class="text-danger">
                            此學號已經重複匯入
                        </div>
                        <div class="font-weight-bold text-success" v-else-if="item.stsMsg.affectedRows == 1">
                            <i class="fas fa-check"></i>
                        </div>
                        <div v-else class="text-danger">
                            不明錯誤
                        </div>
                    </td>
                </tr>
            </template>
        </customTable>
    </div>
</template>
<script>
import customTable from "./tmp-table"
import { mapGetters } from "vuex";

export default {
    name:"importtable",
    props:["filter"],
    components:{
        customTable
    },
    methods: {
       sortSelector(selected,isSort){
            let vm = this;
            if(isSort){
                vm.sortBy = selected;
                vm.isReverse = !vm.isReverse;
            }else{
                vm.sortBy = "";
            }
        },
   
    },
    computed:{
        ...mapGetters({
      newStudentList:'student/newStudentList',
      loadingPrecentage:'student/loadingPrecentage',
    }),
    sortData(){
        let vm =this;
        if(vm.newStudentList){
             return vm.newStudentList.sort(function(a, b) {
                    if (!vm.isReverse) {
                        return a[vm.sortBy] - b[vm.sortBy];
                    } else {
                        return b[vm.sortBy] - a[vm.sortBy];
                    }
                });
        }else{
            return vm.newStudentList
        }

    }


    },
    data() {
        return {
            thead:
                [
                {key:'th02',id:"name",title:"姓名",isSort:false},
                {key:'th03',id:"email",title:"Email",isSort:false},
                {key:'th04',id:"personalid",title:"證號",isSort:false},
                {key:'th05',id:"studentid",title:"學號",isSort:true},
                {key:'th06',id:"status",title:"新增狀態",isSort:false},
            ],  
            sortBy :'stuId',
            isReverse:'false',
           
        }
    },
    
}
</script>
<style scoped>
.table td, .table th {
    border-top: 0px !important;
    border-bottom-width:0px !important;

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

a{
    color:var(--green);
    font-weight:900;
}


</style>