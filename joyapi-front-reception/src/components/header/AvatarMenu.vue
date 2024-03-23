<script lang="ts" name="avatar-menu" setup>
import { ref } from 'vue';

const avatarUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="50" :src="avatarUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>控制台</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown-link:focus {
  outline: none;
}
</style>
