<template>
    <div class="massive-user-wrapper">
        <div class="instructions">
            <p>
                Descargue la plantilla Excel que encontrará abajo e ingrese los datos
                en el formato que aparece ahí, para que de esta forma datos sean cargados
                correctamente tenga en cuenta lo siguiente:
            </p>
            <hr />
            <ul class="padding-left">
                <li><b>Los nombres y apellidos deben ir en sus respectivas celdas.</b></li>
                <li><b>Los usuarios deben tener un email válido.</b></li>
                <li><b>Debe ingresar el rut con alguno de los siguientes formatos:</b></li>
                <ul class="padding-left">
                    <li>12.345.678-9</li>
                    <li>123456789</li>
                    <li>12*345*678*9</li>
                    <li>12345678-9</li>
                </ul>
                <li><b>Las divisiones deben escribirse de la siguiente manera:</b></li>
                <ul class="padding-left">
                    <li>TENIENTE</li>
                    <li>ANDINA</li>
                    <li>VENTANAS</li>
                    <li>SALVADOR</li>
                    <li>CHUQUICAMATA</li>
                    <li>ESPORADICOS ANDINA</li>
                    <li>ESPORADICOS TENIENTE</li>
                    <li>CASA MATRIZ</li>
                </ul>
                <li><b>El cargo debe ser uno de los siguientes:</b></li>
                <ul class="padding-left">
                    <li>PLANIFICADOR</li>
                    <li>OPERADOR LOGISTICO</li>
                </ul>
            </ul>
        </div>

        <div class="form-massive">
            <form @submit.prevent="onSubmit">
                <div class="buttons">
                    <input type="file" @change="onFile" id="excel-file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    <button @click="onDownload" type="button" class="buttons-styles">
                        Descargar plantilla
                    </button>
                    <label class="buttons-styles" for="excel-file">Seleccionar archivo</label>
                    <button type="submit" class="buttons-styles" value="Store File">
                        Cargar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import uploadUsers from "../composables/uploadExcelUsers";
import createFiles from "../composables/createFilesTemplate";
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

.buttons {
    display: block;
    margin: 20px 0 0 0;
}

.buttons button, label {
    // padding: 40px;
    text-align: center;
    width: 200px;
    height: 50px;
}

.massive-user-wrapper {
    background-color: white;
    padding: 1em;
}

.padding-left li {
    padding-left: 10px;
    list-style-position: inside;
}

input[type="file"] {
  display: none;
}

  
  @media screen and(min-width: 768px) {

    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
  
  }
  </style>