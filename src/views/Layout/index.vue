<template>
  <div>
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
          <span>首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="iconfont icon-shipin"></i>
          <span>视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="iconfont icon-wenda"></i>
          <span>问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="profile">
        <template #icon>
          <i class="iconfont icon-wode"></i>
          <span>我的</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  .iconfont {
    font-size: 0.53333rem;
  }
  span {
    font-size: 0.32rem;
  }
}
</style>
