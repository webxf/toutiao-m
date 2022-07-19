import request from '@/utils/request'
import storage from '@/utils/storage'
export const getChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
export const delChannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
// 添加用户频道
export const addChannels = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
const TOUTIAO_CHANNELS = 'TOUTIAO_CHANNELS'
export const getMychannelsByLocal = () => storage.get(TOUTIAO_CHANNELS)

export const setMychannelsToLocal = (channel) =>
  storage.set(TOUTIAO_CHANNELS, channel)
