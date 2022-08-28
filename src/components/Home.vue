
<template>
  <input-dialog 
    ref="inputDialog"
    confirmationBtn="Registar"
    cancelBtn="Cancelar"
    title="Registar Festa"
    :distritos="distritos"
    @inputDialog="getDistritosConcelhos">
  </input-dialog> 
  <div class="page-group" ref="inicio">
    <a id="scroll" @click="scrollToElement('inicio')" ref="top-button"><span></span></a>
    <div class="hero_area">
      <!-- header section strats -->
      <header class="header_section">
        <div class="container navbargroup">
          <nav class="navbar navbar-expand-lg custom_nav-container pt-3">
            <a class="navbar-brand">
              <img src="../assets/img/logo.png" alt="" /><span>
                comFesta
              </span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div class="d-flex ml-auto flex-column flex-lg-row align-items-center">
                <!-- <ul class="navbar-nav  ">
                  <li class="nav-item">
                    <a class="nav-link" @click="scrollToElement('festas')"> Festas</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="scrollToElement('contacto')"> Contactar</a>
                  </li>
                </ul> -->
                <div class="d-flex buttons navbar">
                  <a class="text-uppercase custom_orange-btn navbar" @click="scrollToElement('festas')">
                    <span>&#x1F37A; </span> Festas
                  </a>
                  <a class="text-uppercase custom_dark-btn navbar" @click="scrollToElement('contacto')">
                    <span style="font-size: 18px;">&#x2709; </span> Contactar
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <!-- end header section -->
      <!-- slider section -->
      <section class=" slider_section position-relative">
      <div class="container">
        <div class="row">
        <div class="col-md-6">
          <div class="slider_item-detail">
            <div>
              <h1>
              Queres Festa e <br />
              não sabes Onde?
              </h1>
              <p>
                Aqui podes encontrar os locais com festas e descobrir a festa mais próxima de ti.
                Aproveita ainda para divulgar uma, para que outras pessoas
                fiquem com conhecimento da mesma.
              </p>
              <!-- <div class="d-flex buttons">
                <a href="" class="text-uppercase custom_orange-btn mr-3">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="" class="text-uppercase custom_dark-btn">
                  <i class="bi bi-facebook"></i>
                </a>
              </div> -->
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="slider_img-box">
          <div>
            <img src="../assets/img/slide-img.png" alt="" class="" />
          </div>
          </div>
        </div>
        </div>
      </div>
      </section>

      <!-- end slider section -->
    </div>

    <!-- service section -->

    <section class="service_section layout_padding ">
      <div class="container festas" ref="festas">
        <h2 class="custom_heading">Festas Registadas</h2>
        <p class="custom_heading-text">
          Abaixo podes encontrar as festas registadas e filtrar as mesmas. <br>Podes ainda registar uma nova festa.
        </p>
        <div class="registar-festa">
          <a class="text-uppercase custom_orange-btn registar" @click="registarEvento">
            <span class="bi bi-plus">&#x1F37A; </span> Registar nova Festa
          </a>
        </div>
        <div class="filtros">
          <div class="filtros-primeira-linha">
            <div class="distrito-group">
              <div class="distrito-label">Distrito</div>
              <v-select class="Distritos" :placeholder="loadingDistritos ? 'A carregar ...' : 'Selecionar Distrito'" :options="distritos"  :disabled="loadingDistritos" :loading="loadingDistritos" v-model="distrito" label="distrito">
                <template v-slot:no-options>
                  Sem Resultados
                </template>
              </v-select>
            </div>
            <div class="concelho-group">
              <div class="concelho-label">Concelho</div>
              <v-select class="Concelhos" placeholder="Selecionar Concelho" :options="concelhos"  v-model="concelho" :disabled="concelhos.length <= 0">
                <template v-slot:no-options>
                  Sem Resultados
                </template>
              </v-select>
            </div>
          </div>
          <div class="freguesia-group">
              <div class="concelho-label">Freguesia</div>
              <v-select class="freguesia" :placeholder="loadingFreguesias ? 'A carregar ...' : 'Selecionar Freguesia'" v-model="freguesia" :options="freguesias" :loading="loadingFreguesias" :disabled="freguesias.length <= 0" label="Freguesia">
                <template v-slot:no-options>
                  Sem Resultados
                </template>
              </v-select>
          </div>
          <div class="search-group">
              <div class="search-date">
                <div class="search-box">
                    <span class="search-span">
                        <i class="bi bi-search"></i>                    
                    </span>
                    <input class="search" type="text" placeholder="Pesquisar por bandas, artistas ou locais"/>
                </div> 
                <div class="date-picker-group">
                  <DatePicker v-model="dataFesta" is-range color="orange" :min-date="dataAtual">
                    <template v-slot="{ togglePopover }">
                      <div class="date-picker" @click="togglePopover()" >
                        <button><i class="bi bi-calendar3"></i></button>
                        <input type="text" v-model="data" readonly />
                      </div>
                    </template>
                  </DatePicker>
                  <i class="bi bi-x data" @click="limparData()" v-if="this.dataFesta" title="Limpar Data"></i>
                </div>
              </div>
          </div>
        </div>
        <div class=" layout_padding2">
          <div class="card-deck">
            <div class="card">
              <img class="card-img-top" src="../assets/../assets/img/card-item-1.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Orange</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
            <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-2.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Grapes</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
            <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
                      <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
                                <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
                                          <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
              <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
                                          <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
                                          <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
                                                    <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
                                                    <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
                                                    <div class="card">
              <img class="card-img-top" src="../assets/img/card-item-3.png" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Gauva</h5>
                <p class="card-text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
            </div>
          </div>
          <div class="paginacao">
            <pagination :meta="meta" @pagination="getDistritosConcelhos($event, type)" ></pagination>
          </div>
        </div>
      </div>
    </section>
    <!-- contact section -->
    <section class="contact_section layout_padding">
      <div class="container"   ref="contacto">
        <h2 class="font-weight-bold">
          Contacta-nos
        </h2>
        <p class="contacto-info">
          Se econtraste algum problema ou tens alguma sugestão que achas que poderia melhorar a página 
          contacta-nos e nós tentaremos respondar o mais rápido possível.
        </p>
        <div class="row">
          <div class="col-md-8 mr-auto">
            <form @submit.prevent="contactar">
              <div class="contact_form-container">
                <div>
                  <div>
                    <input class="input-contacto" type="text" placeholder="Nome">
                  </div>
                  <div>
                    <input class="input-contacto" type="email" placeholder="Endereço Email">
                  </div>
                  <div class="mt-5">
                    <textarea class="campo-mensagem" rows="7" type="text" placeholder="Mensagem"></textarea>
                  </div>
                  <div class="mt-5">
                    <button type="submit" class="button-enviar">
                      Enviar
                    </button>
                  </div>
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- end contact section -->


    <!-- footer section -->
    <section class="container-fluid footer_section">
      <p>
        Copyright &copy; {{anoAtual}} <span class="empresa"> comFesta - Festa onde? </span>  Todos os direitos reservados.
      </p>
    </section>
    <!-- footer section -->

  </div>
