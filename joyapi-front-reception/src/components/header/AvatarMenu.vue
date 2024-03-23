<script lang="ts" name="avatar-menu" setup>
import { ref } from 'vue';
import { logoutUserUsePost } from '@/api/userController';
import useButtonStore from '@/store/modules/button';
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';

const avatarUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const userStore = useUserStore();
const buttonStore = useButtonStore();

const doLogout = async () => {
  const res = await logoutUserUsePost();
  if (res.code === 200) {
    ElMessage({
      message: '退出登录成功',
      type: 'success'
    });
    userStore.setUserInfo({});
    buttonStore.setLoginBtn(true);
    // 清除localStorage中的用户信息
    localStorage.removeItem('rememberUser');
  }
};

</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="50" :src="avatarUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>控制台</el-dropdown-item>
        <el-dropdown-item @click="doLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown-link:focus {
  outline: none;
}
</style>
