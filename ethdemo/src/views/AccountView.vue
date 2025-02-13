<template>
  <div>
    <AccountSys></AccountSys>
    <h1>助记词</h1>
    <p>{{ mnemonic }}</p>
    <p>账号地址: <span>0x959fd7ef9089b7142b6b908dc3a8af7aa8ff0fa1</span></p>
    <p>账号私钥: <span>abf82ff96b463e9d82b83cb9bb450fe87e6166d4db6d7021d0c71d7e960d5abe</span></p>
  </div>
</template>

<script setup>
import AccountSys from '../components/AccountSys.vue';

// 创建助记词
import { generateMnemonic, mnemonicToSeed } from "bip39";

// let mnemonic = generateMnemonic();

// console.log(mnemonic);
// 助记词
// involve feed mixture uniform assume owner lion lion divorce impose animal deer
const mnemonic = 'involve feed mixture uniform assume owner lion lion divorce impose animal deer';

// 根据助记词生成密钥对
// 1. 导入分层恰饱模块
import { hdkey } from 'ethereumjs-wallet';
import Web3 from 'web3';

// 2. 将助记词转成seed【生成密钥对keypair】
const generateMnemonicFn = async () => {
  let seed = await mnemonicToSeed(mnemonic.value);

  console.log(seed);

  // 3. 获取钱包
  const hdWallet = hdkey.fromMasterSeed(seed);

  // 4. 生成钱包中再/m44'/60'/0'/0 i路径的keypair
  let keypair = hdWallet.derivePath("m/44'/60'/0'/0/0");

  console.log('hdWallet: ', hdWallet);
  console.log('keypair: ', keypair);

  // 获取私钥
  // 1. 获取钱包对象
  const wallet = keypair.getWallet();

  // 2. 获取钱包地址
  const lowerCaseAddress = wallet.getAddressString();
  console.log('wallet: ', wallet);

  // 0x959fd7ef9089b7142b6b908dc3a8af7aa8ff0fa1
  console.log('钱包地址-lowerCaseAddress: ', lowerCaseAddress);

  // 3. 获取钱包的校验地址
  const checkAddress = wallet.getChecksumAddressString();

  // 0x959FD7Ef9089B7142B6B908Dc3A8af7Aa8ff0FA1
  console.log('钱包校验地址-checkAddress: ', checkAddress);

  // 4. 获取私钥
  // abf82ff96b463e9d82b83cb9bb450fe87e6166d4db6d7021d0c71d7e960d5abe
  const priKey = '0x' + wallet.getPrivateKey().toString('hex');
  console.log('私钥 - priKey: ', priKey);

  // 创建web3
  const web3 = new Web3(
    Web3.givenProvider ||
    "wss://sepolia.infura.io/ws/v3/05319a17d7d64fdab211470966f001b7"
  );

  // 导出keystore
  // 1. web3js
  const keystore1 = await web3.eth.accounts.encrypt(priKey, '123456');
  console.log('keystore1: ', keystore1);

  // 2. wallet对象
  const keystore2 = await wallet.toV3('654321');
  console.log('keystore2: ', keystore2);

  

  return seed;
}

console.log(generateMnemonicFn());

</script>
<style scoped lang='scss'></style>