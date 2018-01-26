<template>
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':itemModalFlag}">
    <div class="md-modal-inner" style="padding:1em">
      <div class="md-top" >
       <button class="md-close" @click="itemModalUpdate">Close</button>
      </div>
      <div class="md-content">
        <div class="pic center" style="text-align:center">
          <img v-lazy="productImg" alt="">
        </div>

        <table style="width:100%; margin: 2em">
        <tr>
          <td class="width"><span class="text">Current Bid:</span></td>
          <td><span class="value" style="color:#000;font-weight:700;">${{price}}</span></td>
        </tr>
        <tr>
          <td><span class="text" >Winner:</span></td>
          <td><span class="value" style="color:#000;font-weight:700;">{{winner}}</span></td>
        </tr>
        <tr>
          <td><span class="text">Time Left:</span></td>
          <td><span class="value" style="font-weight:700;">{{day}}:{{hr}}:{{min}}:{{sec}}</span></td>
        </tr>
        <tr>
          <td><span class="text">Description:</span></td>
        </tr>
        <div class="description">
          <span class="value">{{description}}</span>
        </div>
      </table>

        <div class="login-wrap">
          <input type="submit" @click="submitBid" class="btn-login" value="Bid By $5.00"></input>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .md-modal {
    width: 600px;
  }
  .name {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    height: 1em;
    font-size: 1.5em;
    line-height: 1em;
    font-family: "moderat", sans-serif;
    font-weight: bold;
    overflow: hidden;
  }
  .price {
    color: #333
  }
  .line {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    float: left;
    line-height: 8px;
    font-size: 1.25em;
    clear:both;
  }
  .description{
    overflow: hidden;
    float: left;
    clear: both;
    margin-bottom: 1.25em;
    margin-top:0.5em;
  }
  .value {
    color: #d1434a;
    float: left;
    font-size: 1.25em;
  }
  .text {
    color: #666;
    float: left;
    font-size: 1.25em;
  }
  .v-center {
    padding-top: 0.25em;
    padding-bottom: 0.25em;
  }
  .width {
    width: 25%;
  }



</style>

<script>
import countdown from 'vuejs-countdown';
import axios from 'axios';

export default {
  data() {
    return {
      time:  '',
      day: 0, hr: 0, min: 0, sec: 0

    }
  },
  mounted(){
    this.countdown()
  },
  computed: {
    itemModalFlag() {
      return this.$store.state.itemModalFlag;
    },
    productImg() {
      return this.$store.state.productImg;
    },
    name(){
      return this.$store.state.name;
    },
    price(){
      return this.$store.state.price;
    },
    description() {
      return this.$store.state.description;
    },
    expire(){
      return this.$store.state.expire;
    },
    winner(){
      return this.$store.state.winner;
    }

  },
    sockets: {
        newBid2(item) {
            this.$store.commit("bid",item); // update all other clients auction window

        }
    },
  methods: {
        countdown: function () {
      const end = Date.parse(new Date(this.$store.state.expire))
      const now = Date.parse(new Date())
      const msec = end - now
      let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt(msec / 1000 / 60 / 60 % 24)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      this.day = day
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this
      setTimeout(function () {
        that.countdown()
      }, 1000)
    },
    submitBid() {
      let bid = 5;

         axios.post("/items/bid",{
            fullname: this.$store.state.nickName,
            productId: this.$store.state.productID,
            bidPrice: this.$store.state.price + bid,
        }).then((res)=>{
            if(res.status==200){
                let item = {
                    bid:bid,
                    winner:this.$store.state.nickName
                }
              this.$store.commit("bid", item); //update the bidder self auction window
              this.$socket.emit("newBid", item); // trigger the newBid app.js listening on 
            } else if (res.status==402){
                console.log('error',res.satus);
              
            }
        });
    },

    itemModalUpdate() {
      this.$store.commit("itemModalUpdate", '');
      this.$store.commit("closePop");
    }
  },
  components: {
    countdown
  },



}
</script>