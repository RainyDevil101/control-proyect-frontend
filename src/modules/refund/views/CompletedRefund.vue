<template>
  <div v-if="imageOneCompleted === true">
    <img-one :imageOne="imageOne" @on:close="onShowImageOne" />
  </div>
  <div v-if="imageTwoCompleted === true">
    <img-two :imageTwo="imageTwo" @on:close="onShowImageTwo" />
  </div>

  <loader v-if="refundCompletedIdStatus === 'CARGANDO'" class="loader-wrapper" />

  <div v-else>
    <div v-if="refundIdCompleted !== 'none'">
      <div class="wrapper-form">
        <h1>Material contabilizado</h1>
        <div class="forum-data">
          <p>Fecha de ingreso:</p>
          <p>
            <b>{{ refundIdCompletedDate.date }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Hora de ingreso:</p>
          <p>
            <b>{{ refundIdCompletedDate.hour }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Fecha de despacho:</p>
          <p>
            <b>{{ refundIdCompletedDate.outDate }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Hora de despacho:</p>
          <p>
            <b>{{ refundIdCompletedDate.outHour }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Código:</p>
          <p>
            <b>{{ refundIdCompleted.code }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Cantidad:</p>
          <p>
            <b>{{ refundIdCompleted.quantity }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Cantidad de bultos:</p>
          <p>
            <b>{{ refundIdCompleted.packageQuantity }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Nombre del conductor:</p>
          <p>
            <b>{{ refundIdCompleted.driverName }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Apellido del conducto:</p>
          <p>
            <b>{{ refundIdCompleted.driverLastname }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Patente:</p>
          <p>
            <b>{{ refundIdCompleted.patent }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Ubicación final:</p>
          <p>
            <b>{{ refundIdCompleted.possibleUbication }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Estado:</p>
          <p>
            <b>{{ refundIdCompleted.statusDelivery }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>N° de reserva:</p>
          <p>
            <b>{{ refundIdCompleted.reserve }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>N° de entrega:</p>
          <p>
            <b>{{ refundIdCompleted.delivery }}</b>
          </p>
        </div>
        <div class="forum-button">
          <button @click="onShowImageOne" class="buttons-styles">
            Ver imagen ingreso
          </button>
          <button @click="onShowImageTwo" class="buttons-styles">
            Ver imagen despacho
          </button>
          <button @click="$router.push({ name: 'get-completed-refund' })" class="buttons-styles">
            Volver
          </button>
        </div>
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


@media screen and (min-width: 768px) {
  .forum-button {
    flex-direction: row;
  }
}
</style>