</template>


<script>
export default {
  name: 'Home',
  data() {
    return {
      distritos: [],
      concelhos: [],
      freguesias: [],
      distrito: null,
      concelho: null,
      freguesia: null,
      loadingDistritos: true,
      loadingFreguesias: false,
      meta: {
        current_page: 1,
        from: 1,
        last_page: 20,
        per_page: 10,
        to: 10,
        total: 500
      },
      dataFesta: null,
    }
  },
  computed: {
    anoAtual() {
      return new Date().getFullYear();
    },
    dataAtual() {
      return new Date().toISOString().split('T')[0];
    },
    data()
    {
      return this.dataFesta ? this.dataFesta.start.toLocaleDateString() + " - " + this.dataFesta.end.toLocaleDateString() : 'Selecionar uma data';  
    }
  },
  watch: {
    distrito() {
      this.concelhos = []
      this.concelho = null
      if(this.distrito != null && this.distrito != "Todos")
      {
        this.concelhos = this.distrito.municipios
      }
      else
      {
        this.distrito = "Todos"
      }
    },
    concelho() {
      this.freguesias = []
      this.freguesia = null
      this.loadingFreguesias = false 
      if(this.concelho != null && this.concelho != "Todos")
      {
        this.getFreguesias()
      }
    },
  },
  methods: {
    limparData()
    {
      this.dataFesta = null
    },
    registarEvento()
    {
      let dlg = this.$refs.inputDialog
      dlg.show()
    },
    handleScroll() {
      if(window.top.scrollY > 500)
      {
        this.$refs['top-button'] != null ? this.$refs['top-button'].classList.add('scrollFadeIn') : null;
      }
      else
      {
        this.$refs['top-button'] != null ? this.$refs['top-button'].classList.remove('scrollFadeIn') : null;
      }
    },
    scrollToElement(elemento)
    {
      let element = this.$refs[elemento];
      // element.scrollIntoView({ behavior: "smooth" });
      
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    },
    getDistritosConcelhos()
    {
      this.loadingDistritos = true;
      this.$axios.get('https://geoapi.pt/distritos/municipios?json=1')
      .then((response) => {
        this.distritos = response.data;
        this.distritos = ["Todos", ...this.distritos];
        this.loadingDistritos = false;
        this.distrito = "Todos";
      })
      .catch(() => {
        this.$toast.error("Erro ao carregar os distritos")
        this.loadingDistritos = false;
      })
    },
    async getFreguesias()
    {
      this.loadingFreguesias = true;
      await this.$axios.get('https://geoapi.pt/municipios/' + this.concelho + '/freguesias?json=1')
      .then((response) => {
        this.freguesias = response.data.freguesias;
        this.loadingFreguesias = false;
      })
      .catch(() => {
        this.$toast.error("Erro ao carregar as freguesias")
        this.loadingFreguesias = false;
      })
    },
    contactar()
    {
      this.$toast.info("Um dia vai ser implementado")
    }
  },
  mounted()
  {
    window.addEventListener('scroll', this.handleScroll);
    this.getDistritosConcelhos();
  }
}


