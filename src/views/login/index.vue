<template>
  <div>
    <!-- 头部header部分 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="onClickLeft"
      class="navbar"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <van-button slot="right-icon" class="code-btn" size="small" round>
          发送验证码
        </van-button>
      </van-field>
      <div style="margin: 16px" class="btn">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { login } from '@/api/user'
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft() {
      Toast('返回')
    },
    onClickRight() {
      Toast('按钮')
    },
    async onSubmit() {
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3a96fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form .iconfont {
  font-size: 0.48667rem;
}
.van-button {
  background-color: #6db4fb;
  border: none;
}
.code-btn {
  background-color: #ededed;
  color: #666;
  padding: 0px 20px;
}
</style>
