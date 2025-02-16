<template>
  <div>
    <p>Web3</p>
    <ButtonVue></ButtonVue>
    <AccountList :walletInfo="walletInfo"></AccountList>
  </div>
</template>

<script setup>
import ButtonVue from '@/components/ButtonVue.vue'

import store2 from 'store2'
import { ref, onMounted, provide } from 'vue';

const walletInfo = ref([])

onMounted(() => {
  walletInfo.value = store2.get('walletInfo') || []
  console.log(44, 'walletInfo: ', walletInfo.value)
})
</script>
<style scoped lang='scss'>
body {
  padding: 10px;
}
</style>