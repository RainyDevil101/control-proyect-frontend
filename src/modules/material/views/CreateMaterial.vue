<template>
  <loader v-if="status === 'CARGANDO'" class="loader-wrapper"/>

  <div v-else class="wrapper">
    <div class="material-form">
      <div class="header-form">
        <h1>Registro</h1>
      </div>
      <div class="body body-form">
        <form @submit.prevent="onSubmit">
          <div class="item-form">
            <p>N° de transporte</p>
            <input
              v-model="materialForm.transport_number"
              type="text"
              maxlength="45"
            />
          </div>
          <div class="item-form">
            <p>Código</p>
            <input v-model="materialForm.code" type="text" maxlength="45" />
          </div>
          <div class="item-form">
            <p>Cantidad</p>
            <input v-model="materialForm.cantidad" type="number" />
          </div>
          <div class="item-form">
            <p>Cantidad de bultos</p>
            <input v-model="materialForm.cantidad_bultos" type="number" />
          </div>
          <div class="item-form">
            <p>Destino</p>
            <select v-model="materialForm.destination">
              <option
                v-for="destination of destinations"
                :key="destination.nombre"
                :value="destination.id"
              >
                {{ destination.nombre }}
              </option>
            </select>
          </div>
          <div class="item-form image-form">
            <input
              type="file"
              @change="onImageOne"
              id="imageOne"
              accept="image/png, image/jpg, image/ jpeg"/>
            <div class="image-label">
              <label for="imageOne">Seleccione la imagen</label>
            </div>
            <div v-if="localImageOne" class="confirmation">
              <p>{{ imgOneName }}</p>
            </div>
          </div>
          <div class="submit-button">
            <button class="btn btn-warning" type="submit">Registrar</button>
            <button class="btn btn-primary" @click="$router.push({ name: 'menu-materials' })" type="button">Volver</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import getDestination from "../../get/getDestination";
import uploadOne from "../helpers/imageOne";
import sendMaterial from "../composables/createMaterial";
import { watch } from "@vue/runtime-core";
import useAuth from '@/modules/auth/composables/useAuth';

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
    });

    const { userDivision } = useAuth();

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
          userDivision.value
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
p,
h1 {
  margin: 0;
  padding: 0;
}

.item-form p {
  margin: 4px;
}

.header-form {
  text-align: center;
}

.header-form h1 {
  margin: 6px;
}

.wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.material-form {
  border-radius: 4px;
  padding: 8px;
  margin: auto;
  background-color: #fff;
}

.body-form {
  padding: 2px;
}

.image-form {
  display: block;
}

.item-form input {
  width: 100%;
}

.submit-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
}

.submit-button button {
  border-radius: 4px;
}

.loader-wrapper {
  width: 100vw;
  height: 100vh;
}

input[type="file"] {
  display: none;
}

.image-label {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirmation {
  margin: 4px 0 4px 0;
}

.confirmation p {
  background-color: black;
  border-radius: 4px;
  color: white;
  text-align: center;
  overflow: hidden;
  max-width: 200px;
  margin: auto;
  cursor: default;
}

label {
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: white;
  background-color: black;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.827);
  }
}
</style>