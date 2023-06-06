<template>
  <div v-if="imageOneCompleted === true">
    <img-one :imageOne="imageOne" @on:close="onShowImageOne" />
  </div>
  <div v-if="imageTwoCompleted === true">
    <img-two :imageTwo="imageTwo" @on:close="onShowImageTwo" />
  </div>

  <loader v-if="refundStoredIdStatus === 'CARGANDO'" class="loader-wrapper" />

  <div v-else>
    <div v-if="refundIdStored !== 'none'">
      <div class="wrapper-form">
        <h1>Material en ubicación</h1>
        <div class="forum-data">
          <p>Fecha de ingreso:</p>
          <p>
            <b>{{ refundStoredIdDate.date }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Hora de ingreso:</p>
          <p>
            <b>{{ refundStoredIdDate.hour }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Fecha de despacho:</p>
          <p>
            <b>{{ refundStoredIdDate.outDate }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Hora de despacho:</p>
          <p>
            <b>{{ refundStoredIdDate.outHour }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Código:</p>
          <p>
            <b>{{ refundIdStored.code }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Cantidad:</p>
          <p><b>{{ refundIdStored.quantity }}</b></p>
        </div>
        <div class="forum-data">
          <p>Cantidad de bultos:</p>
          <p>
            <b>{{ refundIdStored.packageQuantity }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Nombre del conductor:</p>
          <p>
            <b>{{ refundIdStored.driverName }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Apellido del conducto:</p>
          <p>
            <b>{{ refundIdStored.driverLastname }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Patente:</p>
          <p>
            <b>{{ refundIdStored.patent }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Ubicación final:</p>
          <p>
            <b>{{ refundIdStored.possibleUbication }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Estado:</p>
          <p>
            <b>{{ refundIdStored.statusDelivery }}</b>
          </p>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="forum-data">
            <p>N° de reserva:</p>
            <input v-model="finishRefundStore.reserve" type="text" maxlength="20">
          </div>
          <div class="forum-data">
            <p>N° de entrega:</p>
            <input v-model="finishRefundStore.delivery" type="text" maxlength="20">
          </div>
          <div class="forum-button">
            <button type="button" @click="$router.push({ name: 'get-stored-refund' })" class="buttons-styles">
              Volver
            </button>
            <button type="button" @click="onShowImageOne" class="buttons-styles">
              Imagen ingreso
            </button>
            <button type="button" @click="onShowImageTwo" class="buttons-styles">
              Imagen despacho
            </button>
            <button type="submit" class="buttons-styles finish-button">
              Finalizar
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-else>
      <div class="not-wrapper">
        <h1>No existe registro</h1>
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
  
.wrapper-form {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
}
  
.wrapper-form h1 {
  text-align: center;
  margin: 4px 0;
}
  
.forum-button {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
  
.forum-data {
  margin: 5px;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
}
  
.forum-data p {
  word-wrap: break-word;
  max-width: 90%;
}

.not-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.not-wrapper h1 {
  margin: auto;
}

.finish-button {
  margin-top: 20px;
}

  
@media screen and (min-width: 768px) {
  .forum-button {
    flex-direction: row;
  }
}
  </style>