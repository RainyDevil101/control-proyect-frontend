<template>
  <div v-if="imageOneCompleted === true">
    <img-one :imageOne="imageOne" @on:close="onShowImageOne" />
  </div>
  <div v-if="imageTwoCompleted === true">
    <img-two :imageTwo="imageTwo" @on:close="onShowImageTwo" />
  </div>

  <div v-if="refundStoredIdStatus === 'CARGANDO'" class="loader">
    <loader />
  </div>

  <div v-else class="wrapper">
    <div class="body-wrapper">
      <div v-if="refundIdStored !== 'none'">
        <div class="header">
          <h1>DESPACHOS ALMACENADOS</h1>
        </div>
        <div class="body">
          <div class="body-item">
            <p>Fecha de ingreso:</p>
            <p>
              <b>{{ refundStoredIdDate.date }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Hora de ingreso:</p>
            <p>
              <b>{{ refundStoredIdDate.hour }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Fecha de despacho:</p>
            <p>
              <b>{{ refundStoredIdDate.outDate }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Hora de despacho:</p>
            <p>
              <b>{{ refundStoredIdDate.outHour }}</b>
            </p>
          </div>
          <hr>
          <div class="body-item">
            <p>Código:</p>
            <p>
              <b>{{ refundIdStored.code }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Cantidad:</p>
            <p><b>{{ refundIdStored.quantity }}</b></p>
          </div>
          <div class="body-item">
            <p>Cantidad de bultos:</p>
            <p>
              <b>{{ refundIdStored.packageQuantity }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Nombre del conductor:</p>
            <p>
              <b>{{ refundIdStored.driverName }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Apellido del conducto:</p>
            <p>
              <b>{{ refundIdStored.driverLastname }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Patente:</p>
            <p>
              <b>{{ refundIdStored.patent }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Ubicación final:</p>
            <p>
              <b>{{ refundIdStored.possibleUbication }}</b>
            </p>
          </div>
          <div class="body-item">
            <p>Estado:</p>
            <p>
              <b>{{ refundIdStored.statusDelivery }}</b>
            </p>
          </div>
          <hr>
          <form @submit.prevent="onSubmit">
            <div class="body-item">
              <p>N° de reserva:</p>
              <input v-model="finishRefundStore.reserve" type="text" maxlength="20">
            </div>
            <div class="body-item">
              <p>N° de entrega:</p>
              <input v-model="finishRefundStore.delivery" type="text" maxlength="20">
            </div>
            <button type="submit" class="buttons-styles finish-button">
              Finalizar
            </button>
          </form>
          <div class="button-wrapper">
            <div class="sub-button-wrapper">
              <button @click="$router.push({ name: 'get-stored-refund' })" class="buttons-styles">
                Volver
              </button>
              <button @click="onShowImageOne" class="buttons-styles">
                Imagen ingreso
              </button>
              <button @click="onShowImageTwo" class="buttons-styles">
                Imagen despacho
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="not-wrapper">
          <h1>No existe registro</h1>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import ImgOne from "../components/ImgOne.vue";
import ImgTwo from "../components/ImgTwo.vue";
import useRefunds from "../composables/refundsStore";
import updateRefund from "@/modules/operatorRefund/composables/updateRefund";
export default {
  components: { Loader, ImgOne, ImgTwo },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const { finishRefund } = updateRefund();

    const {
      getStoredRefund,
      refundIdStored,
      refundStoredIdDate,
      refundStoredIdStatus,
      pendingStored,
      imageOneCompleted,
      imageTwoCompleted,
      imageOne,
      imageTwo,
    } = useRefunds();

    const finishRefundStore = ref({
      "reserve": "",
      "delivery": ""
    });

    onUpdated(() => {
      getStoredRefund(route.params.id);
    });
    getStoredRefund(route.params.id);

    return {
      getStoredRefund,
      refundIdStored,
      refundStoredIdDate,
      refundStoredIdStatus,
      pendingStored,
      imageOneCompleted,
      imageTwoCompleted,
      imageOne,
      imageTwo,
      finishRefundStore,
      finishRefund,

      onShowImageOne: () => {
        console.log(imageOneCompleted.value);
        if (imageOneCompleted.value === false) {
          return store.dispatch("refunds/changeImageOne", true);
        } else {
          return store.dispatch("refunds/changeImageOne", false);
        }
      },
      onShowImageTwo: () => {
        if (imageTwoCompleted.value === false) {
          return store.dispatch("refunds/changeImageTwo", true);
        } else {
          return store.dispatch("refunds/changeImageTwo", false);
        }
      },
      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const dataFormDelivery = finishRefundStore.value.delivery;
        const dataFormReserve = finishRefundStore.value.reserve;

        const id = route.params.id;

        if (!dataFormDelivery || dataFormDelivery.length === 0 || !dataFormReserve || dataFormReserve.length === 0) {
          return Swal.fire({
            title: "Error",
            text: "Debe completar los campos",
            icon: "error"
          });
        }

        const { errors, nice, code } = await finishRefund(dataFormDelivery, dataFormReserve, id);

        if (nice.value === false) {
          Swal.fire({
            title: "Error",
            text: `${errors.value}`,
            icon: "error"
          });
        } else {
          await store.dispatch("refunds/loadRefunds");

          Swal.fire(
            "Guardado",
            `Despacho ${code.value} registrado con éxito`,
            "success"
          ).then(function (result) {
            if (true) {
              router.push({ name: "get-stored-refund" });
            } else {
              window.alert("Error, intente nuevamente");
            }
          });
        }
      },
    };
  },
};
</script>
  
<style lang="scss" scoped>
  
  .body-wrapper {
    background-color: #fff;
    margin-top: 70px;
    margin-bottom: 70px;
    border-radius: 4px;
    border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
  }
  
  .body {
    display: block;
  }
  
  .body-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px 4px 8px;
  }
  
  .body-item p {
    word-wrap: break-word;
    max-width: 10rem;
  }
  
  .button-wrapper {
    display: flex;
    margin-top: 5px;
    margin-bottom: 10px;
    justify-content: space-around;
    align-items: center;
  }

  .sub-button-wrapper {
    display: block;
  }

  .finish-button {
    margin-top: 20px;
  }

  .test {
    display: flex;
    align-items: center;
    text-align: center;
    background-color: royalblue;
    height: 100vh;
    width: 100%;
  }
  
  @media screen and (min-width: 768px) {
    .sub-button-wrapper {
    display: flex;
    margin: auto;
  }
    .sub-button-wrapper button {
    margin: 0 2px;
  }
  }
  </style>