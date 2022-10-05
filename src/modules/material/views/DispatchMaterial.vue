<template>
  <div v-if="imageOneCompleted === true">
    <img-one :imageOne="imageOne" @on:close="onShowImageOne" />
  </div>

  <Loader
    v-if="materialPendingIdStatus === 'CARGANDO'"
    class="loader-wrapper"
  />

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
            <p>Ubicación:</p>
            <p>
              <b>{{ materialPendingId.ubication }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Destino:</p>
            <p>
              <b>{{ materialPendingId.destination_name }}</b>
            </p>
          </div>
          <div class="forum-data">
            <p>Estado:</p>
            <p>
              <b>{{ pendiente }}</b>
            </p>
          </div>
          <div class="forum-item">
            <span>Ingrese nuevo N° de documento</span>
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
            accept="image/png, image/jpg, image/jpeg"
          />

          <div class="image-label">
            <label
              :class="[
                !localImageTwo ? image_label_unSelected : image_label_selected,
              ]"
              for="imageTwo"
              >Seleccione la imagen</label
            >
          </div>
          <div v-if="localImageTwo" class="confirmation">
            <p>{{ imgTwoName }}</p>
          </div>
          <div class="forum-button">
            <button type="submit" class="buttons-styles">Finalizar</button>
            <button
              type="button"
              @click="$router.push({ name: 'get-material' })"
              class="buttons-styles"
            >
              Volver
            </button>
          </div>
        </form>
        <div class="image-label">
          <button @click="onShowImageOne" class="buttons-styles">
            Ver imagen ingreso
          </button>
        </div>
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
import { useStore } from "vuex";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import useMaterials from "../composables/materialsStore";
import updateMaterial from "@/modules/material/composables/updateMaterial";
import uploadTwo from "@/modules/material/helpers/imageTwo";
import ImgOne from '@/modules/dashboard/components/ImgOne.vue';

export default {
  components: { Loader, ImgOne },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const materialForm = ref({
      transport_number_two: "",
    });

    const image_label_selected = ref("image_label_selected");
    const image_label_unSelected = ref("image_label_unSelected");

    const localImageTwo = ref();
    const imgTwoName = ref();
    const imgTwo = ref(null);

    const { dispatchMaterial } = updateMaterial();

    const {
      getMaterialPending,
      materialPendingId,
      materialPendingIdStatus,
      pendiente,
      materialPendingIdDate,
      imageOneCompleted,
      imageOne
    } = useMaterials();

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
      image_label_selected,
      image_label_unSelected,
      imageOne,
      imageOneCompleted,

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

        const { errors, nice, code } = await dispatchMaterial(
          materialForm.value,
          pictureTwo,
          route.params.id
        );

        if (nice.value === false) {
          Swal.fire({
            title: "Error",
            text: `${errors.value}`,
            icon: "error",
          });
        } else {
          await store.dispatch("materials/loadMaterials");

          Swal.fire(
            "Guardado",
            `Bulto ${code.value} registrado con éxito`,
            "success"
          ).then(function (result) {
            if (true) {
              router.push({ name: "get-material" });
            } else {
              window.alert("Error, intente nuevamente");
            }
          });
        }
      },
      onShowImageOne: () => {
        if (imageOneCompleted.value === false) {
          return store.dispatch("materials/changeImageOne", true);
        } else {
          return store.dispatch("materials/changeImageOne", false);
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
h1,
label {
  margin: 0;
  padding: 0;
}

.selected {
  margin: 0;
  padding: 0;
}

.unSelected {
  margin: 0;
  padding: 0;
  background-color: red;
}

.wrapper {
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
  padding: 8px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.forum-item {
  display: grid;
  width: 100%;
  margin: auto;
}

.forum-item span {
  text-align: center;
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

  width: 21rem;
  display: flex;
  justify-content: space-between;
}

.forum-data p {
  word-wrap: break-word;
  max-width: 10rem;
}

input[type="file"] {
  display: none;
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
.confirmation p {
  background-color: #66cc91;
  border-radius: 4px;
  color: white;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
  margin: auto;
  cursor: default;
}

.image_label_unSelected {
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: white;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 4px;
  transition: 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.827);
  }
}

.image_label_selected {
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: white;
  background-color: #66cc91;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 4px;
  transition: 0.2s;
}
.image-label {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>