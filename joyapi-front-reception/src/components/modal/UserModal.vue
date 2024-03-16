<template>
  <div class="login-box">
    <el-dialog v-model="dialogVisible" :width="dialogWidth">
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
          <el-form-item>
            <div class="btn-box">
              <el-checkbox v-model="formLabelAlign.type">记住我</el-checkbox>
              <el-space wrap>
                <el-link type="primary">忘记密码？</el-link>
                <el-link type="primary">注册</el-link>
              </el-space>
            </div>
          </el-form-item>
        </el-form>
        <!-- 登录 -->
        <div>
          <button>
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text"> 登录 </span>
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="modal-user">
import useModalStore from '@/store/modules/modal'
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import '@/assets/scss/userModal.scss'

const modalStore = storeToRefs(useModalStore())
const dialogVisible = modalStore.userModal
const isPassword = ref(false)
// 模态框宽度
const dialogWidth = ref(500)

// 监视浏览器宽度变化调整合适的模态框宽度
watch(
  () => window.innerWidth,
  newValue => {
    if (newValue > 500) {
      dialogWidth.value = 500
    } else {
      dialogWidth.value = newValue
    }
  },
  {
    immediate: true,
    flush: 'post',
    deep: true
  }
)

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
  .btn-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
  }
}

.el-input__icon {
  color: red;
}

::v-deep(.el-dialog__body) {
  padding-top: 0;
}
</style>
