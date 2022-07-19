import request from '@/utils/request'
/**
 *
 * @param {Query参数} q
 * @returns
 */
export const getSearchResult = (q) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
