<template>
  <div v-if="imageOneCompleted === true">
    <img-one :imageOne="imageOne" @on:close="onShowImageOne" />
  </div>
  <div v-if="imageTwoCompleted === true">
    <img-two :imageTwo="imageTwo" @on:close="onShowImageTwo" />
  </div>

  <div v-if="materialCompletedIdStatus === 'CARGANDO'" class="loader">
    <loader />
  </div>

  <div v-else class="body-wrapper">
    <h1>Pendientes Gestionadas</h1>
      <div class="body-item">
        <p>id:</p>
        <p>
          <b>{{ materialIdCompleted.id }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Número de transporte:</p>
        <p>
          <b>{{ materialIdCompleted.transport_number }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Código:</p>
        <p>
          <b>{{ materialIdCompleted.code }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Cantidad:</p>
        <p>
          <b>{{ materialIdCompleted.cantidad }}</b>
        </p>
      </div>
      <hr />
      <div class="body-item">
        <p>Fecha de ingreso:</p>
        <p>
          <b>{{ materialIdCompletedDate.date }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Hora de ingreso:</p>
        <p>
          <b>{{ materialIdCompletedDate.hour }}</b>
        </p>
      </div>
      <hr />
      <div class="body-item">
        <p>Fecha de despacho:</p>
        <p>
          <b>{{ materialIdCompletedDate.outDate }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Hora de despacho:</p>
        <p>
          <b>{{ materialIdCompletedDate.outHour }}</b>
        </p>
      </div>
      <hr />
      <div class="body-item">
        <p>Cantidad de bultos:</p>
        <p>
          <b>{{ materialIdCompleted.cantidad_bultos }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Ubication:</p>
        <p>
          <b>{{ materialIdCompleted.ubication }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Destino:</p>
        <p>
          <b>{{ materialIdCompleted.destination }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Estado:</p>
        <p>
          <b>{{ completedPendiente }}</b>
        </p>
      </div>
      <div class="body-item">
        <p>Número de tranporte despacho:</p>
        <p>
          <b>{{ materialIdCompleted.transport_number_two }}</b>
        </p>
      </div>
      <div class="button-wrapper">
        <button @click="onShowImageOne" class="buttons-styles">
          Ver imagen ingreso
        </button>
        <button @click="onShowImageTwo" class="buttons-styles">
          Ver imagen despacho
        </button>
        <button @click="$router.push({ name: 'get-completed-material' })" class="buttons-styles">
          Volver
        </button>
      </div>
  </div>
</template>

<script>
import { onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Loader from "@/modules/components/Loader.vue";
import useMaterials from "../composables/materialsStore";
import ImgOne from "../components/ImgOne.vue";
import ImgTwo from "../components/ImgTwo.vue";
export default {
  components: { Loader, ImgOne, ImgTwo },
  setup() {
    const route = useRoute();
    const store = useStore();

    const {
      getMaterialCompleted,
      materialIdCompleted,
      materialIdCompletedDate,
      materialCompletedIdStatus,
      completedPendiente,
      imageOneCompleted,
      imageTwoCompleted,
      imageOne,
      imageTwo,
    } = useMaterials();

    onUpdated(() => {
      getMaterialCompleted(route.params.id);
    });
    getMaterialCompleted(route.params.id);

    return {
      getMaterialCompleted,
      materialIdCompleted,
      materialIdCompletedDate,
      materialCompletedIdStatus,
      completedPendiente,
      imageOneCompleted,
      imageTwoCompleted,
      imageOne,
      imageTwo,

      onShowImageOne: () => {
        if (imageOneCompleted.value === false) {
          return store.dispatch("materials/changeImageOne", true);
        } else {
          return store.dispatch("materials/changeImageOne", false);
        }
      },
      onShowImageTwo: () => {
        if (imageTwoCompleted.value === false) {
          return store.dispatch("materials/changeImageTwo", true);
        } else {
          return store.dispatch("materials/changeImageTwo", false);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>

.body-wrapper {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
}
.loader {
  width: 100%;
}

.body-wrapper h1 {
  margin: 4px 0;
}

.body-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 8px 4px 8px;
  width: 100%;
  border-bottom: 1px solid black;
}

.body-item p {
  word-wrap: break-word;
  max-width: 10rem;
}

.button-wrapper {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

@media screen and (min-width: 768px) {
  .button-wrapper {
    flex-direction: row;
  }

}
</style>