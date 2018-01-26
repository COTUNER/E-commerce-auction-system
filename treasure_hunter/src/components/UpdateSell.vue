<template>
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':updateModalFlag}">
    <div class="md-modal-inner">
      <div class="md-top">
        <div class="md-title">Update Item Details</div>
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
              <input type="text" tabindex="1" name="name" v-model="name" class="regi_login_input regi_login_input_left" v-bind:placeholder="product ? product.productName: ''" data-type="loginname" required>
            </li>

            <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input type="text" tabindex="2" name="price" v-model="price" class="regi_login_input regi_login_input_left login-input-no input_text" v-bind:placeholder="product ? product.productPrice: ''">
          </li>

            <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input type="text" tabindex="3" name="description" v-model="description" class="regi_login_input regi_login_input_left login-input-no input_text" v-bind:placeholder="product ? product.productDescription: ''">
            </li>
            <!-- <li class="regi_form_input noMargin">
              <i class="icon IconPwd"></i>
              <input type="file" tabindex="4" name="image" id="image-upload" @change="onFileChange" multiple class="regi_login_input regi_login_input_left login-input-no input_text">
            </li> -->
          </ul>
        </div>
        <div class="login-wrap">
          <input type="submit" class="btn-login" @keyup.enter="updateSell" @click="updateSell" value="Update"></input>
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
  props: ['product'],
  data() {
    return {
      // productId: this.product.productId,
      name : '',
      price: '',
      description: '',
      errorTip : false,
      errorMsg : '',
    }
  },
  computed: {
    updateModalFlag() {
      return this.$store.state.updateModalFlag;
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
      this.errorTip = false;
      this.errorMsg = '';
    },

    updateSell() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      console.log("yunrou test");
      axios.post("/items/updateSell", {
           'name': this.name,
           'price': this.price,
           'productId': this.$store.state.productId,
           'description': this.description,
           }, {
        headers: {
          'Authorization': "bearer " + token,
        }
        }).then((response) => {
              let res = response.data;
              this.$store.commit("updateModalUpdate", 0);
              this.clearOutForm();
              console.log("emit sadie bad")
              this.$emit("logged","refresh");
              console.log("emit sadie refresh")
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
          this.$store.commit("updateModalUpdate", 0);
          return true;
      },
  },
  components: {
  }
}
</script>