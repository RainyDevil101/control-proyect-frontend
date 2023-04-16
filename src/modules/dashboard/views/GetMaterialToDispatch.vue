<template>
  <loader v-if="status === 'CARGANDO'" />

  <div class="alarm-wrapper">
    <h1>Despachos Pendientes</h1>
      <div class="overflow">
        <table class="table-wrapper">
          <thead>
            <tr>
              <th>Código</th>
              <th class="id">ID</th>
            </tr>
          </thead>
          <tbody>
            <pendiente v-for="pendiente of pendientes" :key="pendientes.id" :pendiente="pendiente" />
          </tbody>
        </table>
      </div>

    <div class="back-button">
      <button @click="onGenerateExcel" type="button" class="buttons-styles">
        Exportar
      </button>
      <button @click="$router.push({ name: 'data-menu' })" type="button" class="buttons-styles">
        Volver
      </button>
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
  background-color: #fff;
}

.alarm-wrapper h1 {
  text-align: center;
  margin: 4px 0;
}

.overflow {
  height: 70vh;
  overflow: auto;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.table-wrapper {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.table-wrapper th {
    color: white;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    text-align: left;
    padding: 12px 8px;
}

.id {
    width: 50px;
}



</style>