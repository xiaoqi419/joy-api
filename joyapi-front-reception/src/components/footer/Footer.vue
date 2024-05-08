<template>
  <el-footer class="footer">
    <p style="justify-content: center; display: flex">
      © 2024 &nbsp;By&nbsp;
      <el-link
        href="https://www.ojason.top"
        type="primary"
        style="font-weight: bold; font-size: 15px">
        Jason
      </el-link>
      . All rights reserved.
    </p>
    <p>Contact us: zggx261@163.com</p>
  </el-footer>
</template>

<script lang="ts" setup name="foot">
import { ElFooter } from 'element-plus';
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  padding: 20px 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
}
</style>
