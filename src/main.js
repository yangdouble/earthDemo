import Vue from 'vue'

// import 'lib-flexible' // 移动端适配

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, download, handleTree } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })

if (typeof XE !== "undefined") {
  console.log('判断地图是否存在1')
  // 如果XE存在，说明EarthSDK已载入
  /* eslint-disable*/
  function startup() {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
  // 1 XE.ready()会加载Cesium.js等其他资源，注意ready()返回一个Promise对象。
  // XE.ready().then(startup);
  XE.ready()
  .then(() => {
    // º”‘ÿ±ÍªÊ≤Âº˛
    // const p1 = XE.HTML.loadJS("@/earthMap/XbsjEarth-Plugins/plottingSymbol/plottingSymbol.js");
    const p1 = XE.HTML.loadJS("http://www.earthsdk.com/v/last/XbsjEarth-Plugins/plottingSymbol/plottingSymbol.js");
    // const p2 = XE.HTML.loadJS("@/earthMap/XbsjEarth-Plugins/customPrimitive/customPrimitive.js");
    const p2 = XE.HTML.loadJS("http://www.earthsdk.com/v/last/XbsjEarth-Plugins/customPrimitive/customPrimitive.js");
    // const p3 = XE.HTML.loadJS("@/earthMap/XbsjEarth-Plugins/customPrimitiveImage/customPrimitiveImage.js");
    const p3 = XE.HTML.loadJS("http://www.earthsdk.com/v/last/XbsjEarth-Plugins/customPrimitiveImage/customPrimitiveImage.js");
    const p5 = XE.HTML.loadJS("http://www.earthsdk.com/v/last/XbsjEarth-Plugins/plottingSymbol2/plottingSymbol2.js");
    const p4 = XE.HTML.loadJS("//earthsdk.com/v/last/Apps/Demos/Viewer/scripts/three.min.js"); // ≤ø∑÷Õº‘™–Ë“™º”‘ÿthree.js
    return Promise.all([p1, p2, p3, p5 ,p4]);
  })
  .then(() => {
    startup();
  });
} else if (typeof Cesium !== "undefined") {
  console.log('判断地图是否存在2')
  // 如果XE不存在，存在Cesium，则此时用纯Cesium进行开发
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}else {
  console.log('判断地图是否存3')
  // 如果XE不存在，存在Cesium，则此时用纯Cesium进行开发
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}
