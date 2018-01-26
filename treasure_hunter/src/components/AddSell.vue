<template>
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':sellModalFlag}">
    <div class="md-modal-inner">
      <div class="md-top">
        <div class="md-title">Add</div>
        <button class="md-close" @click="registerModalFlag=closeForm()">Close</button>
      </div>
      <div class="md-content">
        <div class="confirm-tips">
          <div class="error-wrap">
            <span class="error error-show" v-if="errorTip">{{errorMsg}}</span>
          </div>

          <ul>
            <li class="regi_form_input">
              <i class="icon IconPeople"></i>
              <input type="text" tabindex="1" name="name" v-model="name" class="regi_login_input regi_login_input_left" placeholder="Product Name" data-type="loginname" required>
            </li>

            <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input type="text" tabindex="2" name="price" v-model="price" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Price" >
          </li>

            <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input type="text" tabindex="3" name="description" v-model="description" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Description" >
          </li>

            <li class="regi_form_input noMargin radio">
              <input type="radio" id='isAuction' v-model="isAuction" name="contact" value="isAuction">
                <label for="isAuction">Auction</label>

              <input type="radio" id='notAuction' v-model="isAuction" name="contact" value="notAuction">
                <label for="notAuction">Sell</label>
            </li>

            <li v-if="isAuction==='isAuction'" class="regi_form_input noMargin radio">
              <span>Duration</span>
              <input type="radio" id='1Day' v-model="expire" value=1>
                <label for="1Day">1 Day</label>
              <input type="radio" id='3Day' v-model="expire" value=3>
                <label for="3Day">3 Days</label>
              <input type="radio" id='7Day' v-model="expire" value=7>
                <label for="7Day">7 Days</label>
            </li>

            <li class="regi_form_input noMargin">
              <i class="icon IconPwd"></i>
              <input type="file" tabindex="4" name="image" id="image-upload" @change="onFileChange" multiple class="regi_login_input regi_login_input_left login-input-no input_text">
            </li>
          </ul>
        </div>
        <div class="login-wrap">
          <input type="submit" class="btn-login" @keyup.enter="addSell" @click="addSell" value="Add"></input>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .md-modal {
    width: 450px;
  }
 .radio {
    border: none;
  }
</style>

<script>
  import FormData from 'form-data'
  import './../assets/css/login.css'
  import axios from 'axios'
export default {
  data() {
    return {
      name : '',
      price: '',
      description: '',
      file: null,
      isAuction: '',
      expire: 0,
      errorTip : false,
      errorMsg : '',
    }
  },
  computed: {
    sellModalFlag() {
      return this.$store.state.sellModalFlag;
    },
  },
  methods: {
    messageModalUpdate() {
      this.$store.commit("messageModalUpdate",  "");
    },
    clearOutForm() {
      this.name = '';
      this.price= '';
      this.description = '',
      this.file = null,
      this.isAuction = '',
      this.expire = 0,
      this.errorTip = false;
      this.errorMsg = '';
    },

    addSell() {
        if (!(this.name && this.price ) ) {
          this.errorTip = true;
          this.errorMsg = "form missing or incorrect";
          return;
      }

      let data = new FormData();
      data.append('file', this.file);
      data.append('name', this.name);
      data.append('price', this.price);
      data.append('seller', this.$store.state.nickName);
      if (this.isAuction == 'isAuction'){
        data.append('isAuction',  true);
      } else {
        data.append('isAuction',  false);
      }
      const expiration =  new Date().setDate(new Date().getDate() + parseInt(this.expire))
      data.append('expire', expiration);
      data.append('productDescription', this.description);
      
      axios.post("/items/addSell", data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
        }).then((response) => {
              let res = response.data;
              this.$store.commit("sellModalUpdate",);
              this.clearOutForm();
              this.$emit("logged","refresh");
        }).catch((err) => {
            this.errorTip = true;
            this.errorMsg = err.message;
        });
      },
 
      onFileChange(event) {
        this.file = event.target.files[0]
      },

      closeForm(){
          this.clearOutForm();
          this.$store.commit("sellModalUpdate");
          return true;
      },
  },
  components: {
  }
}
</script>