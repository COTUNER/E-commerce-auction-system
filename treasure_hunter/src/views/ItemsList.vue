<template>
  <div>
    <nav-header v-on:senddata="getData"></nav-header>
    <MessageModal></MessageModal>
    <ItemModal></ItemModal>
    <nav-bread>
          <a href="\">Home</a>
          <a href="\sell">Sell</a>
          <a href="\Cart">Cart</a>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:;" @click="sortItems" class="price">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short">
              </use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">

          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)" :class="{'cur':priceSelected=='all'}" @click="priceSelected='all'">
                  All
                </a>
              </dd>
              <dd v-for="(price, index) in priceFilter" :key="index">
                <a href="javascript:void(0)" v-bind:class="{'cur':priceSelected==index}" @click="setPriceFilter(index)">
                  ${{ price.startPrice}} - ${{price.endPrice}}
                </a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">

            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in itemsList" :key="item._id">
                  <div class="pic">
                    <a href="#"  class="a-pic"><img v-lazy="item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">${{item.productPrice}}</div>
                    <div class="seller">Sold By: {{item.soldBy}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" v-if="item.auction.isAuction" class="btn btn--m" @click="itemModalUpdate(item)">Bid</a>
                      <a href="javascript:;" v-else class="btn btn--m" @click="addCart(item.productId)">Add to Cart</a>
                    </div>
                  </div>
                </li>

              </ul>
            </div>

            <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
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
    return {
      itemsList: [],
      sortFlag: true,
      page: 1,
      pageSize: 8,
      busy: true,
      item: {},


      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '200.00'
        },
        {
          startPrice: '200.00',
          endPrice: '400.00'
        },
        {
          startPrice: '400.00',
          endPrice: '1000.00'
        },
        {
            startPrice: '1000.00',
            endPrice: '2000.00'
        },
        {
            startPrice: '2000.00',
            endPrice: '5000.00'
        }
      ],
      priceSelected: 'all',
      filterBy: false,
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    MessageModal,
    ItemModal
  },
  mounted() {
      console.log(this.$store.state.nickName,"xx");
      console.log(this.$store.state.expire,"xx");
    this.getItemsList();
  },
  computed: {
    overLayFlag() {
      return this.$store.state.overLayFlag;
    }
  },
  methods: {
      getData:function(data){
          console.log("get!!!!");
          if(data) {
              this.nickName1 = data.fullname;
              console.log("receive",data.fullname);
          }
          this.getSellList();
      },
    sortItems() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getItemsList()
    },
    getItemsList(flag) {

      let params = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel:this.priceSelected
      }
      axios.get("/items/list", {
        params: params
      }).then((response) => {
        let res = response.data;
        if (res.status == 0){
          if (flag){
            this.itemsList =  this.itemsList.concat(res.result.list);
            if (res.result.count === 0){
              this.busy = true;
            } else {
              this.busy = false;
            }

          } else {
            this.itemsList =  res.result.list;
            this.busy = false;
          }
        } else {
          this.itemsList = [];
        }
      });
    },

    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getItemsList(true);
      }, 300);
    },

    addCart(productId){
        console.log(this.$store.state.nickName);
        if(!this.$store.state.nickName){
            this.$store.commit("loginModal", true);
            return;
        }
        axios.post("/items/addCart",{
            fullname:this.$store.state.nickName,
            productId:productId
        }).then((res)=>{
            if(res.status==200){
                this.$store.commit("messageModalUpdate",  "Item added successfully!!!");
            }else{
                this.$store.commit("messageModalUpdate",  "msg:" + res.msg);
            }
        });
    },

    showFilterPop() {
      this.filterBy = true;
      this.$store.commit("showPop");
    },
    closePop() {
      this.filterBy = false;
      this.$store.commit("closePop");
    },
    setPriceFilter(index) {
      this.priceSelected = index;
      this.page =1;
      this.getItemsList();
    },
    itemModalUpdate(item) {
      if(!this.$store.state.nickName){
        this.$store.commit("loginModal", true);
        return;
      }
      if(!item.auction.isAuction){
        return;
      }
      this.$store.commit("itemModalUpdate", item);
      this.$store.commit("expireUpdate", item.auction.expire);
      this.$store.commit("showPop");
    }
  }
}
</script>
