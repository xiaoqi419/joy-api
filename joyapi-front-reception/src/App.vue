<template>
  <div class="nav-bar">
    <joy-top-header />
  </div>
  <div class="app">
    <router-view />
    <!-- 底部 -->
    <joy-foot />
    <el-backtop>
      <joy-svg-icon icon="rocket" style="height: 30px; width: 30px" />
    </el-backtop>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  padding: 100px 80px;
}

.nav-bar {
  background-color: #f5f5f5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
}

// 低分辨率
@media screen and (max-width: 768px) {
  .app {
    padding: 60px 20px;
  }
}
</style>
