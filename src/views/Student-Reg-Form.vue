<template>
  <div> 
    <register-form :isTA="isTA" :currentRegPointUser="currentRegPointUser" :pointType="pointType"></register-form>
  </div>
</template>

<script>
  import registerForm from '../components/ele-registerForm' 
  import { mapGetters } from 'vuex'

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

    // 根據是否是 TA 來進行跳轉
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

    // 將 query 中的值賦值給 pointType
    vm.pointType.title = vm.$route.query.title;
    vm.pointType.icon = vm.$route.query.icon;
    vm.pointType.type = vm.$route.query.type;
  },

  data() {
    return {
      isTA: false,  // 預設為學生
      pointType: {
        title: "",
        icon: "",
        type: "",
      }
    }
  },
}
</script>

<style scoped>
</style>