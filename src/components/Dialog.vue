<template>
  <div
    :class="showModal ? 'modal mostrar' : 'modal esconder'"
    id="inputModalId"
    tabindex="-1"
    aria-labelledby="inputModalLabel"
    aria-hidden="true"
    @click="fecharModal($event)"
  >
    <div class="modal-dialog">
      <!-- Button trigger to Hide modal - HIDDEN -->
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h4 class="modal-title" id="inputModalLabel" >{{ title }}</h4>
            <div>Regista a tua festa, para que possa ser partilhada e vista por todos</div>
          </div>
          <button type="button" @click="hide" class="close" ><i class="bi bi-x-lg"></i></button>
        </div>

        <form>
          <div class="modal-body">
            <div class="date-picker-group">
              <DatePicker v-model="dataFesta" is-range color="orange" :min-date="dataAtual" style="width: 100% !important">
                <template v-slot="{ togglePopover }">
                  <div class="date-picker" @click="togglePopover()" >
                    <button type="button"><i class="bi bi-calendar3"></i></button>
                    <input type="text" v-model="data" readonly />
                  </div>
                </template>
              </DatePicker>
              <i class="bi bi-x data" v-if="this.dataFesta" title="Limpar Data" @click="limparData()"></i>
            </div>
            <input class="input-modal" required v-model="input">
            <input class="input-modal" required v-model="input">
            <input class="input-modal" required v-model="input">
            <div class="distrito-group">
              <div class="distrito-label">Distrito</div>
              <v-select class="distritos" :placeholder="distritos.length <= 0 ? 'A carregar ...' : 'Selecionar Distrito'" :options="distritos"  :disabled="distritos.length <= 0" :loading="distritos.length <= 0" v-model="festa.distrito" label="distrito">
                <template v-slot:no-options>
                  Sem Resultados
                </template>
              </v-select>
            </div>
            <div class="concelho-group">
              <div class="concelho-label">Concelho</div>
              <v-select class="concelhos" placeholder="Selecionar Concelho" :options="concelhos"  :disabled="concelhos.length <= 0" v-model="festa.concelho" label="concelho">
                <template v-slot:no-options>
                  Sem Resultados
                </template>
              </v-select>
            </div>
            <div class="freguesia-group">
              <div class="freguesia-label">Freguesia</div>
              <v-select class="freguesias" :placeholder="loadingFreguesias ? 'A carregar ...' : 'Selecionar Freguesia'" :options="freguesias" :disabled="freguesias.length <= 0" :loading="loadingFreguesias" v-model="festa.freguesia" label="freguesia">
                <template v-slot:no-options>
                  Sem Resultados
                </template>
              </v-select>
            </div>
            <div>
              <div>Opções:</div>
              <div class="opcoes">
                <div class="toggle" v-for="opcao in opcoes" :key="opcao">
                  <label class="label-toggle" :for="opcao" >{{opcao}}<input type="checkbox" :id="opcao"/></label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
              <button type="submit" class="text-uppercase custom_orange-btn" @click.prevent="clickConfirm">
                {{ confirmationBtn }}
              </button>
              <button @click="hide" type="button" class="text-uppercase custom_dark-btn">
                {{ cancelBtn }}
              </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputDialog',
  data()
  {
    return {
      input: "",
      showModal: false,
      dataFesta: null,
      concelhos: [],
      freguesias: [],
      loadingFreguesias: false,
      festa: {
        distrito: null,
        concelho: null,
        freguesia: null,
      },
      opcoes: ["Pago", "Comida", "Estancionamento", "Teste", "Teste1", "Teste2", "Teste3"]
    }
  },
  props: {
    cancelBtn: {
      type: String,
      default: 'Cancel'
    },
    confirmationBtn: {
      type: String,
      default: 'Confirm'
    },
    title: {
      type: String,
      default: 'Confirmation'
    },
    distritos: {
      type: Array,
      default: () => [],
      required: true
    },
  },
  emits: [
    'inputDialog'
  ],
  watch: {
    showModal: function(newValue)
    {
      if(newValue)
      {
        this.input = this.inputValue
      }
    },
    'festa.distrito': function (newValue){
        this.concelhos = newValue ? [...newValue.municipios] : []
        this.festa.concelho = null
     },
    'festa.concelho': function (){
      this.freguesias = []
      this.festa.freguesia = null
      this.loadingFreguesias = false 
      if(this.festa.concelho != null)
      {
        this.getFreguesias()
      }
    }
  },
  computed: {
    dataAtual() {
      return new Date().toISOString().split('T')[0];
    },
    data()
    {
      return this.dataFesta ? this.dataFesta.start.toLocaleDateString() + " - " + this.dataFesta.end.toLocaleDateString() : 'Selecionar uma data';  
    }
  },
  methods: {
    limparData()
    {
      this.dataFesta = null;
    },
    async getFreguesias()
    {
      this.loadingFreguesias = true;
      await this.$axios.get('https://geoapi.pt/municipios/' + this.festa.concelho + '/freguesias?json=1')
      .then((response) => {
        this.freguesias = response.data.freguesias;
        this.loadingFreguesias = false;
      })
      .catch(() => {
        this.$toast.error("Erro ao carregar as freguesias")
        this.loadingFreguesias = false;
      })
    },
    show () {
      document.body.classList.remove('overflowHidden');
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '19px';
      this.showModal = true;
    },
    fecharModal(event)
    {
      if(event.target.id == "inputModalId")
      {
        this.hide();
      }
    },
    hide () {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
      this.input = "";
      this.showModal = false;
    },
    clickConfirm () {
      if(this.input.trim().length == 0)
      {
        this.$toasted.error("Especialidade do orador inválida");
        return;
      }
      this.$emit('inputDialog', this.input);
    },
  }
}
</script>

