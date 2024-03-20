<template>
  <div class="container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <div class="logo" @click="goHome">
        <img
          style="width: 50px; height: 50px"
          src="https://upload.ojason.top/hexo/logo1.png"
          alt="logo"
        />
        JOY API
      </div>
      <div
        class="flex-grow"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div>承诺，旗下API永久免费</div>
      </div>
      <div class="btn">
        <el-button :icon="Search" circle type="primary" />
        <el-button type="primary" text class="btn-login" @click="doLogin()"
          >登录</el-button
        >
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup name="top-header">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import useModalStore from '@/store/modules/modal'

const modalStore = useModalStore()

// 登录
const doLogin = () => {
  modalStore.setUserModal(true)
}

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 跳转到首页
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 20px;
  }
  .btn {
    justify-content: center;
    align-items: center;
    display: flex;
    padding-right: 20px;
    .btn-login {
      font-size: 20px;
      // 触摸按钮时按钮底部缓慢出现下划线动画
      transition: all 0.3s ease-in-out;
      &:hover {
        border-bottom: 2px solid #409eff;
        color: #409eff;
        transition: all 0.3s ease-in-out;
        transform: scale(1.1);
        cursor: pointer;
        font-weight: bold;
        font-size: 20px;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>
