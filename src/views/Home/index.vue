<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <articleList :id="item.id"></articleList>
      </van-tab>
      <span class="iconfont icon-gengduo" @click="isShowPop"></span>
    </van-tabs>
    <EditChannel
      ref="popup"
      :myChannels="myChannels"
      @del-channel="deleteFn"
      @change-channel="changeChannel"
      @addchannel="addchannels"
    ></EditChannel>
  </div>
</template>

<script>
import // getChannels,
// setMychannelsToLocal,
// getMychannelsByLocal,
// delChannels,
// addChannels
'@/api/channel'
import articleList from './component/articleList.vue'
import EditChannel from './component/EditChannel.vue'
export default {
  data() {
    return {
      active: 0,
      myChannels: [],
      isShow: false
    }
  },
  components: {
    articleList,
    EditChannel
  },
  created() {
    this.getChannels()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getChannels() {
      // try {
      //   if (!this.isLogin) {
      //     const myChannels = getMychannelsByLocal()
      //     if (myChannels) {
      //       this.myChannels = myChannels
      //     } else {
      //       const { data } = await getChannels()
      //       // console.log(data)
      //       this.myChannels = data.data.channels
      //     }
      //   }
      // } catch (err) {
      //   this.$toast.fail('获取列表失败')
      // }
    },
    isShowPop() {
      this.$refs.popup.isShow = true
    },
    async deleteFn(id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      // if (!this.isLogin) {
      //   setMychannelsToLocal(this.myChannels)
      // } else {
      //   try {
      //     await delChannels(id)
      //   } catch (err) {
      //     this.$toast('删除失败')
      //   }
      // }
      this.$toast.success('删除成功')
    },
    changeChannel(val) {
      this.active = val
    },
    async addchannels(val) {
      this.myChannels.push(val)
      // if (!this.isLogin) {
      //   setMychannelsToLocal(this.myChannels)
      // } else {
      //   try {
      //     await addChannels(val.id, this.myChannels.length)
      //   } catch (err) {
      //     return this.$toast.fail('添加失败')
      //   }
      // }
      this.$toast.success('添加成功')
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;

  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
