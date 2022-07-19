<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        class="search"
        background="#3296fa"
        @focus="focus"
      />
    </form>
    <!-- 搜索历史 -->
    <!-- <SearchHistory></SearchHistory> -->
    <!-- 搜索建议 -->
    <!-- <SearchSuggestion></SearchSuggestion> -->
    <!-- 搜索结果 -->
    <!-- <SearchResult></SearchResult> -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },

  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  // 利用计算属性来动态渲染结果，历史，建议
  computed: {
    componentName() {
      // 如果搜索框词为0，就显示搜索历史
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      // 如果搜索框为false，就显示搜索结果

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 否则显示搜索建议
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch() {
      console.log('输入')
    },
    onCancel() {
      this.$router.back()
    },
    focus() {
      // 当输入框显示搜索结果之后，想要退回搜索框，不能用if来判断，不然会递归了
      // 用isShowSearchResult来判断，如果为false，computed就不会计算result了，则会重新计算搜索历史和搜索建议
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
