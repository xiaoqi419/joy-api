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
          :rules="rules"
          ref="longinFormRef"
          style="max-width: 300px; margin: 0 auto">
          <el-form-item prop="userAccount">
            <el-input v-model="formLabelAlign.userAccount" placeholder="用户名">
              <template #prefix>
                <el-icon>
                  <joy-svg-icon icon="user" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              v-model="formLabelAlign.userPassword"
              @focus="isPassword = true"
              @blur="isPassword = false"
              placeholder="密码"
              type="password"
              show-password>
              <template #prefix>
                <el-icon>
                  <joy-svg-icon icon="password" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-box">
              <el-checkbox v-model="formLabelAlign.type">记住我</el-checkbox>
              <el-space wrap>
                <el-link type="primary">忘记密码</el-link>
                <el-link type="primary">没有账号？</el-link>
              </el-space>
            </div>
          </el-form-item>
        </el-form>
        <!-- 登录 -->
        <div>
          <button @click="doLogin(longinFormRef)">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">登录</span>
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="modal-user">
import useModalStore from '@/store/modules/modal';
import { storeToRefs } from 'pinia';
import { reactive, ref, watch } from 'vue';
import '@/assets/scss/userModal.scss';
import { API } from '@/api/typings';
import { loginUserUsePost } from '@/api/userController';
import useUserStore from '@/store/modules/user';
import useButtonStore from '@/store/modules/button';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

const modalStore = storeToRefs(useModalStore());
const userStore = useUserStore();
const buttonStore = useButtonStore();
const dialogVisible = modalStore.userModal;
const isPassword = ref(false);
// 模态框宽度
const dialogWidth = ref(500);
const longinFormRef = ref<FormInstance>();
// 监视浏览器宽度变化调整合适的模态框宽度
watch(
  () => window.innerWidth,
  (newValue) => {
    if (newValue > 500) {
      dialogWidth.value = 500;
    } else {
      dialogWidth.value = newValue;
    }
  },
  {
    immediate: true,
    flush: 'post',
    deep: true
  }
);

const formLabelAlign = reactive<API.UserLoginRequest & { type: boolean }>({
  userAccount: '',
  userPassword: '',
  type: false
});
const rules = reactive<FormRules>({
  userPassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 8,
      max: 20,
      message: '密码长度在 8 到 20 个字符',
      trigger: 'blur'
    }
  ],
  userAccount: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ]
});

// 登录
const doLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const param: API.UserLoginRequest = {
        userAccount: formLabelAlign.userAccount,
        userPassword: formLabelAlign.userPassword
      };
      const res = await loginUserUsePost(param);
      if (res.code === 200) {
        ElMessage({
          message: '登录成功',
          type: 'success'
        });
        modalStore.userModal.value = false;
        buttonStore.setLoginBtn(false);
        userStore.setUserInfo(res.data!);
        // 如果记住我被选中，将用户名和密码存入localStorage
        if (formLabelAlign.type) {
          // 存在一个对象中,并设置过期时间
          const user = {
            userAccount: formLabelAlign.userAccount,
            userPassword: formLabelAlign.userPassword
          };
          localStorage.setItem('rememberUser', JSON.stringify(user));
        }
        formLabelAlign.userAccount = '';
        formLabelAlign.userPassword = '';
      }
    } else {
      console.log('error submit!', fields);
    }
  });

};
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
