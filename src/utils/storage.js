// class封装
class Storage {
  // JSON.parse(localStorage.getItem('TOUTIAO_TOKEN')) || {}
  get(key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(key)
    } catch {
      return value
    }
  }

  //  localStorage.setItem('TOUTIAO_TOKEN', JSON.stringify(payload))
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()

export default storage
