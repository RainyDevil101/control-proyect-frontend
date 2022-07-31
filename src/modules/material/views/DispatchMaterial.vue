<template>
  <Loader v-if="materialPendingIdStatus === 'CARGANDO'" class="loader-wrapper"/>

  <div v-else class="wrapper">
    <div class="wrapper-form">
      <div v-if="materialPendingId !== 'none'">
        <form @submit.prevent="onSubmit">
          <div class="forum-data">
            <p>Fecha de ingreso:</p>
            <p>
              <b>{{ materialPendingIdDate.date }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Hora de ingreso:</p>
            <p>
              <b>{{ materialPendingIdDate.hour }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Número de transporte:</p>
            <p>
              <b>{{ materialPendingId.transport_number }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Código:</p>
            <p>
              <b>{{ materialPendingId.code }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Cantidad:</p>
            <p>
              <b>{{ materialPendingId.cantidad }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Cantidad de bultos:</p>
            <p>
              <b>{{ materialPendingId.cantidad_bultos }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Destino:</p>
            <p>
              <b>{{ materialPendingId.destination }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Estado:</p>
            <p>
              <b>{{ pendiente }}</b>
            </p>
          </div>
          <div class="forum-item">
            <span>Número de transporte en despacho</span>
            <input
              v-model="materialForm.transport_number_two"
              type="text"
              maxlength="45"
            />
          </div>
          <input
            type="file"
            @change="onImageTwo"
            id="imageTwo"
            accept="image/png, image/jpg, image/ jpeg"
          />
          <div class="image-label">
            <label for="imageTwo">Seleccione la imagen</label>
          </div>
          <div v-if="localImageTwo" class="confirmation">
            <p>{{ imgTwoName }}</p>
          </div>
          <div class="forum-button">
            <button
            type="submit" class="btn btn-warning">Registrar</button>
          <button
          type="button"
            @click="$router.push({ name: 'get-material' })"
            class="btn btn-primary"
          >
            Volver
          </button>
          </div>


        </form>
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
import { onUpdated, ref, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import useMaterials from "../composables/materialsStore";
import updateMaterial from "../composables/updateMaterial";
import Loader from "@/modules/components/Loader.vue";
import uploadTwo from "../helpers/imageTwo";
import Swal from "sweetalert2";
import { useStore } from 'vuex';

export default {
  components: { Loader },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const materialForm = ref({
      transport_number_two: "",
    });

    const localImageTwo = ref();
    const imgTwoName = ref();
    const imgTwo = ref(null);

    const { dispatchMaterial } = updateMaterial();

    const { getMaterialPending, materialPendingId, materialPendingIdStatus, pendiente, materialPendingIdDate } =
      useMaterials();

    onUpdated(() => {
      getMaterialPending(route.params.id);
    });
    getMaterialPending(route.params.id);

    watch(
      () => localImageTwo.value,
      () => (imgTwo.value = localImageTwo.value)
    );

    const { uploadImageTwo } = uploadTwo();

    return {
      getMaterialPending,
      materialPendingId,
      materialPendingIdStatus,
      pendiente,
      materialPendingIdDate,
      materialForm,
      localImageTwo,
      imgTwoName,
      imgTwo,
      uploadImageTwo,
      dispatchMaterial,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const check = materialForm.value;

        if (check.transport_number_two === "") {
          return Swal.fire({
            title: "Error",
            text: `Debe completar el registro`,
            icon: "error",
          });
        }

        if (imgTwo.value === null) {
          return Swal.fire({
            title: "Error",
            text: `Debe seleccionar la imagen`,
            icon: "error",
          });
        }

        const pictureTwo = await uploadTwo(imgTwo.value);

        const { errors, nice, code } = await dispatchMaterial(materialForm.value, pictureTwo, route.params.id);

        if (nice.value === false) {
          Swal.fire({
            title: "Error",
            text: `${errors.value}`,
            icon: "error",
          })
        } else {

          await store.dispatch("materials/loadMaterials");

          Swal.fire(
            "Guardado",
            `Bulto ${code.value} registrado con éxito`,
            "success"
          ).then(function (result) {
            if (true) {
              router.push({ name: 'get-material' });
            } else {
              window.alert("Error, intente nuevamente");
            }
          });
        }

      },

      onImageTwo: async (event) => {
        const file = event.target.files[0];
        if (!file) {
          localImageTwo.value = null;
          imgTwoName.value = null;
          return;
        } else {
          imgTwoName.value = file.name;
          const fr = new FileReader();
          fr.onload = () => (localImageTwo.value = fr.result);
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

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.wrapper-form {
  background-color: #fff;
  margin: auto;
  // width: 100%;
  border-radius: 4px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forum-item {
  display: grid;
  width: 80%;
  margin: auto;
}

.forum-button {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.forum-data {
  margin: 5px;
  padding: 10px;
  // flex-grow: 1;
  width: 21rem;
  display: flex;
  justify-content: space-between;
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

.not-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.loader-wrapper {
  width: 100vw;
  height: 100vh;
}

.not-wrapper h1 {
  margin: auto;
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