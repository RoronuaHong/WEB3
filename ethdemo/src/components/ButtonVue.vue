<template>
  <van-space>
    <van-button type="primary" @click="handleCreateWallte">创建钱包</van-button>
    <van-button type="primary">导入钱包</van-button>

    <van-dialog v-model:show="show" title="标题" show-cancel-button>
      <van-cell-group inset>
        <van-field v-model="pwd" label="密码: " placeholder="请输入密码" />
      </van-cell-group>
    </van-dialog>
  </van-space>
</template>

<script setup>
import { ref } from 'vue';
import 'vant/es/dialog/style';
import { showDialog } from 'vant';

const show = ref(false)
const username = ref('')
const pwd = ref('')

const handleCreateWallte = () => {
  show.value = true;
}
</script>
<style scoped lang='scss'></style>