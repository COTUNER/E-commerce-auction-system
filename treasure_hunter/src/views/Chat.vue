<template>
  <div>
    <nav-header v-on:senddata="getData"></nav-header>
    <MessageModal></MessageModal>
    <ItemModal></ItemModal>
    <nav-bread>
      <a href="\">Buy it Now</a>
      <a href="\">Auctions</a>
      <a href="\sell">Sell</a>
      <a href="\Cart">Cart</a>
      <a href="\Chat">Chatroom</a> <!-- Chat-->
    </nav-bread>
<div id ="chatApp">
    <div class="container">
    <h1>Treasure Hunter Chatroom</h1>
    <table style="width: 100%">
      <td>
      <h2>Online Users</h2>      
      <div class="onlineUsers">  
        <ul class="users">

        <!-- Create a loop to display online users -->

          <li>list</li>
          <li>of</li>
          <li>users</li>
        </ul>
      </div>
    </td>

      <td> <!-- column for the actual chatbox -->
      <div class="chatBox">
      <h2>Chatbox</h2>
      <ul class="messages">
        <li>Here the messages will be displayed</li>
        <li>And another one </li>
        <li>And another one</li>
      </ul> <!--messages-->

      </div>
      </td>

      <tr style="width=100%">Type Message Here</tr>
 


    </table>

    </div><!--container--> 

    </div><!--The entire root -->
</div><!-- chat app-->
</template>

<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
 <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
<style>

table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
  .onlineUsers, chatBox{
  display: flex;
  }

  .load-more {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .list-wrap ul::after{
    clear: both;
    content: '';
    height : 0;
    display :block;
    visibility: hidden;
  }
  .a-pic{
    cursor: default;
    text-decoration: none;
  }
</style>


<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import MessageModal from '@/components/Modal.vue'
import ItemModal from '@/components/ItemDetailModal.vue'

import axios from 'axios'

export default {
  data() {


  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    MessageModal,
    ItemModal
  },
  mounted() {

  },
  computed: {

  },
  methods: {
      }
}
  
</script>
