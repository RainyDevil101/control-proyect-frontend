<template>
  <loader v-if="status === 'CARGANDO'" class="loader-wrapper" />

  <div v-else class="wrapper">
    <div class="material-form">
      <div class="header">
        <h1>Registro</h1>
      </div>
      <div class="p-4">
        <form @submit.prevent="onSubmit">
          <div class="item-form">
            <p>Ingrese N° de transporte</p>
            <input v-model="materialForm.transport_number" type="text" maxlength="45" />
          </div>
          <div class="item-form">
            <p>Código de material</p>
            <input v-model="materialForm.code" type="text" maxlength="45" />
          </div>
          <div class="item-form">
            <p>Cantidad</p>
            <input v-model="materialForm.cantidad" type="number" maxlength="99" />
          </div>
          <div class="item-form">
            <p>Cantidad de bultos</p>
            <input v-model="materialForm.cantidad_bultos" type="number" maxlength="99" />
          </div>
          <div class="item-form">
            <p>Destino</p>
            <select v-model="materialForm.destination">
              <option v-for="destination of destinations" :key="destination.nombre" :value="destination">
                {{ destination.nombre }}
              </option>
            </select>
          </div>
          <div class="item-form">
            <p>Ubicación</p>
            <textarea v-model="materialForm.ubication" maxlength="60"></textarea>
          </div>
          <div class="item-form image-form">
            <input type="file" @change="onImageOne" id="imageOne" accept="image/png, image/jpg, image/jpeg" />
            <div v-if="localImageOne" class="confirmation">
              <p>{{ imgOneName }}</p>
            </div>
          </div>
          <div class="submit-button">
            <label class="buttons-styles" for="imageOne">Seleccion imagen</label>
            <button class="buttons-styles" type="submit">Finalizar</button>
            <button type="button" @click="$router.push({ name: 'menu-materials' })" class="buttons-styles">
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import getDestination from "../../get/getDestination";
import uploadOne from "@/modules/material/helpers/imageOne";
import sendMaterial from "@/modules/material/composables/createMaterial";
import useAuth from "@/modules/auth/composables/useAuth";

export default {
  components: { Loader },
  setup() {
    const localImageOne = ref();
    const imgOneName = ref();
    const imgOne = ref(null);

    const materialForm = ref({
      transport_number: "",
      code: "",
      cantidad: "",
      cantidad_bultos: "",
      destination: "",
      ubication: "",
    });

    const { userDivision, userId } = useAuth();

    const { destinations, searchDestinations, status, secondStatus } =
      getDestination();

    const { sendForum } = sendMaterial();

    const { uploadImageOne } = uploadOne();

    watch(
      () => localImageOne.value,
      () => (imgOne.value = localImageOne.value)
    );

    return {
      localImageOne,
      imgOneName,
      imgOne,
      destinations,
      searchDestinations,
      status,
      secondStatus,
      materialForm,
      uploadImageOne,
      sendForum,
      userId,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const check = materialForm.value;

        if (
          check.transport_number === "" ||
          check.code === "" ||
          check.cantidad === "" ||
          check.cantidad_bultos === "" ||
          check.destination === ""
        ) {
          return Swal.fire({
            title: "Error",
            text: `Debe completar los campos`,
            icon: "error",
          });
        }
        if (imgOne.value === null) {
          return Swal.fire({
            title: "Error",
            text: `Debe seleccionar la imagen`,
            icon: "error",
          });
        }

        const pictureOne = await uploadOne(imgOne.value);

        const { errors, nice, materialId } = await sendForum(
          materialForm.value,
          pictureOne,
          userDivision.value,
          userId.value
        );

        if (nice.value === false) {
          Swal.fire({
            title: "Error",
            text: `${errors.value}`,
            icon: "error",
          });
        } else {
          Swal.fire(
            "Guardado",
            `Bulto ${materialId.value} registrado con éxito`,
            "success"
          ).then(function (result) {
            if (true) {
              location.reload();
            } else {
              window.alert("Error, intente nuevamente");
            }
          });
        }
      },

      onImageOne: async (event) => {
        const file = event.target.files[0];
        if (!file) {
          localImageOne.value = null;
          imgOneName.value = null;
          return;
        } else {
          imgOneName.value = file.name;
          const fr = new FileReader();
          fr.onload = () => (localImageOne.value = fr.result);
          fr.readAsDataURL(file);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>

.item-form p {
  margin: 4px;
}

.material-form {
  margin: auto;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.image-form {
  display: block;
}

.item-form input {
  width: 100%;
}

.submit-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.submit-button button {
  border-radius: 4px;
}

.loader-wrapper {
  width: 100%;
}

input[type="file"] {
  display: none;
}

.image-label {
  margin-top: 1rem;

}

.confirmation {
  margin: 4px 0 4px 0;
}

.confirmation p {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
  color: white;
  text-align: center;
  overflow: hidden;
  max-width: 200px;
  margin: auto;
  cursor: default;
}


@media screen and (min-width: 768px) {

}

</style>