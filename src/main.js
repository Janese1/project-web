import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false //是否启动生产消息



Vue.prototype.$colorName=(name) => {
  while (name.length<10){
    name+=name
  }
  let temp = [];
  temp.push("#");
  for (let index = 0; index < 3; index++) {
    temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16));
  }
  return temp.slice(0, 5).join('').slice(0, 4);
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

