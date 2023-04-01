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

  <div v-else class="wrapper">
    <div class="body-wrapper">
      <div v-if="materialIdCompleted !== 'none'" >
      <div class="header">
        <h1>PENDIENTES GESTIONADAS</h1>
      </div>
      <div class="body">
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
          <button
            @click="$router.push({ name: 'get-completed-material' })"
            class="buttons-styles"
          >
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
  margin:90px auto;
  border-radius: 4px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
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
  margin-top: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-gap: 10px;
  align-items: center;
  justify-content: space-around;
}

.not-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 768px) {
  .body-wrapper {
    max-width: 600px;
  }

}
</style>