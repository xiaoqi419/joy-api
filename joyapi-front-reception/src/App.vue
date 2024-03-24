<template>
  <div class="nav-bar">
    <joy-top-header />
  </div>
  <div class="main">
    <router-view />
  </div>
  <!-- 顶部 -->
  <joy-foot />
</template>

<style lang="scss" scoped>
.nav-bar {
  background-color: #f5f5f5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
}

.main {
  padding: 20px 30px;
}
</style>
