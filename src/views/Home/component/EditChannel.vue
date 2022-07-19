<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '90%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in myChannels"
            :key="item.id"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="delFn(item, index)"
          >
            <template #icon>
              <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <van-cell title="推荐频道"> </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in getrecommendChannels"
            :key="item.id"
            @click="addChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '../../../api/channel'
export default {
  // props为复杂数据类型vue不建议修改
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    async getChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    delFn(channel, index) {
      // 对边缘情况做处理
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('del-channel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-channel', index)
      }
    },
    addChannel(channel) {
      this.$emit('addchannel', { ...channel })
    }
  },
  computed: {
    getrecommendChannels() {
      return this.allChannels.filter((item) => {
        const result = this.myChannels.find((res) => res.id === item.id)
        if (result) {
          return false
        } else {
          return true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    padding: 0 30px;
    height: 48px;
    color: red;
    border: 0.02667rem solid red;
  }
}
.my-channel {
  :deep(.van-grid-item__content) {
    position: relative;
    background-color: #f4f5f6;

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        font-size: 30px;
      }
    }
  }
}
// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;
    background-color: #f5f6f7;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
