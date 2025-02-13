<template>
  <div class="home">
    {{ string }}
    <van-button type="primary">创建钱包</van-button>
    <Web3Api></Web3Api>
    <div>余额: {{ amount }}</div>
    <h1>转账: </h1>
    <van-divider/>
    <van-button type="primary" @click="send">获取费用</van-button>
    <AccountSys></AccountSys>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Web3 from "web3";
const { Transaction } = require('ethereumjs-tx');
import Web3Api from "../components/Web3Api.vue";
import AccountSys from '../components/AccountSys.vue';

const string = ref("hello Vue3");

// 创建web3
const web3 = new Web3(
  Web3.givenProvider ||
    "wss://sepolia.infura.io/ws/v3/05319a17d7d64fdab211470966f001b7"
);
console.log(web3);

// 创建账户
const account = web3.eth.accounts.create(["123"]);
const privateKeys = ref('0x0001');

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
// const send = async() => {
//   // 1. 构建转账参数
//   // 获取账户交易次数
//   const nonce = await web3.eth.getTransactionCount(account.address);

//   console.log(nonce);

//   // 获取预计转账 gas费用
//   const gasPrice = await web3.eth.getGasPrice();

//   console.log('gasPrice: ', gasPrice);

//   // 转账金额: 以 wei 作为单位
//   const value = web3.utils.toWei('0.00', 'ether');
//   console.log(value);

//   // rawTx
//   const rawTx = {
//     from: account.address,
//     to: '0x1234567890abcdef1234567890abcdef12345678',
//     nonce,
//     gasPrice: '0x0',
//     value,
//     data: "0x0000",
//   }

//   // 2. 生成 serilizationTx
//   // 转换私钥
//   const privateKey = Buffer(privateKeys.value.slice(2), 'hex');

//   console.log('privateKey: ', privateKey);
  
//   // gas估算
//   console.log(111, 'rawTx: ', rawTx);
//   const gas = await web3.eth.estimateGas(rawTx);

//   console.log('gas: ', gas);

//   rawTx.gas = gas;

//   // etherumjs-tx 实现私钥加密
//   // 创建交易对象
//   const tx = new Transaction(rawTx, { chain: 'mainnet' });

//   // 输出交易信息
//   console.log(tx);

//   tx.sign(privateKey);

//   const serilizationTx = tx.serialize();

//   console.log('serilizationTx: ', serilizationTx);
// }

// // web3.eth.sendSignedTransaction();

const send = async () => {
  // 1. 构建转账参数
  // 获取账户交易次数
  const nonce = await web3.eth.getTransactionCount(account.address);
  console.log("nonce: ", nonce);

  // 获取预计转账 gas费用
  const gasPrice = await web3.eth.getGasPrice();
  console.log('gasPrice: ', gasPrice);

  // 转账金额: 以 wei 作为单位
  const value = web3.utils.toWei('0.00', 'ether');
  console.log("value: ", value);

  // rawTx
  const rawTx = {
    from: account.address,
    to: '0x1234567890abcdef1234567890abcdef12345678',
    nonce: web3.utils.toHex(nonce),  // Convert nonce to hex
    gasPrice: web3.utils.toHex(gasPrice),  // Convert gasPrice to hex
    value: '0x0',  // Convert value to hex
    data: "0x0000",
  };

  // 2. 生成 serilizationTx
  // 转换私钥
  const privateKeyBuffer = Buffer.from(privateKeys.value.slice(2), 'hex');
  console.log('privateKeyBuffer: ', privateKeyBuffer);

  // gas估算
  console.log(111, 'rawTx: ', rawTx);
  const gas = await web3.eth.estimateGas(rawTx);
  console.log('gas: ', gas);

  rawTx.gas = web3.utils.toHex(gas);  // Convert gas to hex

  // ethereumjs-tx 实现私钥加密
  // 创建交易对象
  const tx = new Transaction(rawTx, { chain: 'mainnet' });

  // 输出交易信息
  console.log(tx);

  // 签名交易
  tx.sign(privateKeyBuffer);

  // 序列化交易
  const serializedTx = tx.serialize();
  console.log('serializedTx: ', serializedTx);
}


</script>
