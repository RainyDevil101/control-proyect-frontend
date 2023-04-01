<template>
  <div v-if="imageOneCompleted === true">
    <img-one :imageOne="imageOne" @on:close="onShowImageOne" />
  </div>
  <div v-if="imageTwoCompleted === true">
    <img-two :imageTwo="imageTwo" @on:close="onShowImageTwo" />
  </div>

  <div v-if="refundCompletedIdStatus === 'CARGANDO'" class="loader">
    <loader />
  </div>

  <div v-else class="wrapper">
    <div class="body-wrapper">
      <div v-if="refundIdCompleted !== 'none'">
          <h1 class="refund-title">Despachos Gestionados</h1>
        <div class="body-item">
          <p>Fecha de ingreso:</p>
          <p>
            <b>{{ refundIdCompletedDate.date }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Hora de ingreso:</p>
          <p>
            <b>{{ refundIdCompletedDate.hour }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Fecha de despacho:</p>
          <p>
            <b>{{ refundIdCompletedDate.outDate }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Hora de despacho:</p>
          <p>
            <b>{{ refundIdCompletedDate.outHour }}</b>
          </p>
        </div>
        <hr>
        <div class="body-item">
          <p>Código:</p>
          <p>
            <b>{{ refundIdCompleted.code }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Cantidad:</p>
          <p>
            <b>{{ refundIdCompleted.quantity }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Cantidad de bultos:</p>
          <p>
            <b>{{ refundIdCompleted.packageQuantity }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Nombre del conductor:</p>
          <p>
            <b>{{ refundIdCompleted.driverName }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Apellido del conducto:</p>
          <p>
            <b>{{ refundIdCompleted.driverLastname }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Patente:</p>
          <p>
            <b>{{ refundIdCompleted.patent }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Ubicación final:</p>
          <p>
            <b>{{ refundIdCompleted.possibleUbication }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>Estado:</p>
          <p>
            <b>{{ completedPendiente }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>N° de reserva:</p>
          <p>
            <b>{{ refundIdCompleted.reserve }}</b>
          </p>
        </div>
        <div class="body-item">
          <p>N° de entrega:</p>
          <p>
            <b>{{ refundIdCompleted.delivery }}</b>
          </p>
        </div>
        <div class="button-wrapper">
          <button @click="onShowImageOne" class="buttons-styles">
            Ver imagen ingreso
          </button>
          <button @click="onShowImageTwo" class="buttons-styles">
            Ver imagen despacho
          </button>
          <button
            @click="$router.push({ name: 'get-completed-refund' })"
            class="buttons-styles"
          >
            Volver
          </button>
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
import { useRoute } from "vue-router";
import Loader from "@/modules/components/Loader.vue";
import ImgOne from "../components/ImgOne.vue";
import ImgTwo from "../components/ImgTwo.vue";
import useRefunds from "../composables/refundsStore";
export default {
  components: { Loader, ImgOne, ImgTwo },
  setup() {
    const route = useRoute();
    const store = useStore();

    const {
      getCompletedRefund,
      refundIdCompleted,
      refundIdCompletedDate,
      refundCompletedIdStatus,
      completedPendiente,
      imageOneCompleted,
      imageTwoCompleted,
      imageOne,
      imageTwo,
    } = useRefunds();

    onUpdated(() => {
      getCompletedRefund(route.params.id);
    });
    getCompletedRefund(route.params.id);

    return {
      getCompletedRefund,
      refundIdCompleted,
      refundIdCompletedDate,
      refundCompletedIdStatus,
      completedPendiente,
      imageOneCompleted,
      imageTwoCompleted,
      imageOne,
      imageTwo,

      onShowImageOne: () => {
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
    };
  },
};
</script>

<style lang="scss" scoped>

.body-wrapper {
  background-color: #fff;
  margin:70px auto;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.refund-title {
  text-align: center;
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
  margin-top: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-gap: 10px;
  align-items: center;
  justify-content: space-around;
}

@media screen and (min-width: 768px) {
  .button-wrapper {
    display: flex;
  }
}
</style>