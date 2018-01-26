import Vue from 'vue';
import Router from 'vue-router';
import ItemsList from '@/views/ItemsList';
import Cart from '@/views/Cart';
import Sell from '@/views/Sell';
import Chat from '@/views/Chat';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ItemsList',
      component: ItemsList,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/sell' ,
      name: 'Sell' ,
      component: Sell,
    },
    {
      path: '/chat' ,
      name: 'Chat' ,
      component: Chat,
    }
  ],
});
