<template>
  <div class="flex-center-vertically-asd" v-if="!checkUser">A CARREGAR ...</div>
  <loader v-if="!checkUser" object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="1.8" bg="#343a40" objectbg="#999793" opacity="100" disableScrolling="false" name="box"></loader>
  <router-view v-else></router-view>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      checkUser: true,
    }
  },
  mounted() {
    this.$router.beforeEach(async (to) => {
      this.checkUser = false;
      
      setTimeout(() => {
        if(to.name === 'Dashboard')
        {
          if(this.$store.state.user)
          {
            this.checkUser = true;
          }
          else if(sessionStorage.getItem("Auth_key") != null)
          {
            this.$axios.defaults.headers.common.Authorization = sessionStorage.getItem("Auth_key");
            this.$store.dispatch("loadUser").then(() => {
              this.checkUser = true;
            })
            .catch(() => {
              this.$router.push({ name: "Login" });
              this.checkUser = true;
            })
          }
          else
          {
            this.$router.push({ name: "Login" });
            this.checkUser = true;
          }
        }
        else if(to.name === 'Login')
        {
          if(this.$store.state.user)
          {
            this.$router.push({ name: "Dashboard" });
          }
          else if(sessionStorage.getItem("Auth_key") != null)
          {
            this.$axios.defaults.headers.common.Authorization = sessionStorage.getItem("Auth_key");
            this.$store.dispatch("loadUser").then(() => {
              this.$router.push({ name: "Dashboard" });
            })
            .catch(() => {
              this.$router.push({ name: "Login" });
              this.checkUser = true;
            })
          }
          else
          {
            this.checkUser = true;
          }
        }
        else
        {
          this.checkUser = true;
        }
      }, 300);
    })
  }
}
</script>

<style>

.flex-center-vertically-asd {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  z-index: -1;
  color: white;
  padding: 100px;
  font-family: monospace;
  font-size: 17px;
  text-align: center;
  margin-top: 90px !important;
}

/* #app {


} */

#overlay-box {
 z-index: -2 !important;
}

* {
      margin: 0;
  }
</style>