<style scoped>

.opcoes {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.label-toggle{
  margin: 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.toggle {
  --active-color: #fc5d35;
  --inactive-color: rgb(209 213 219);
  --rail-height: 20px;
  --rail-ratio: 1.8;
  --inset: 2px;
  
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  gap: 10px;
  user-select: none;
  cursor: pointer;
  margin-right: 25px;
}

/* checkbox */
.toggle input {
  order: 1;
  cursor: pointer;
  position: relative;
  font-size: 1.2rem;
  width: calc(20px * var(--rail-ratio));
  height: 18px;
  
  /* hide default styling */
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
  border-radius: 1em;
}

/* checkbox rail */
.toggle input:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--inactive-color);
  border-radius: var(--rail-height);
  z-index: 0;  
  transition: all 100ms ease;
}

/* checkbox rail (change color when checked) */
.toggle input:checked:before {
  background-color: var(--active-color);
}

/* checkbox rail (flash on hover) */
.toggle input:hover {
  opacity: 0.9;
}

/* checkbox handle (the white part) */
.toggle input:after {
  content: '';
  background-color: #fff;
  position: absolute;
  aspect-ratio: 1;
  top: var(--inset);
  bottom: var(--inset);
  left: var(--inset);
  border-radius: 100%;
  transition: left 200ms ease;  
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.3);
  margin-left: 1px;
}

/* checkbox handle (slide when checked) */
.toggle input:checked:after {
  left: calc(100% - var(--rail-height) + var(--inset));
}

.bi-x.data::before {
  font-weight: 700 !important;
  cursor: pointer;
}

i.bi.bi-x.data {
  font-size: 19px;
}

.date-picker button{
  background: none;
  border: none;
  outline: none;
}

.date-picker-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);
  border-radius: var(--vs-border-radius);
  font-size: 15px;
  height: 34.39px;
  padding: 0px 7px;
  width: 100%;
}

.date-picker-group:focus-within {
  border: var(--vs-border-width) var(--vs-border-style) #ff7f0457 !important;
}

input, input:focus-visible, input:focus{
  outline: none;
  border: none;
}

.date-picker {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.date-picker input {
  cursor: pointer;
  background: none;
  width: 100%;
}

.input-modal{
  border: var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);
  border-radius: var(--vs-border-radius);
  font-size: 15px;
  height: 34.39px;
  padding: 0px 7px;
}

.input-modal:focus{
  border: var(--vs-border-width) var(--vs-border-style) #ff7f0457 !important;
}

.modal-dialog {
  max-width: 700px !important;
}

@media (max-width: 720px)
{
  .modal-dialog {
    margin: 1.6vh !important;
  }

  .modal-content {
    margin-top: 0px !important;
  }

  .modal-footer{
    justify-content: center !important;
  }
}

button.text-uppercase.custom_orange-btn, button.text-uppercase.custom_dark-btn {
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: .3s ease-out;
}

button:focus, button:focus-visible{
  outline: none;
}

.btn-close:focus {
  box-shadow: none;
}

.bi-x-lg::before {
  content: "\f659";
  font-weight: bold !important;
  margin-top: 10px;
}

.close, .close:focus {
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 17px;
  font-weight: bold;
}

h4#inputModalLabel {
  font-weight: bold;
}

.modal-body {
    gap: 5px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
}

.modal{
  display: block;
  visibility: hidden;
  opacity: 0; 
}

div#inputModalId {
  background-color: #1f1f1fbf;
  overflow: auto;
}

.modal-content {
  margin-top: 50px;
  border: 1px solid #ccc;
}

.modal.mostrar{
  visibility: visible;
  transition: opacity .300s linear;
  opacity: 1;
}

.modal.esconder{
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 450ms, opacity 450ms;
}

.modal-footer {
  gap: 10px;
}


</style>