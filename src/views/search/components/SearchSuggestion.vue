<template>
  <div>
    <van-cell v-for="(item, index) in highLight" :key="index">
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 引入api
import { getSearchResult } from '@/api/search'
export default {
  // 搜索关键词
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggesstions: []
    }
  },
  methods: {
    // 获取搜索建议，并处理数据
    async getSearchResult() {
      const res = await getSearchResult(this.keywords)
      if (res.data.data.options.length === 0) {
        this.$toast.fail('暂无结果')
      }
      this.suggesstions = res.data.data.options.filter(Boolean)
      //   console.log(res)
    }
  },
  // 通过watch属性检测输入框的变化，来调用函数
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchResult()
      }
    }
  },
  computed: {
    highLight() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggesstions.map((str) =>
        str.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
