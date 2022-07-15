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
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="60 * 1000"
            v-if="isCountDown"
            @finish="isCountDown = false"
            format="ss s"
          />
          <van-button
            v-else
            slot="right-icon"
            class="code-btn"
            size="small"
            round
            @click.prevent="isShow"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px" class="btn">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { login, sendCode } from '@/api/user'
// 按需导入表单正则匹配规则
import { mobileRules, codeRules } from './rule'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isCountDown: false
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
      Toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log(res) // 拿到的是axios对本次请求的resolve的结果
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/layout')
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log(err) // 拿到的是axios对本次请求失败的reject的结果   err.response.status表示失败的状态码  err.response.data可以获取失败时候的data数据
        const status = err.response.status
        let message = '登录错误，请重试'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    async isShow() {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送验证码
        await sendCode(this.mobile)
        // 手机号验证通过，显示验证码
        this.isCountDown = true
      } catch (err) {
        // 表单校验失败
        if (!err.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
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
