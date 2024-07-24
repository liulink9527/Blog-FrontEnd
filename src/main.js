import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import './assets/css/iconfont.css'
import Echarts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import VueCalendarHeatmap from 'vue-calendar-heatmap'
import tagCloud from './components/tag-cloud'
import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.component('v-chart', Echarts)
Vue.use(VueCalendarHeatmap)
Vue.use(tagCloud)
Vue.prototype.$moment = dayjs

Vue.filter('date', function (value, formatStr = 'YYYY-MM-DD') {
  return dayjs(value).format(formatStr)
})

Vue.filter('dateTime', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).format(formatStr)
})

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    switch (response.data.code) {
      case 40001:
        Vue.prototype.$message({
          type: 'error',
          message: response.data.message,
        })
        // router.push({ path: '/login' })
        break
      case 50000:
        Vue.prototype.$message({
          type: 'error',
          message: response.data.message,
        })
        break
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
