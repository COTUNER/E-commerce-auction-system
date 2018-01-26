// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';

import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import VueSocketio from 'vue-socket.io';
import App from './App.vue';
import router from './router';


Vue.use(Vuex);
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bars.svg',
});

Vue.use(infiniteScroll);

const store = new Vuex.Store({
  state: {
    nickName: '',
    carCount: 0,
    loginModalFlag: false,
    message: '',
    messageModalFlag: false,
    sellModalFlag: false,
    updateModalFlag: false,
    cartList: [],
    sellList: [],
    sellCount: 0,
    itemModalFlag: false,
    overLayFlag: false,
    name: '',
    price: 0,
    expire: '',
    description: '',
    productID: '',
    winner: '',
    updateProductId: 0,
    productImg: '',
  },
  mutations: {
    updateUserInfo(state, user) {
      
      state.nickName = user.fullname;
      state.cartList = user.cartList;
    },
    updateCartCount(state, cartCount) {
      state.carCount += cartCount;
    },    ////////
    updateSellCount(state, sellCount) {
        state.SellCount += sellCount;
    },
    loginModal(state, popup) {
      state.loginModalFlag = popup;
    },
    messageModalUpdate(state, message) {
      state.message = message;
      state.messageModalFlag = !state.messageModalFlag;
    },
    sellModalUpdate(state) {
        state.sellModalFlag = !state.sellModalFlag;
    },
    updateModalUpdate(state, productId) {
        state.updateModalFlag = !state.updateModalFlag;
        state.productId = productId;
    },
    itemModalUpdate(state, item) {
      state.itemModalFlag = !state.itemModalFlag;
      
      if (item && item.productName && item.productPrice
        && item.productDescription && item.auction.expire) {
        state.productID = item.productId;
        state.name = item.productName;
        state.price = item.productPrice;
        state.description = item.productDescription;
        state.expire = item.auction.expire;
        state.winner = item.auction.winningBidBy;
        state.productImg = item.productImg;
      }
    },
    cartListUpdate(state, cartList) {
      state.cartList = cartList;
    },
    expireUpdate(state, expire1) {
      state.expire = expire1;
    },
      sellListUpdate(state, sellList) {
          state.sellList = sellList;
      },
    closePop(state) {
      state.overLayFlag = false;
      state.itemModalFlag = false;
      state.messageModalFlag = false;
      state.loginModalFlag = false;
      state.loginModalFlag = false;
    },
    showPop(state) {
      state.overLayFlag = true;
    },
    bid(state, item) {
      state.price += item.bid;
      state.winner = item.winner;
    },
  },
  getters: {
    greeting(state) {
      if (state.nickName) {
        return `Hi, ${state.nickName}!`;
      }
      return '';
    },
    nickName(state) {
      return state.nickName;
    },
  },
});


Vue.use(VueSocketio, 'localhost:3001', store);

new Vue({

  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    customEmit(val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
  },
});
