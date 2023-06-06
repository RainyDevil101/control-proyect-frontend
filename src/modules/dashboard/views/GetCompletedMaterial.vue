<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="alarm-wrapper">
    <h1>Despachos Finalizados</h1>
    <div class="overflow">
      <table class="table-wrapper">
        <thead>
          <tr>
            <th>Número de transporte</th>
            <th class="id">ID</th>
          </tr>
        </thead>
        <tbody>
          <completa v-for="completa of completas" :key="completa.id" :completa="completa" />
        </tbody>
      </table>
    </div>
    <div class="back-button">
      <button @click="onGenerateExcelCompleted" type="button" class="buttons-styles">
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
import Completa from "../components/Completa.vue";
import createFile from "../composables/createExcelFile";

export default {
  components: { Completa, Loader },
  setup() {
    const { completas, status } = useMaterials();
    const { createUsersCompletedExcelFile } = createFile();

    return {
      completas,
      status,

      onGenerateExcelCompleted: async () => {
        new Swal({
          title: "Generando informe, espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let category = "DESPACHOS_COMPLETADOS";

        let {
          usersExcelErrorsCompleted,
          usersExcelCompleted,
          usersExcelOkCompleted,
        } = await createUsersCompletedExcelFile(category, completas.value);

        if (usersExcelOkCompleted.value === false) {
          Swal.fire("Error", `${usersExcelErrorsCompleted.value}.`, "error");
          return;
        } else {
          Swal.fire(
            "Informe generado",
            `El archivo ${usersExcelCompleted.value} se ha generado con éxito.`
          );
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.alarm-wrapper {
  margin: auto;
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

.table-wrapper tr:nth-child(even) {
    background-color: #f2f2f2;
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

@media screen and (min-width: 768px) {

}
</style>