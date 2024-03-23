<template>
  <!-- Modal -->
  <joy-modal-user />
</template>

<script setup lang="ts">
// 如果浏览器的localStorage中有记住的用户信息，直接执行登录操作
import { onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { API } from '@/api/typings';
import { loginUserUsePost } from '@/api/userController';
import useUserStore from '@/store/modules/user';
import useButtonStore from '@/store/modules/button';

const userInfo = localStorage.getItem('rememberUser') ? JSON.parse(localStorage.getItem('rememberUser')!) : undefined;
const userStore = useUserStore();
const buttonStore = useButtonStore();

// 执行登录操作
const doLogin = async () => {
  const param: API.UserLoginRequest = {
    userAccount: userInfo.userAccount,
    userPassword: userInfo.userPassword
  };
  const res = await loginUserUsePost(param);
  if (res.code === 200) {
    ElMessage({
      message: '登录成功',
      type: 'success'
    });
    buttonStore.setLoginBtn(false);
    userStore.setUserInfo(res.data!);
    localStorage.setItem('rememberUser', JSON.stringify(userInfo));
    userInfo.userAccount = '';
    userInfo.userPassword = '';
  }

};

onMounted(() => {
  if (userInfo) {
    // 检查是否登录过
    const user = sessionStorage.getItem('userStore');
    if (!user) {
      doLogin();
    }
  }
});

</script>

<style scoped lang="scss">
.icon {
  width: 100px;
  height: 100px;
  color: red;
}
</style>
