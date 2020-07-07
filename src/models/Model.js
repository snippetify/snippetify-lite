import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  // Base url
  baseURL () {
    return process.env.VUE_APP_API_URL
  }

  // implement a default request method
  request (config) {
    return this.$http.request(config)
  }
}
