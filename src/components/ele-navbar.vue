<template >
           <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light bg-shadow ">
  <a class="navbar-brand" href="#">
    <img src="../assets/mba-logo.png" width="30" height="30" alt="">
    <span class="theme">
    特色學習登錄
    </span>
    </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
     
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <img src="http://placehold.it/64x64" alt="Avatar" class="avatar">
      <ul class="navbar-nav">
         <li class="nav-item dropdown  ">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          李正治
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">登出</a>
        </div>
          
      </li>
      </ul>
    </form>
  </div>
</nav>
</template>
<script>
    export default {
       
    }
</script>
<style scoped>
.bg-shadow {
    box-shadow: 0 5px 10px rgba(154,160,185,0.05), 0 15px 40px rgba(166,173,201,0.2);
}
.theme{
    color: #38b269;
  font-weight: 900;
}
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>