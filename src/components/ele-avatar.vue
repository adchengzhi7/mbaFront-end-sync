<template>
    <span>
        <img :src="image" alt="Avatar" :class="{'avatar-lg': size == 'lg','avatar': size == 'default'}">
    </span>
</template>
<script>
export default {
    props:["image","size"] 
}
</script>
<style>
.avatar {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.avatar-lg {
  vertical-align: middle;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
