<template>
    <div class="login">
        <div class="login-box">
            <div class="logo">
              <img src="../../assets/img/logo.png" alt="" />
              <h2>Zona de Administração</h2>
            </div>
            <form  @submit.prevent="login" >
                <div class="user-box">
                    <input type="text" required v-model="user.email" />
                    <label>Endereço de E-mail</label>
                </div>
                <div class="user-box">
                    <span class="eye-span" :title="eyePassword ? 'Mostrar Palavra-Passe' : 'Ocultar Palavra-Passe'" @click="toggleEyePassword">
                        <i :class="eyePassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>                    
                    </span>
                    <input :type="eyePassword ? 'password' : 'text'" required v-model="user.password" />
                    <label>Palavra-Passe</label>
                </div>
                <button type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Iniciar Sessão
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            eyePassword: true,
        }
    },
    methods:{
        toggleEyePassword()
        {
            this.eyePassword = !this.eyePassword;
        },
        login()
        {

          this.$axios.post('login', this.user)
          .then((response) => {
            this.$axios.defaults.headers.common.Authorization = "Bearer " + response.data.access_token
            this.$store.dispatch("loadUser").then(() => {
              sessionStorage.setItem("Auth_key", "Bearer " + response.data.access_token)
              this.$router.push({ name: "Dashboard" })
            })
          })
          .catch((error) => {
            if(error.response.status == 0)
            {
              this.$toast.error("Erro ao iniciar sessão", {position: "top", duration: 5000})
            }
            else
            {
              this.$toast.warning(error.response.data.errors.msg, {position: "top", duration: 5000})
            }
          })

        }
    },
};
</script>

<style scoped>

.logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 28px;
}

form{
  text-align: center;
}

img{
  width: 20%;
}

.eye-span{
    color: #999999;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    padding-right: 5px;
    cursor: pointer;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    margin-top: 10px;
}

.eye-span:hover{
    color: #ff7f04;
}

.login{
    min-height: 100vh;
    width: 100%;
    background: #efefef;
    /* background: linear-gradient(#efefef, #a2a2a2); */
    font-family: sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.login-box {
  position: absolute;
  top: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(0%, -50%);
  background: white;
  box-sizing: border-box;
  box-shadow: 0 5px 10px 0px rgb(0 0 0 / 10%);
  border-radius: 10px;
}

@media(max-width: 460px)
{
  .login-box {  
    width: 90%;
  }
}

.login-box h2 {
  margin: 0;
  padding: 0;
  color: black;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 0em;
  line-height: 2em;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: black;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #afafaf; 
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 15px;
  color: #999999;
  pointer-events: none;
  transition: .5s;
  font-family: monospace;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #ff7f04;
  font-size: 12px;
}

.login-box .user-box input:focus,
.login-box .user-box input:valid {
  border-bottom: 1px solid #ff7f04;
}



.login-box form button, .login-box form button:focus-visible {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: black;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px;
  border: none;
  background: transparent;
  outline: none;
}

.login-box button:hover {
    background: #ff7f04cf;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #ff7f04,
                0 0 25px #ff7f04,
                0 0 50px #ff7f04,
                0 0 100px #ff7f04;
    cursor: pointer;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff7f04);
  animation: btn-anim1 3s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #ff7f04);
  animation: btn-anim2 3s linear infinite;
  animation-delay: .8s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #ff7f04);
  animation: btn-anim3 3s linear infinite;
  animation-delay: 1.5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #ff7f04);
  animation: btn-anim4 3s linear infinite;
  animation-delay: 2.2s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

</style>
