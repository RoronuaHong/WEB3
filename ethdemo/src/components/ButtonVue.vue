<template>
  <van-space>
    <van-button type="primary" @click="handleCreateWallte">创建钱包</van-button>
    <van-button type="primary">导入钱包</van-button>

    <van-dialog v-model:show="show" title="标题" show-cancel-button @confirm="handleConfirm">
      <van-cell-group inset>
        <van-field type="password" v-model="pwd" label="密码: " placeholder="请输入密码" />
      </van-cell-group>
    </van-dialog>
  </van-space>
  <p v-if='!!mnemonic'>{{ mnemonic }}</p>
  <van-button size="mini" @click="handleSave" v-if="!showSaveBtn">我已经保存</van-button>
</template>

<script setup>
import 'vant/es/dialog/style'
import 'vant/es/notify/style'

import { ref } from 'vue'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { hdkey } from 'ethereumjs-wallet'
import { showDialog, showNotify } from 'vant'

import store2 from 'store2'

const show = ref(false)
const username = ref('')
const pwd = ref('')
const mnemonic = ref('')
const showSaveBtn = ref(false)

const handleCreateWallte = () => {
  show.value = true
}

const handleConfirm = async() => {
  if (!pwd.value) {
    showNotify({
      type: 'danger',
      message: '密码不能为空！！！'
    })

    return
  }

  // 生成助记词 || localStorage读取助记词
  // eagle second next car champion series endorse ride feed armed enact wall
  const walletInfos = store2.get('walletInfo') || []
  mnemonic.value = walletInfos.length > 0 ? walletInfos[0].mnemonic : generateMnemonic() 

  // 生成seed
  const seed = await mnemonicToSeed()

  // 生成钱包
  const hdWallet = hdkey.fromMasterSeed(seed)

  // 生成地址索引
  const addressIndex = walletInfos.length === 0 ? 0 : walletInfos.length + 1

  // 生成keyPair
  const keyPair = hdWallet.derivePath(`m/44'/60'/0'/${addressIndex}`)

  // 生成wallet
  const wallet = keyPair.getWallet()
  const lowerCaseAddress = wallet.getAddressString()
  const checkSumAddress = wallet.getChecksumAddressString()
  const privateKey = wallet.getPrivateKey().toString('hex')
  const keyStore = await wallet.toV3(pwd.value)
  // const walletInfo = [{
  //   id: addressIndex,
  //   address: lowerCaseAddress,
  //   privateKey,
  //   keyStore,
  //   mnemonic: mnemonic.value,
  //   balance: 0,
  // }]
  walletInfos.push({
    id: addressIndex,
    address: lowerCaseAddress,
    privateKey,
    keyStore,
    mnemonic: mnemonic.value,
    balance: 0,
  })

  store2('walletInfo', walletInfos)

  console.log(3, 'walletInfos: ', walletInfos)
}

const handleSave = () => {
  showSaveBtn.value = !showSaveBtn.value
}

</script>
<style scoped lang='scss'></style>