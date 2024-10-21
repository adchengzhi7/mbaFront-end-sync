<template>
  <div> 
    <register-form :isTA="isTA" :currentRegPointUser="currentRegPointUser" :pointType="pointType"></register-form>
  </div>
</template>

<script>
  import registerForm from '../components/ele-registerForm'
  import {mapGetters} from 'vuex'

export default {
  components: {
    registerForm
  },
  computed: {
    ...mapGetters({
      currentRegPointUser: 'currentRegPointUser'
    }),
  },
  mounted() {
    let vm = this;

    // 使用 query 而非 params
    console.log(this.$route.query.type);  // 獲取 query 中的 type
    console.log(this.$route.query.title); // 獲取 query 中的 title
    console.log(this.$route.query.icon);  // 獲取 query 中的 icon

    // 根據是否是 TA 來跳轉
    if (!vm.currentRegPointUser && vm.isTA) {
      vm.$router.push({ name: 'TaDash' });
    } else if (!vm.currentRegPointUser && !vm.isTA) {
      vm.$router.push({ name: 'StudentDash' });
    }

    // 如果 query 中的 type 不存在，重定向
    if (!vm.$route.query.type && !vm.isTA) {
      vm.$router.push({ name: 'StudentReg' });
    } else if (!vm.$route.query.type && vm.isTA) {
      vm.$router.push({ name: 'TaReg' });
    }

    // 將 query 的值賦值給 pointType
    vm.pointType.title = vm.$route.query.title;
    vm.pointType.icon = vm.$route.query.icon;
    vm.pointType.type = vm.$route.query.type;
  },
  
  data() {
    return {
      pointType: {
        title: "",
        icon: "",
        type: "",
      },
      isTA: true,
    }
  },
}
</script>

<style scoped>
</style>