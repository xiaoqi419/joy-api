<script setup lang="ts">
import { ref } from 'vue';

const carouselItem = ref(['Join', 'Relaxation', 'Selection', 'WalkingTogether']);
</script>

<template>
  <div class="notice">
    <!--轮播图-->
    <el-row>
      <el-col :span="24">
        <el-carousel :interval="3000" height="200px" type="card" motion-blur>
          <el-carousel-item v-for="item in carouselItem" :key="item">
            <joy-svg-icon :icon="item" class="icon-menu" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!--平台介绍-->
    <div class="platform-introduction">
      <el-row>
        <el-col :span="24">
          <h2>平台介绍</h2>
          <div class="timeline">
            <el-timeline :hide-timestamp="true">
              <el-timeline-item color="#307af6" center placement="top">
                <el-card>
                  <p>
                    <code>JoyApi</code>
                    永久免费。
                  </p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item color="#307af6" center placement="top">
                <el-card>
                  <p>
                    <code>JoyApi</code>
                    是一个开源的API接口分享调用平台，它可以帮助开发者快速阅读接口文档，同时也帮助新手开发者快速调用现成接口完成开发。
                  </p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item color="#307af6" center placement="top">
                <el-card>
                  <p>
                    <code>JoyApi</code>
                    由
                    <code>Vue3</code>
                    <code>Element-Plus</code>
                    <code>TypeScript</code>
                    等主流技术栈开发完成。
                  </p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item color="#307af6" center placement="top">
                <el-card>
                  <p>
                    <code>JoyApi</code>
                    上的接口开发语言有
                    <code>Python</code>
                    <code>NodeJS</code>
                    <code>JAVA</code>
                    等，不同接口不同开发环境，如果接口有问题请及时联系接口负责人解决。
                  </p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item color="#307af6" center placement="top">
                <el-card>
                  <p>待补充...</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notice {
  width: 100%;

  code {
    color: #307af6;
    font-weight: bold;
    font-size: 16px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .icon-menu {
    width: 100%;
    height: 100%;
  }

  .platform-introduction {
    margin-top: 20px;

    .timeline {
      margin-top: 20px;
    }
  }
}
</style>
