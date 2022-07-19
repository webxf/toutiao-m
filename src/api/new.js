import request from '@/utils/request'

export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
