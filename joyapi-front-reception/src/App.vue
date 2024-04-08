<template>
  <div class="nav-bar">
    <joy-top-header />
  </div>
  <div class="app">
    <div class="main">
      <router-view />
    </div>
    <!-- 底部 -->
    <joy-foot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  padding: 0 80px;
}

.nav-bar {
  background-color: #f5f5f5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
}

.main {
  padding: 20px 30px;
}

// 低分辨率
@media screen and (max-width: 768px) {
  .app {
    padding: 0 20px;
  }
}
</style>
