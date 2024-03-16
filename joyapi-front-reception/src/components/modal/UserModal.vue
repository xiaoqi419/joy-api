<template>
  <div class="login-box">
    <el-dialog v-model="dialogVisible" width="500">
      <div class="box-main">
        <h1>Login Form</h1>
        <div class="owl" id="owl" :class="{ password: isPassword }">
          <div class="hand"></div>
          <div class="hand hand-r"></div>
          <div class="arms">
            <div class="arm"></div>
            <div class="arm arm-r"></div>
          </div>
        </div>
        <el-form
          label-position="left"
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 300px; margin: 0 auto"
        >
          <el-form-item>
            <el-input v-model="formLabelAlign.name" placeholder="用户名">
              <template #prefix>
                <el-icon><joy-svg-icon icon="user" /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formLabelAlign.region"
              @focus="isPassword = true"
              @blur="isPassword = false"
              placeholder="密码"
              type="password"
              show-password
            >
              <template #prefix>
                <el-icon><joy-svg-icon icon="password" /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 忘记密码，记住我 -->
        <div class="forget">
          <el-checkbox v-model="formLabelAlign.type">记住我</el-checkbox>
          <a href="javascript:;">忘记密码</a>
        </div>
        <div>
          <el-button type="primary" @click="dialogVisible = false"
            >登录</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="modal-user">
import useModalStore from '@/store/modules/modal'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import '@/assets/scss/userModal.scss'

const modalStore = storeToRefs(useModalStore())
const dialogVisible = modalStore.userModal
const isPassword = ref(false)

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: ''
})
</script>

<style lang="scss" scoped>
.box-main {
  margin: 0 auto;
  text-align: center;
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .forget {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin: 0 80px;
  }
}

.el-input__icon {
  color: red;
}

::v-deep(.el-dialog__body) {
  padding-top: 0;
}
</style>
