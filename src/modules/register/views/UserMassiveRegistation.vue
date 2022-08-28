<template>
  <div class="wrapper">
    <div class="container-massive">
      <div class="massive-header">
        <h1>Carga de usuarios</h1>
      </div>

      <div class="instructions">
        <p>
          Descargue la plantilla Excel que encontrará abajo e ingrese los datos
          en el formato que aparece ahí, para que los datos sean cargados
          correctamente tenga en cuenta lo siguiente:
        </p>
        <hr />
        <ul>
          <li>Los nombres y apellidos deben ir en sus respectivas celdas.</li>
          <li>Los usuarios deben tener un email válido.</li>
          <li>
            Debe ingresar el rut con alguno de los siguientes formatos:
            <ul>
              <li>12.345.678-9</li>
              <li>123456789</li>
              <li>12*345*678*9</li>
              <li>12345678-9</li>
            </ul>
          </li>
          <li>
            <p>Las divisiones deben escribirse de la siguiente manera:</p>
            <ul>
              <li>TENIENTE</li>
              <li>ANDINA</li>
              <li>VENTANAS</li>
              <li>SALVADOR</li>
              <li>CHUQUICAMATA</li>
              <li>ESPORADICOS ANDINA</li>
              <li>ESPORADICOS TENIENTE</li>
              <li>CASA MATRIZ</li>
            </ul>
          </li>
          <li>
            <p>El cargo debe ser uno de los siguientes:</p>
            <ul>
              <li>PLANIFICADOR</li>
              <li>OPERADOR LOGISTICO</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="form-massive">
        <form @submit.prevent="onSubmit">
          <div class="input-button">
            <input
              type="file"
              @change="onFile"
              id="excel-file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <div class="button-align download-plantilla">
              <button @click="onDownload" type="button" class="buttons-styles">
                Descargar plantilla
              </button>
            </div>
            <div class="button-align select-file">
              <label class="buttons-styles" for="excel-file"
                >Seleccionar archivo</label
              >
            </div>
            <div class="button-align load-file-button">
              <button type="submit" class="buttons-styles" value="Store File">
                Cargar
              </button>
            </div>
            <div class="button-align back-button">
              <button
                type="button"
                @click="$router.push({ name: 'select-register' })"
                class="buttons-styles"
              >
                Volver
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import uploadUsers from "../composables/uploadExcelUsers";
import createFiles from "../composables/createUserTemplate";
import Swal from "sweetalert2";
export default {
  setup() {
    const store = useStore();
    const localFile = ref(null);

    const { sendData } = uploadUsers();
    const { excelTemplateUsers } = createFiles();

    return {
      localFile,
      sendData,
      excelTemplateUsers,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const { errors, nice, message } = await sendData(localFile.value);

        if (nice.value === false) {
          Swal.fire("Error", `${errors.value}.`, "error").then(function (
            result
          ) {
            if (true) {
              location.reload();
            }
          });
          return;
        } else {
          await store.dispatch("users/loadUsers");

          Swal.fire("Guardado", `${message.value}`, "success").then(function (
            result
          ) {
            if (true) {
              location.reload();
            }
          });
        }
      },
      onFile: async (event) => {
        const file = event.target.files[0];
        if (!file) {
          localFile.value = null;
          return;
        } else {
          localFile.value = file;
        }
      },
      onDownload: async () => {

        const { ok } = excelTemplateUsers();

        console.log(ok);

      },
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 8px 0 8px 0;
}

p {
  margin: 8px 0 8px 0;
}
.wrapper {
  padding-top: 4rem;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-massive {
  background-color: white;
  border-radius: 4px;
  margin: 4px;
}

.form-massive {
  padding: 1rem;
}

.input-button {
  display: block;
  margin: auto;
}

.button-align {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 0 4px 0;
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
  height: 44px;
  border: none;
  cursor: default;
    transition: 0.2s;

  &:hover {
    background-color: rgba($color: #444444, $alpha: 1.0);
  }

}

input[type="file"] {
  display: none;
}

.download-file {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 0 4px 0;
}

.instructions {
  max-width: 680px;
}

.massive-header {
  text-align: center;
  margin: 4px 0 4px 0;
}

@media screen and(min-width: 720px) {
  .input-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container-massive {
  padding: 1rem;
}

}
</style>