<script setup lang="ts" name="tip-menu">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const tipStr = 'JOY API - 永不收费';
const disabled = ref(false);
const router = useRouter();

// 网站公告跳转
const goNotice = () => {
  router.push('/notice');
};
</script>

<template>
  <div>
    <el-tooltip :disabled="disabled" placement="bottom" effect="light">
      <span class="tip-title">{{ tipStr }}</span>
      <template #content>
        <div class="tip-content">
          <el-button plain @click="goNotice">网站公告</el-button>
          <el-button plain>开源项目</el-button>
          <el-button plain>友链</el-button>
        </div>
      </template>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
.tip-content {
  width: auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  color: #303133;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.tip-title {
  font-size: 20px;
  color: #409eff;
  cursor: pointer;
}

.el-dropdown-link:focus {
  outline: none;
}

// 低分辨率下隐藏
@media screen and (max-width: 768px) {
  .tip-title {
    display: none;
  }
}
</style>
