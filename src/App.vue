<template>
  <div class="flex-center-vertically-text" v-if="!checkUser">A CARREGAR ...</div>
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
    this.$router.beforeEach(async (to,from,next) => {

        if(to.name === 'Dashboard')
        {
          if(this.$store.state.user)
          {
            next();
            this.checkUser = true;
            return
          }
          else if(sessionStorage.getItem("Auth_key") != null)
          {
            this.checkUser = false;
            this.$axios.defaults.headers.common.Authorization = sessionStorage.getItem("Auth_key");
            await this.$store.dispatch("loadUser").then(() => {
              next();
              setTimeout(() => {
                this.checkUser = true;
              }, 400);
            })
            .catch(() => {
              next({ name: "Login" });
              setTimeout(() => {
                this.checkUser = true;
              }, 400);
            })
            return
          }
          else
          {
            next({ name: "Login" });
            this.checkUser = true;
            return
          }
        }
        else if(to.name === 'Login')
        {
          if(this.$store.state.user)
          {
            next({ name: "Dashboard" });
            this.checkUser = true;
            return;
          }
          else if(sessionStorage.getItem("Auth_key") != null)
          {
            this.checkUser = false;
            this.$axios.defaults.headers.common.Authorization = sessionStorage.getItem("Auth_key");
            await this.$store.dispatch("loadUser").then(() => {
              next({ name: "Dashboard" });
              setTimeout(() => {
                this.checkUser = true;
              }, 400);
            })
            .catch(() => {
              next({ name: "Login" });
              setTimeout(() => {
                this.checkUser = true;
              }, 400);
            })
            return  
          }
          else
          {
            next();
            this.checkUser = true;
            return
          }
        }

      if(sessionStorage.getItem("Auth_key") != null)
      {
        this.checkUser = false;
        this.$axios.defaults.headers.common.Authorization = sessionStorage.getItem("Auth_key");
        await this.$store.dispatch("loadUser").then(() => {
          next();
          setTimeout(() => {
            this.checkUser = true;
          }, 400);
        })
        .catch(() => {
          next();
          setTimeout(() => {
            this.checkUser = true;
          }, 400);
        })
        return
      }
      
      this.checkUser = true;
      next();
    })
  }
}
</script>

<style>

.flex-center-vertically-text {
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

#overlay-box {
 z-index: -2 !important;
}

* {
      margin: 0;
  }

.Vue-Toastification__toast{
  min-height: 50px !important;
  padding: 15px 24px !important;
}

.Vue-Toastification__close-button:focus{
  outline: none;
  border: none;
}
</style>
