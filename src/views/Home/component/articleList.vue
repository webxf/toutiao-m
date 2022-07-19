<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadOFF"
      success-text="刷新成功"
    >
      <van-list
        @load="loadOFF"
        :immediate-check="false"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了~~"
        :error.sync="error"
        error-text="加载出错了"
      >
        <articleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/new'
import articleItem from './articleItem.vue'
export default {
  name: 'articleList',
  components: {
    articleItem
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshing: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重试')
        }
      }
    },
    async loadOFF() {
      try {
        // if (Math.random() < 0.7) {
        //   throw new Error('错误了')
        // }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        console.log(data)

        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.pre_timestamp = data.data.pre_timestamp
        this.loading = false
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.iconfont-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
