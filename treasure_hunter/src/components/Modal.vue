<template>
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':messageModalFlag}">
    <div class="md-modal-inner">
      <div class="md-top" >
          <div class="md-title">MESSAGE</div>
          <button class="md-close" @click="messageModalUpdate">Close</button>
      </div>
      <div class="md-content">
        <span>{{message}}</span> 
        <div class="login-wrap">
          <input type="submit" @click="messageModalUpdate" class="btn-login" value="Close"></input>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .md-modal {
    width: 450px;
  }
</style>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    message() {
      return this.$store.state.message;
    },
    messageModalFlag() {
      return this.$store.state.messageModalFlag;
    },

  },
  methods: {
    messageModalUpdate() {
      this.$store.commit("messageModalUpdate",  "");
    }
  },
  components: {
  }
}
</script>