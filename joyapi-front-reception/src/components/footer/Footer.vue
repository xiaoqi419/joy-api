<template>
  <el-footer class="footer">
    <p>© 2021 Your Company. All rights reserved.</p>
    <p>Contact us: email@example.com</p>
  </el-footer>
</template>

<script lang="ts" setup name="foot">
import { ElFooter } from 'element-plus';
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  padding: 20px 0;
  background-color: #f5f5f5;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #666;
  height: 30vh;
}
</style>
