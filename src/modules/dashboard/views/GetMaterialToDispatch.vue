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
.alarm-wrapper {
  min-height: 400px;
  margin-top: 70px;
  margin-bottom: 70px;
  background-color: #fff;
  border-radius: 4px;
  width: 90vw;
  min-width: 338px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.header {
  text-align: center;
}

.body-wrapper {
  cursor: default;
  height: 500px;
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

@media screen and (min-width: 768px) {
  .alarm-wrapper {
    max-width: 600px;
  }
}
</style>