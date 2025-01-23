<template>
  <div class="home">
    {{ string }}
    <van-button type="primary">创建钱包</van-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Web3 from "web3";

const string = ref("hello Vue3");

// 创建web3
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
console.log(web3);
</script>
