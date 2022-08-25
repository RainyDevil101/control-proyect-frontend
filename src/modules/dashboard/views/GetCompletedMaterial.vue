<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="alarm-wrapper">
      <div v-if="completas.length > 0" class="header">
        <h1>COMPLETAS</h1>
      </div>
      <div v-if="completas.length > 0" class="body-wrapper">
        <div class="pendiente-wrapper">
          <completa
            v-for="completa of completas"
            :key="completa.id"
            :completa="completa"
          />
        </div>
      </div>

      <div v-else class="not-registers">
        <h1>NO HAY REGISTROS</h1>
      </div>
        <div class="back-button">
          <button @click="$router.push({ name: 'data-menu' })" type="buton" class="buttons-styles">Volver</button>
        </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/modules/components/Loader.vue";
import useMaterials from "../composables/materialsStore";
import Completa from "../components/Completa.vue";

export default {
  components: { Completa, Loader },
  setup() {
    const { completas, status } = useMaterials();

    return {
      completas,
      status,
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.alarm-wrapper {
  height: 80vh;
  margin: auto;
  background-color: #fff;
  border-radius: 4px;
  width: 90vw;
  min-width: 338px;
}

.header {
  text-align: center;
  height: 6%;
}

.body-wrapper {
  cursor: default;
  height: 94%;
  overflow: auto;
  margin: auto;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.not-registers {
  display: flex;
  justify-content: center;
  align-items: center;
    overflow: auto;
  margin: auto;
  height: 100%;
}


.buttons-styles {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 4px;
  color: white;
  padding: 8px;
  width: 9.8rem;
  margin: 4px auto 4px auto;
  height: 44px;
  border: none;
  cursor: default;
    transition: 0.2s;

  &:hover {
    background-color: rgba($color: #444444, $alpha: 1.0);
  }

}

@media screen and (min-width: 768px) {
  .alarm-wrapper {
    max-width: 600px;
  }
}
</style>