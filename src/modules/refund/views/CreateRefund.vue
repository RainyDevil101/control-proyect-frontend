<template>
    <div v-if="createClient === true">
        <create-client @on:close="onShowCreateClient"/>
    </div>

    <loader v-if="placeStatus === 'CARGANDO' || clientStatus === 'CARGANDO'" class="loader-wrapper" />

    <div v-else class="refund_form-wrapper">
        <div class="refund-form">
            <div class="header">
                <h1>Registro</h1>
            </div>
            <div class="body body-form">
                <form @submit.prevent="onSubmit">
                    <div class="item-form">
                        <p>Código</p>
                        <input v-model="refundForm.code" type="text" maxlength="45" />
                    </div>
                    <div class="item-form">
                        <p>Cantidad</p>
                        <input v-model="refundForm.quantity" type="number" maxlength="2" />
                    </div>
                    <div class="item-form">
                        <p>Cantidad de bultos</p>
                        <input v-model="refundForm.packageQuantity" type="number" maxlength="2" />
                    </div>
                    <div class="item-form">
                        <p>Nombre del Chofer</p>
                        <input v-model="refundForm.driverName" type="text" maxlength="45">
                    </div>
                    <div class="item-form">
                        <p>Apellido del Chofer</p>
                        <input v-model="refundForm.driverLastname" type="text" maxlength="45">
                    </div>
                    <div class="item-form">
                        <p>Patente</p>
                        <input v-model="refundForm.patent" type="text" maxlength="6">
                    </div>
                    <div class="item-form">
                        <p>Destino</p>
                        <select v-model="refundForm.dispatchPlaces">
                            <option v-for="place of places" :key="place.id" :value="place.id">
                                {{ place.place }}
                            </option>
                        </select>
                    </div>
                    <div class="item-form">
                        <p>Ubicación teórica</p>
                        <input v-model="refundForm.possibleUbication" type="text" maxlength="30">
                    </div>
                    <div class="item-form">
                        <p>Cliente</p>
                        <select v-model="refundForm.client">
                            <option selected disabled value="">--Seleccione un cliente--</option>
                            <option v-for="client of clients" :key="client.id" :value="client.id">
                                {{ client.name }}
                            </option>
                        </select>
                        <div class="new-client" @click="onShowCreateClient">Crear nuevo cliente</div>
                    </div>
                    <div class="item-form">
                        <p>Observaciones</p>
                        <textarea v-model="refundForm.observations" maxlength="70"></textarea>
                    </div>

                    <div class="item-form image-form">
                        <input type="file" @change="onImageOne" id="imageOne" accept="image/png, image/jpg, image/jpeg" />
                        <div class="image-label">
                            <label for="imageOne">Seleccione la imagen</label>
                        </div>
                        <div v-if="localImageOne" class="confirmation">
                            <p>{{ imgOneName }}</p>
                        </div>
                    </div>
                    <div class="submit-button">
                        <button class="buttons-styles" type="submit">Finalizar</button>
                        <button type="button" @click="$router.push({ name: 'menu-refunds' })" class="buttons-styles">
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
import getPlaces from "../../get/getPlace";
import uploadOne from "@/modules/refund/helpers/imageOne";
import sendRefund from "@/modules/refund/composables/createRefund";
import useAuth from "@/modules/auth/composables/useAuth";
import getClients from "@/modules/get/getClient";
import CreateClient from "../components/CreateClient.vue";
import getTerm from "@/helpers/searchByTerm";
import { useStore } from "vuex";

export default {
    components: { Loader, CreateClient },
    setup() {

        const store = useStore();

        const localImageOne = ref();
        const imgOneName = ref();
        const imgOne = ref(null);

        const refundForm = ref({
            code: "11113333",
            quantity: "12",
            packageQuantity: "12",
            driverName: "Chofer de prueba",
            driverLastname: "Apellido de prueba",
            patent: "123345",
            dispatchPlaces: "",
            possibleUbication: "Ubicación de prueba",
            observations: "Registro de prueba",
            client: ""
        });

        const { userDivision, userId } = useAuth();

        const { places, searchPlaces, placeStatus } = getPlaces();
        const { clients, searchClients, clientStatus } = getClients();


        const { sendForum } = sendRefund();

        const { uploadImageOne } = uploadOne();

        const { createClient } = getTerm();

        watch(
            () => localImageOne.value,
            () => (imgOne.value = localImageOne.value)
        );

        return {
            localImageOne,
            imgOneName,
            imgOne,
            places,
            searchPlaces,
            placeStatus,
            clients,
            searchClients,
            clientStatus,
            refundForm,
            uploadImageOne,
            sendForum,
            userId,
            createClient,

            onSubmit: async () => {
                new Swal({
                    title: "Espere por favor",
                    allowOutsideClick: false,
                });
                Swal.showLoading();

                const check = refundForm.value;

                if (
                    check.code === "" ||
                    check.quantity === "" ||
                    check.packageQuantity === "" ||
                    check.driverName === "" ||
                    check.driverLastname === "" ||
                    check.patent === "" ||
                    check.dispatchPlaces === "" ||
                    check.possibleUbication === "" ||
                    check.client === "" ||
                    check.observations === ""
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

                const { errors, nice, refundId } = await sendForum(
                    refundForm.value,
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
                        `Bulto ${refundId.value} registrado con éxito`,
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
            onShowCreateClient: () => {
                if (createClient.value === false) {
                    store.dispatch("refunds/changeCreateClient", true);
                    return;
                } else {
                    store.dispatch("refunds/changeCreateClient", false);
                    return;
                }
            },
        };
    },
};
</script>

<style lang="scss" scoped>

.item-form p {
  margin: 2px 0;
}

.refund-form {
  border-radius: 4px;
  padding: 8px;
  margin: 70px auto;
  min-width: 350px;
  max-width: 450px;
  background-color: #fff;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
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
  justify-content: space-around;
  align-items: center;
}

.loader-wrapper {
  width: 100vw;
  height: 100vh;
}

.new-client {
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    color: white;
    border-radius: 4px;
    padding: 2px;
    margin: 8px auto;
    width: 100%;
    text-align: center;
    cursor: default;

    &:hover {
        background-color: rgba(0, 0, 0, 0.827);
    }
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
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
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
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.827);
  }
}

</style>