</script>

<style scoped>

@import "@/assets/css/bootstrap.css";
@import "@/assets/css/style.css";
@import "@/assets/css/responsive.css";

.bi-x.data::before {
  content: "\f62a";
  font-weight: 700 !important;
  font-size: 19px !important;
  cursor: pointer;
}

.date-picker-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
  min-width: 260px;
}

.search-date{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.date-picker input, .date-picker button, .date-picker input:focus, .date-picker button:focus, .date-picker input:focus-visible, .date-picker button:focus-visible{
  border: none;
  background: none;
  outline: none;
}

.date-picker input, .date-picker input:hover{
  cursor: pointer !important;
  width: 100%;
}

.date-picker {
  border: var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);
  border-radius: var(--vs-border-radius);
  display: flex;
  padding: 0 7px 0 7px;
  white-space: normal;
  font-size: 15px;
  height: 34.39px;
  cursor: pointer;
}

.filtros{
  margin-top: 35px;
}

.filtros-primeira-linha
{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
}

.distrito-group, .concelho-group, .freguesia-group
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.freguesia-group
{
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.paginacao {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.search-span{
    display: flex;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    padding-right: 8px;
    transition: all 0.4s;
    margin-top: 5px;
}

.search{
  border: none;
  width: 100%;
  padding-right: 25px;
}

.search-box {
  margin-top: 15px;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);
  border-radius: var(--vs-border-radius);
  display: flex;
  padding: 0 0 0 7px;
  white-space: normal;
  width: 450px;
  font-size: 15px;
  height: 34.39px;
  padding-right: 8px;
}

@media(max-width: 455px)
{
  .search-box{
    width: 350px;
  }
}

@media(max-width: 390px)
{
  .search-box{
    width: 300px;
  }
}

@media(max-width: 350px)
{
  .search-box{
    width: 250px;
  }
}

@media(max-width: 328px)
{
  .search-box{
    width: 100%;
  }
}

.search-box:focus-within, .date-picker:focus-within {
  border: var(--vs-border-width) var(--vs-border-style) #ff7f0457 !important;
}

.search:focus, .search:focus-visible{
  outline: none;
}

.bi-plus::before{
  font-weight: 700 !important;
  font-size: 17px !important;
}

.search-group{
  margin-top: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

span.bi.bi-plus {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.registar-festa {
  display: flex;
  justify-content: center;
}

.input-contacto:focus {
  border-bottom: 0.8px solid #fc5d35 !important;
}

.campo-mensagem:focus{
  border: 0.8px solid #fc5d35 !important;
}

.button-enviar:hover {
  color: black;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  background-color: transparent;
  border: 1px solid #fc5d35;
}

.button-enviar:focus-visible, .button-enviar:focus {
  outline: none;
}

.page-group{
  min-height: 100vh !important;
}

.nav-link{
  cursor: pointer;
}

.container.festas, .container.contacto{
  padding-top: 30px;
}

@media(min-width:595px)
{
  .container.festas{
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}

@media(max-width:595px)
{
  .container.festas{
    padding-left: 15px;
    padding-right: 15px;
  }
}

span.empresa {
  font-weight: bold;
}

p.contacto-info {
    max-width: 62%;
}

.campo-mensagem{
  width: 90%;
  resize: none;
  border: 0.8px solid #252525;;
}

.campo-mensagem:focus-visible{
  outline: none;
}

#scroll {
  position:fixed;
  right:10px;
  bottom:10px;
  cursor:pointer;
  width:40px;
  height:40px;
  background-color:#fc5d35;
  text-indent:-9999px;
  display:block;
  opacity: 1;
  z-index: 2;
  margin-bottom: 35px;
  margin-right: 50px;
  transition: visibility 0.5s, opacity 0.5s linear;
  visibility: hidden;
  opacity: 0;
}

.scrollFadeIn
{
  transition: visibility 0s, opacity 0.5s linear;
  visibility: visible !important;
  opacity: 1 !important;
}

#scroll span {
    position:absolute;
    top:50%;
    left:50%;
    margin-left:-8px;
    margin-top:-12px;
    height:0;
    width:0;
    border:8px solid transparent;
    border-bottom-color:#ffffff;
}
#scroll:hover {
    background-color:#3d3d3d;
    opacity:1;filter:"alpha(opacity=100)";
    -ms-filter:"alpha(opacity=100)";
}

.d-flex.buttons.navbar {
  color: white;
  cursor: pointer;
  gap: 20px;
}

@media(max-width: 1200px)
{
  .d-flex.buttons.navbar {
    margin-left: 0px;
  }
}

@media(max-width: 992px)
{
  .d-flex.buttons.navbar {
    margin-left: 0px;
  }
}

@media(max-width: 440px)
{
  .d-flex.buttons.navbar {
    flex-direction: column;
    gap: 25px;
  }
}

@media(min-width: 993px)
{
  .d-flex.buttons.navbar {
    width: 400px;
  }
}

a.text-uppercase.custom_orange-btn.registar
{
  padding: 10px;
  margin-top: 20px;
  width: 250px;
  min-height: 46px;
}

a.text-uppercase.custom_orange-btn.navbar, a.text-uppercase.custom_dark-btn.navbar, a.text-uppercase.custom_orange-btn.registar{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: white
}

a.text-uppercase.custom_orange-btn.navbar:hover, a.text-uppercase.custom_dark-btn.navbar:hover, a.text-uppercase.custom_orange-btn.registar:hover{
  color: black;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
}

 
:deep(input.vs__search::placeholder) {
  font-size: 15px;
}

:deep(.vs__dropdown-toggle[aria-expanded="true"]){
  border: var(--vs-border-width) var(--vs-border-style) #ff7f0457 !important;
}

:deep(.v-select.vs--single.vs--searchable.freguesia), :deep(.v-select.vs--single.vs--searchable.Concelhos), :deep(.v-select.vs--single.vs--searchable.Distritos){
  font-size: 15px;
  width: auto;
  min-width: 350px;
}



:deep(.vs__actions) {
  cursor: pointer !important;
}

:deep(.vs__dropdown-menu){
  width: auto;
  min-width: 350px;
}

:deep() {
  --vs-dropdown-option-color: black;
  --vs-dropdown-option--active-bg: #ff7f04;
} 

:deep(.vc-container)
{
  --orange-600: #fc5d35 !important;
  --orange-700: #fc5d35 !important;
  --orange-200: #fc5d3561 !important;
  --orange-900: #381f17 !important;
}

.card-deck{
  margin-right: 0px !important;
  margin-left: 0px !important;
}

.card-deck .card {
  margin-bottom: 20px;
  width: 330px;
}


@media (min-width: 1450px)
{
  .card-deck {
    grid-template-columns: auto auto auto auto;
    width: 100%;
    display: grid;
    justify-content: center;
  }
}

@media (max-width: 1450px)
{
  .card-deck {
    grid-template-columns: auto auto auto;
    width: 100%;
    display: grid;
    justify-content: center;
  }
}

@media (max-width: 1100px)
{
  .card-deck {
    grid-template-columns: auto auto;
    width: 100%;
    display: grid;
    justify-content: center;
  }
}

@media (max-width: 730px)
{
  .card-deck {
    grid-template-columns: auto;
    width: 100%;
    display: grid;
    justify-content: center;
  }
}

@media (max-width: 370px)
{
  .card-deck .card{
    width: 100%;
  }
}

@media(max-width: 770px)
{
  .filtros-primeira-linha{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .distrito-group, .concelho-group, .search-box{
    width: 100%;
  }

  :deep(.v-select.vs--single.vs--searchable.freguesia), :deep(.v-select.vs--single.vs--searchable.Concelhos), :deep(.v-select.vs--single.vs--searchable.Distritos){
    font-size: 15px;
    width: 100%;
    min-width: 100%;
  }

  :deep(.vs__dropdown-menu){
    width: 100%;
    min-width: 100%;
  }

  .search-date{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>