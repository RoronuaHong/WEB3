<template>
  <div class="home">
    {{ string }}
    <van-button type="primary">创建钱包</van-button>
    <Web3Api></Web3Api>
    <div>余额: {{ amount }}</div>
    <h1>转账: </h1>
    <van-divider/>
    <van-button type="primary" @click="send">获取费用</van-button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Web3 from "web3";
import Web3Api from "../components/Web3Api.vue";

const string = ref("hello Vue3");

// 创建web3
const web3 = new Web3(
  Web3.givenProvider ||
    "wss://sepolia.infura.io/ws/v3/05319a17d7d64fdab211470966f001b7"
);
console.log(web3);

// 创建账户
const account = web3.eth.accounts.create(["123"]);

console.log(11, account);

// 获取余额
const amount = ref(-1);
web3.eth.getBalance(account.address).then((res) => {
  amount.value = res;
});

console.log(33, amount.value);

// 单位转换
const num1 = web3.utils.toWei(0.00003, "ether");
const num2 = web3.utils.fromWei(30000, "ether");
console.log(4, "num1: ", num1, web3.utils.toWei);
console.log(5, "num2: ", num2);

// eth转账
const send = async() => {
  // 创建转账参数
  // 获取账户交易次数
  const nonce = await web3.eth.getTransactionCount(account.address);

  console.log(nonce);

  // 获取预计转账 gas费用
  const gasPrice = await web3.eth.getGasPrice();

  console.log('gasPrice: ', gasPrice);

  // 转账金额: 以 wei 作为单位
  const value = web3.utils.toWei('0.01');
}

// web3.eth.sendSignedTransaction();

</script>
