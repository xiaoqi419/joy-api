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
                  <p>待补充&nbsp;...</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--网站初衷-->
    <div class="original">
      <el-row>
        <el-col :span="24">
          <h2>网站初衷</h2>
          <p class="content">
            <code>JoyApi</code>
            是我很早就在设想的一个项目,由于时间不充足加之技术难度导致项目一直搁浅。
            做这个项目的初衷也是想起了当年那个刚入行的小白，不会写后端，又苦于囊中羞涩导致很多想使用的API
            没有办法使用到自己的作品中，这才一直有个执念：我一定要让每一个热爱编程，热爱技术的开发者能没有顾虑的去实现自己的想法。
            <br />
          </p>
          <div style="text-align: center; margin-top: 50px">
            <code>热爱</code>
            <code>创造</code>
            <code>开源</code>
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

  .original {
    margin-top: 20px;

    .content {
      text-indent: 2em;
      line-height: 2em;
      margin-top: 20px;
    }
  }
}
</style>
