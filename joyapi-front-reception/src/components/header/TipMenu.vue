<script setup lang="ts" name="tip-menu">
const tipStr = 'This is a tip menu';
</script>

<template>
  <div>
    {{ tipStr }}
  </div>
</template>

<style scoped lang="scss">
.el-dropdown-link:focus {
  outline: none;
}
</style>
