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
          <div class="teste">
            <h4 class="modal-title" id="inputModalLabel" >{{ title }}</h4>
            <div>Regista a tua festa, para que possa ser partilhada e vista por todos</div>
          </div>
          <button type="button" @click="hide" class="close" ><i class="bi bi-x-lg"></i></button>
        </div>

        <form>
          <div class="modal-body">
            {{ msg }}
            <input
              class="form-control"
              id="inputConfirmationPassword"
              required
              v-model="input"
            >
          </div>
          <div class="modal-footer">
              <button type="submit" class="text-uppercase custom_orange-btn navbar" @click.prevent="clickConfirm">
                {{ confirmationBtn }}
              </button>
              <button @click="hide" type="button" class="text-uppercase custom_dark-btn navbar">
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
    msg: {
      type: String,
      default: ''
    },
    inputValue: {
      type: String,
      default: ''
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
    }
  },
  methods: {
    show () {
      document.body.classList.remove('overflowHidden');
      document.body.style.overflow = 'hidden';
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

.modal-dialog {
  max-width: 700px !important;
}

@media (max-width: 720px)
{
  .modal-dialog {
    margin: 1.6vh !important;
  }
}

button.text-uppercase.custom_orange-btn.navbar, button.text-uppercase.custom_dark-btn.navbar {
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button:focus, button:focus-visible{
  outline: none;
}

.form-control:focus {
  border-color: #ed0677;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(237 6 119 / 60%);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(237 6 119 / 60%);
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
}

.modal-dialog{
  font-family: "Open Sans" !important;
}

.modal-content {
  margin-top: 150px;
  border: 1px solid #ccc;
}

.modal.mostrar{
  visibility: visible;
  transition: opacity .15s linear;
  opacity: 1;
}

.modal.esconder{
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
}

.modal-footer {
  gap: 10px;
}


</style>