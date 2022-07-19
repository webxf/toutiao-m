<template>
  <div>
    <!-- 渲染一张图片 -->
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 0"
    />
    <!-- 渲染2张图片-->
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 1"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      ></van-image>
    </van-cell>
    <!-- 渲染3张图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            :src="item"
            height="2rem"
            width="3rem"
          ></van-image>
        </div>
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc() {
      const arc = this.articleInfo
      const time = dayjs(arc.pubdate).fromNow()
      return `${arc.aut_name} ${arc.comm_count}评论 ${time}`
    }
  }
}
</script>

<style scoped lang="less">
// 头部固定的样式
</style>
