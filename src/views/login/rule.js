// 登录框正则校验
// 手机号校验
export const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号' }
]
// 验证码校验
export const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^[0-9]{6}$/, message: '请输入6位验证码' }
]
