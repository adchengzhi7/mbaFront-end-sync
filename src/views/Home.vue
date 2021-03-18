<template>
  <div class="home ">
    <div class="login-box">
      <div class="container p-50">
        <div class="h1 title-blue"> 政大MBA </div>
        <div class="h1 title-green ">特色學習登錄</div>
        <div class="p-3">

        <div class="p-3 ">
          <input class="  bg-light form-control" placeholder="Email" type="email" name="" id="" />
        </div>
        <div class="p-3">
          <input class=" p-3 form-control" placeholder="Password" type="password" name="" id="" />
        </div>

        </div>
        <div class="pt-3">

        <button class="btn  btn-lg btn-success ">登入</button>
        </div>
        
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button class="btn " type="button"><i class="fas fa-eye"></i></button>
  </div>
</div>


      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {},
};
</script>
<style scoped>
.p-50{
  padding: 50% 10%;
}
.btn-success{
  background-color: #38b269;
  border:0px;
  box-shadow: 0px 8px 41px rgba(0, 159, 64, 0.25);
}
.title-green {
  font-weight: 900;
  color: #38b269;
}
.title-blue {
  font-weight: 900;
  color: #005ead;
}

.login-box {
  width: 40%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
}
.form-control {
  background-color: #ffffff;
  height: 60px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  border: 0;
}
.home{
      overflow: hidden;
}
</style>
