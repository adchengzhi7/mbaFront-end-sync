<template>
    <div class="p-5">
        <div class="  alert alert-warning ">
            <i class="fas fa-exclamation-circle "></i>
            <a href="/"> 檔案範本</a>
            只限CSV （儲存記得選擇 UTF-8 CSV，以免發生中文字體亂碼）
        </div>
        <div>
            <div  @dragover.prevent @drop.prevent>
                <div class="container p-3 border-dash" @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop" v-bind:style="{ 'background-color': color }">
                    <div class="font-weight-boldest mt-1 mb-3">
                        請將 CSV 檔案拖曳到此處
                    </div>
                    <img class="img-fluid" src="../assets/upload.svg" alt="" srcset="">
                    <div class="m-2">- 或 -</div>
                    <div class="file-wrapper btn btn-success success m-2 ">
                        <input type="file" name="file-input"  accept=".csv" @change="handleFileInput" > 
                        <span>上傳</span>
                    </div>
                <div class="text-muted m-1">
                    （最大 10MB）
                </div>
                    <div :key="index" v-for="(file, index) in files" class="font-weight-boldest">
                        {{ file.name }} ({{ file.size /1000}} Kb)
                        <button class ="btn btn-sm btn-outline-danger" @click="removeFile(index)" title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

       
       
       <div class="pt-3" :check="checkField">

            <div v-if="countCsv !=0" class="btn btn-success success" @click="addUser">匯入名單</div>

            <div v-if="iserror" class="mt-3 alert alert-danger">
                {{error}}
            </div>
            <div v-if="loadingPrecentage == 100" class="mt-3 alert alert-success">
                {{isDone}}
            </div>

            <div class="mt-3 text-muted"> 
               <span class=" float-end">共 {{countCsv}} 比資料</span>
            </div>

       </div>

    </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'
import {csv} from "csvtojson";  

export default {
    
    component:{
    },
    data() {
    return {
        isDone:'',
        jsonData:[],
        files: [],
         color: 'rgba(56,178,105,0.15)',
        iserror:false,
        error:"檔案資料格式錯誤",
    }
},
computed:{
    ...mapGetters({
        newStudentList:'student/newStudentList',
        loadingPrecentage:'student/loadingPrecentage'
    }),
    countCsv(){
        let vm =this;
        let length =vm.jsonData.length;
        if(length >0){
            vm.newStudent(vm.jsonData)
            return  length
        }else{
            vm.setNewStudentNull()
            return 0
        } 
            
    },
    checkField(){
        let vm =this;
        vm.error ="";

        const name= vm.jsonData.map((ele)=>{
            if(ele.name == null ||ele.name == undefined ){
                return "isNUll"
            }
        })
        const studentId= vm.jsonData.map((ele)=>{
            if(ele.studentid == null ||ele.studentid == undefined ){
                return "isNUll"
            }
        })
         const email= vm.jsonData.map((ele)=>{
            if(ele.email == null ||ele.email == undefined ){
                return "isNUll"
            }
        })
        const personalid= vm.jsonData.map((ele)=>{
            if(ele.personalid == null ||ele.personalid == undefined ){
                return "isNUll"
            }
        })
        if(name[0] == "isNUll"){
            vm.error = vm.error + " 姓名"
            vm.iserror =true;
        }
         if(studentId[0] == "isNUll"){
             vm.error =" 、學號" 
             vm.iserror =true;
          }
          if(email[0] == "isNUll"){
             vm.error = vm.error + " 、Email"
             vm.iserror =true;
          }
           if(personalid[0] == "isNUll"){
             vm.error = vm.error + " 、證號"
             vm.iserror =true;
          }
            return vm.error="缺少欄位 ： "+vm.error
        

    }
},
methods: {
...mapActions({
    newStudent:'student/newStudent',
    setNewStudentNull:'student/setNewStudentNull',
    insertStudentasList:'student/insertStudentasList'
}),
    async getCsvData(input){
        let vm =this;
        if(input.target.files && input.target.files[0]){
        let tmppath = URL.createObjectURL(input.target.files[0]);
        const res = await fetch(tmppath);
        const text = await res.text();
        const jsonArray = await csv().fromString(text);
        vm.jsonData = jsonArray;
        if(jsonArray.length === 0){
            vm.setNewStudentNull();
            vm.error="檔案資料格式錯誤"
             vm.iserror= true;
        }

        }
    },
    async addUser(){
        let vm = this;
        const userList = vm.newStudentList;
        vm.insertStudentasList(userList)
        .catch((err)=>{
            throw err
        }).then(
            vm.isDone ="匯入完成"
        )
        
    },

    handleFileDrop(e) {
      this.getCsvData(e);
      this.color="rgba(56,178,105,0.3)"
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
    
    this.files.push(f);
      });
      this.color="rgba(56,178,105,0.15)"
    },
    handleFileInput(e) {
      this.getCsvData(e);
      let files = e.target.files;
      files = e.target.files
            if(!files) return;
      ([...files]).forEach(f => {
    
    this.files.push(f);
      });
    },
    removeFile(fileKey){
        let vm = this;
        vm.files.splice(fileKey, 1)
        vm.setNewStudentNull()
        vm.jsonData = [];
        vm.iserror = false;

    },
    fileDragIn(){
      this.color="white"
    },
    
},
}
</script>
<style scoped>
/* input[type="file"] {
    position: fixed;
    right: 100%;
    bottom: 100%;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 60px 120px;
    cursor: pointer;
} */
.file-wrapper {
  position: relative;
  overflow: hidden;
 
}
.border-dash{
    border: 4px dashed rgba(56,178,105,0.15);
}

.file-wrapper input {
       position: absolute;
    top: 0;
    right: 0; 
    cursor: pointer;
    opacity: 0.0;
    filter: alpha(opacity=0); 
    font-size: 300px;
    height: 200px;
}
.alert-warning {
    color: #664d03;
    background-color: rgba(255,243,205,0.7);
    border :0;
}
.alert-danger {
    color: #842029;
    background-color: rgba(248,215,217,0.8);
    border :0;
}
</style>