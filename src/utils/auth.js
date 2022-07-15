import storage from './storage'
const TOKEN_KEY = 'TOUTIAO_TOKEN'

export const getToken = () => {
  return storage.get(TOKEN_KEY)
}

export const setToken = (value) => {
  return storage.set(TOKEN_KEY, value)
}

export const removeToken = () => {
  return storage.remove(TOKEN_KEY)
}
