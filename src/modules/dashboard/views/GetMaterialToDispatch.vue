<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="alarm-wrapper">
      <div v-if="pendientes.length > 0" class="header">
        <h1>DESPACHOS PENDIENTES</h1>
      </div>
      <div v-if="pendientes.length > 0" class="body-wrapper">
        <div class="pendiente-wrapper">
          <pendiente
            v-for="pendiente of pendientes"
            :key="pendientes.id"
            :pendiente="pendiente"
          />
        </div>
      </div>

      <div v-else class="not-registers">
        <h1>NO HAY REGISTROS</h1>
      </div>
      <div class="back-button">
        <button @click="onGenerateExcel" type="button" class="buttons-styles">
          Exportar
        </button>
        <button
          @click="$router.push({ name: 'data-menu' })"
          type="button"
          class="buttons-styles"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import useMaterials from "../composables/materialsStore";
import Pendiente from "../components/Pendiente.vue";
import createFile from "../composables/createExcelFile";

export default {
  components: { Pendiente, Loader },
  setup() {
    const { pendientes, status } = useMaterials();
    const { createUsersExcelFile } = createFile();

    return {
      pendientes,
      status,

      onGenerateExcel: async () => {
        new Swal({
          title: "Generando informe, espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let category = "DESPACHOS_PENDIENTES";

        let { usersExcelErrors, usersExcel, usersExcelOk } =
          await createUsersExcelFile(category, pendientes.value);

        if (usersExcelOk.value === false) {
          Swal.fire("Error", `${usersExcelErrors.value}.`, "error");
          return;
        } else {
          Swal.fire(
            "Informe generado",
            `El archivo ${usersExcel.value} se ha generado con éxito.`
          );
        }
      },
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
  min-height: 100vh;
  width: 100%;
  height: 100%;
  display: flex;
}

.alarm-wrapper {
  height: 80vh;
  min-height: 800px;
  margin: 12vh auto 8vh auto;
  background-color: #fff;
  border-radius: 4px;
  width: 90vw;
  min-width: 338px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.header {
  text-align: center;
  height: 48px;
}

.body-wrapper {
  cursor: default;
  height: 60vh;
  min-height: 650px;
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
  height: 60vh;
  min-height: 650px;
}

.buttons-styles {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
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
    background-color: rgba($color: #444444, $alpha: 1);
  }
}

@media screen and (min-width: 768px) {
  .alarm-wrapper {
    max-width: 600px;
  }
}
</style>