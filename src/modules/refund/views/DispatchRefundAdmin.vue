<template>
  <div v-if="imageOneCompleted === true">
    <img-one :imageOne="imageOne" @on:close="onShowImageOne" />
  </div>

  <Loader v-if="refundPendingIdStatus === 'CARGANDO'" class="loader-wrapper" />

  <div v-else>
    <div v-if="refundPendingId !== 'none'">
      <form @submit.prevent="onSubmit" class="wrapper-form">
        <h1>Registrar Devolución</h1>
        <div class="forum-data">
          <p>Número de ID:</p>
          <p>
            <b>{{ refundPendingId.id }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Fecha de ingreso:</p>
          <p>
            <b>{{ refundPendingIdDate.date }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Hora de ingreso:</p>
          <p>
            <b>{{ refundPendingIdDate.hour }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Código:</p>
          <p>
            <b>{{ refundPendingId.code }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Cantidad:</p>
          <p>
            <b>{{ refundPendingId.quantity }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Cantidad de bultos:</p>
          <p>
            <b>{{ refundPendingId.packageQuantity }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Nombre del conductor:</p>
          <p>
            <b>{{ refundPendingId.driverName }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Apellido del conductor:</p>
          <p>
            <b>{{ refundPendingId.driverLastname }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Patente del vehículo:</p>
          <p>
            <b>{{ refundPendingId.patent }}</b>
          </p>
        </div>
        <div class="forum-data">
          <p>Ubicación teórica:</p>
          <p>
            <b>{{ refundPendingId.possibleUbication }}</b>
          </p>
        </div>
        <div class="forum-item">
          <span>¿Cambiar la ubicación final?</span>
          <div class="inputs-container">
            <div class="input-container">
              <label for="yes">Si</label>
              <input type="radio" id="yes" name="ubication" value="yes" v-model="changeFinalUbication">
            </div>
            <div class="input-container">
              <label for="no">No</label>
              <input type="radio" id="no" name="ubication" value="no" v-model="changeFinalUbication"
                @click="onResetForumFinalUbication">
            </div>
          </div>
          <input v-if="changeFinalUbication === 'yes'" v-model="possibleUbication" type="text" maxlength="45"
            placeholder="Ingrese la ubicación final" />
        </div>
        <input type="file" @change="onImageTwo" id="imageTwo" accept="image/png, image/jpg, image/jpeg" />

        <div class="image-label">
          <label :class="[
            !localImageTwo ? image_label_unSelected : image_label_selected,
          ]" for="imageTwo">Seleccione la imagen</label>
        </div>
        <div v-if="localImageTwo" class="confirmation">
          <p>{{ imgTwoName }}</p>
        </div>
        <div class="forum-button">
          <button type="button" @click="$router.push({ name: 'get-dispatch-refund-admin' })" class="buttons-styles">
            Volver
          </button>
          <button type="button" @click="onShowImageOne" class="buttons-styles">
            Ver imagen ingreso
          </button>
          <button type="submit" class="buttons-styles">Finalizar</button>
        </div>
      </form>
    </div>
    <div v-else>
      <div class="not-wrapper">
        <h1>No existe registro</h1>
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
import useRefunds from "@/modules/operatorRefund/composables/operatorRefundsStore";
import updateRefund from "@/modules/operatorRefund/composables/updateRefund";
import uploadTwo from "@/modules/operatorRefund/helpers/imageTwo";
import ImgOne from '@/modules/operatorRefund/components/ImgOne.vue';

export default {
  components: { Loader, ImgOne },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();


    const image_label_selected = ref("image_label_selected");
    const image_label_unSelected = ref("image_label_unSelected");

    const localImageTwo = ref();
    const imgTwoName = ref();
    const imgTwo = ref(null);

    const { dispatchRefund } = updateRefund();

    const {
      getPendingRefund,
      refundPendingId,
      refundPendingIdStatus,
      pendiente,
      refundPendingIdDate,
      imageOneCompleted,
      imageOne
    } = useRefunds();

    const possibleUbication = ref('');

    const changeFinalUbication = ref("no");

    onUpdated(() => {
      getPendingRefund(route.params.id);
    });
    getPendingRefund(route.params.id);

    watch(
      () => localImageTwo.value,
      () => (imgTwo.value = localImageTwo.value)
    );

    const { uploadImageTwo } = uploadTwo();

    return {
      getPendingRefund,
      refundPendingId,
      refundPendingIdStatus,
      pendiente,
      refundPendingIdDate,
      possibleUbication,
      localImageTwo,
      imgTwoName,
      imgTwo,
      uploadImageTwo,
      dispatchRefund,
      image_label_selected,
      image_label_unSelected,
      imageOne,
      imageOneCompleted,
      changeFinalUbication,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const checkUbication = possibleUbication.value;

        const originalUbication = refundPendingId.value.possibleUbication;


        if (checkUbication === "" && changeFinalUbication.value === 'yes') {
          return Swal.fire({
            title: "Error",
            text: `Debe agregar la ubicación final`,
            icon: "error",
          });
        }

        if (checkUbication.length < 6 && changeFinalUbication.value === 'yes') {
          return Swal.fire({
            title: "Error",
            text: `La ubicación debe tener al menos 6 carácteres.`,
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

        const { errors, nice, code } = await dispatchRefund(
          checkUbication,
          pictureTwo,
          route.params.id,
          originalUbication
        );

        if (nice.value === false) {
          Swal.fire({
            title: "Error",
            text: `${errors.value}`,
            icon: "error",
          });
        } else {
          await store.dispatch("refunds/loadRefunds");

          Swal.fire(
            "Guardado",
            `Despacho ${code.value} registrado con éxito`,
            "success"
          ).then(function (result) {
            if (true) {
              router.push({ name: "get-dispatch-refund-admin" });
            } else {
              window.alert("Error, intente nuevamente");
            }
          });
        }
      },
      onShowImageOne: () => {
        if (imageOneCompleted.value === false) {
          return store.dispatch("refunds/changeImageOne", true);
        } else {
          return store.dispatch("refunds/changeImageOne", false);
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
      onResetForumFinalUbication: async () => {
        possibleUbication.value = '';
        return;
      }
    };
  },
};
</script>
    
<style lang="scss" scoped>
    
.selected {
  margin: 0;
  padding: 0;
}

.unSelected {
  margin: 0;
  padding: 0;
  background-color: red;
}

.wrapper-form {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
}
.wrapper-form h1 {
  text-align: center;
  margin: 4px 0;
}

.forum-item {
  display: grid;
  width: 100%;
  margin: auto;
}

.forum-item span {
  text-align: center;
  margin: 8px 0;
}
    
.forum-button {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
    
.forum-data {
  margin: 5px;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
}
    
.forum-data p {
  word-wrap: break-word;
  max-width: 90%;
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

.not-wrapper h1 {
  margin: auto;
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
.inputs-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-container label {
  margin: 0 4px;
}
@media screen and (min-width: 768px) {
  .forum-button {
    flex-direction: row;
  }
}
</style>