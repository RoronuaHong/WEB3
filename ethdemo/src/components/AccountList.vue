<template>
  <div>
    <h1>AccountList</h1>
    <van-space direction="vertical">
      <van-cell :title="item.address" icon="user-o" v-for="item in computedArr" :key="item">
        <template #right-icon>
          <van-button size="small" @click="handleGetPass(item.keyStore, item.address)">{{ item.balance }}</van-button>
        </template>
      </van-cell>
    </van-space>
  </div>
  <van-dialog v-model:show="show" title="请输入密码: " show-cancel-button @confirm="handleConfirmPass">
    <van-cell-group inset>
      <van-field v-model="password" label="密码: " placeholder="请输入密码: " type="password" />
      <van-field v-model="toAddress" label="转入账户: " placeholder="请输入转入账户名: " />
    </van-cell-group>
  </van-dialog>
</template>

<script setup>
import Web3 from 'web3'
import store2 from 'store2'
import * as Tx from 'ethereumjs-tx'
import ethwallet from 'ethereumjs-wallet'
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  walletInfo: {
    type: Array,
  }
})

const show = ref(false)
const password = ref('')
const keyStore = ref('')
const fromAddress = ref('')
const toAddress = ref('0xa13731068513ae70f4e9ef8db95387f16b53a1e8')
const number = ref(0.01)

const web3 = new Web3(
  Web3.givenProvider ||
  "wss://sepolia.infura.io/ws/v3/05319a17d7d64fdab211470966f001b7"
);

const computedArr = computed(() => {
  // 因为 computed 是同步计算属性，不能直接在其中使用 async
  const updatedWalletInfo = [...props.walletInfo]

  // 使用 for...of 循环来确保异步操作按顺序执行
  const fetchBalances = async () => {
    for (let item of updatedWalletInfo) {
      // 异步获取余额
      const ret = await web3.eth.getBalance(item.address)

      item.balance = web3.utils.fromWei(ret, 'ether')
    }
  }

  fetchBalances()  // 启动异步操作
  return updatedWalletInfo
})

const handleGetPass = (keystore, address) => {
  show.value = true
  keyStore.value = keystore

  fromAddress.value = address
}

const handleConfirmPass = () => {
  handleSend(keyStore.value, password.value)
  password.value = ''
}

const handleSend = async (keystore, pass) => {
  let walletObj

  try {
    walletObj = await ethwallet.fromV3(keystore, pass)
  } catch (e) {
    alert('密码错误')
    return false
  }

  let key = walletObj.getPrivateKey().toString('hex')
  const privateKey = new Buffer(key, 'hex')

  // 获取账户交易次数
  console.log(321, fromAddress)
  let nonce = await web3.eth.getTransactionCount(fromAddress.value)
  // 获取预计转账gas费
  const gasPrice = await web3.eth.getGasPrice()

  // 转账金额以wei为单位
  console.log(number.value, typeof number.value)
  const balance = Web3.utils.toWei(number.value, "ether")

  const rawTx = {
    from: fromAddress.value,
    nonce,
    gasPrice,
    to: toAddress.value,
    value: balance,
    data: '0x00'
  }

  console.log(rawTx)

  // 需要将交易的数据进行预估gas计算，然后将gas值设置到数据参数中
  let gas = await web3.eth.estimateGas(rawTx)

  console.log(555, gas)
  return

  rawTx.gas = gas

  // 通过ethereumjs-tx 实现私钥加密
  const tx = new Tx(rawTx)
  tx.sign(privateKey)

  const serializedTx = tx.serialize()

  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('transactionHash', txid => {
      console.log('交易成功!', txid)
    })
    .on('error', err => {
      console.log('error: ', err)
    })
}
</script>
<style scoped lang='scss'></style>