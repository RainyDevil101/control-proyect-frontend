<template>
    <div v-if="createClient === true">
        <create-client @on:close="onShowCreateClient" />
    </div>

    <loader v-if="placeStatus === 'CARGANDO' || clientStatus === 'CARGANDO'" class="loader-wrapper fixed" />

    <div v-else class="refund-form">
        <h1>Registro de devolución</h1>
        <form @submit.prevent="onSubmit">
            <p class="item-form">
                <label for="code">Código</label>
                <input id="code" v-model="refundForm.code" type="text" maxlength="45" />
            </p>
            <p class="item-form">
                <label for="quantity">Cantidad</label>
                <input id="quantity" v-model="refundForm.quantity" type="number" maxlength="2" />
            </p>
            <p class="item-form">
                <label for="package">Cantidad de bultos</label>
                <input id="package" v-model="refundForm.packageQuantity" type="number" maxlength="2" />
            </p>
            <p class="item-form">
                <label for="driverName">Nombre del Chofer</label>
                <input id="driverName" v-model="refundForm.driverName" type="text" maxlength="45">
            </p>
            <p class="item-form">
                <label for="driverLastname">Apellido del Chofer</label>
                <input id="driverLastname" v-model="refundForm.driverLastname" type="text" maxlength="45">
            </p>
            <p class="item-form">
                <label for="patent">Patente</label>
                <input id="patent" v-model="refundForm.patent" type="text" maxlength="6">
            </p>
            <p class="item-form">
                <label for="ubication">Ubicación teórica</label>
                <input id="ubication" v-model="refundForm.possibleUbication" type="text" maxlength="30">
            </p>
            <p class="item-form">
                <label>Destino</label>
                <select v-model="refundForm.dispatchPlaces">
                    <option v-for="place of places" :key="place.id" :value="place.id">
                        {{ place.place }}
                    </option>
                </select>
            </p>
            <p class="item-form-client">
                <select v-model="refundForm.client">
                    <option selected disabled value="">--Seleccione un cliente--</option>
                    <option v-for="client of clients" :key="client.id" :value="client.id">
                        {{ client.name }}
                    </option>
                </select>
            </p>
            <p class="button-form-client" @click="onShowCreateClient">Crear nuevo cliente</p>
            <p class="item-form block">
                <label for="observations">Observaciones</label>
                <textarea id="observations" v-model="refundForm.observations" maxlength="70"></textarea>
            </p>

            <div class="buttons-form block">
                <button type="button" @click="$router.push({ name: 'menu-refunds' })" class="button-form">
                    Volver
                </button>
                <input class="button-form" type="file" @change="onImageOne" id="imageOne"
                    accept="image/png, image/jpg, image/jpeg" />
                    <p class="button-form" v-if="localImageOne"><label for="imageOne">{{ imgOneName }}</label></p>
                    <p v-if="!localImageOne" class="button-form"><label for="imageOne">Seleccione la imagen</label></p>
                <button class="button-form" type="submit">Finalizar</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useStore } from "vuex";

import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import getPlaces from "../../get/getPlace";
import uploadOne from "@/modules/refund/helpers/imageOne";
import sendRefund from "@/modules/refund/composables/createRefund";
import useAuth from "@/modules/auth/composables/useAuth";
import getClients from "@/modules/get/getClient";
import CreateClient from "../components/CreateClient.vue";
import getTerm from "@/helpers/searchByTerm";

export default {
    components: { Loader, CreateClient },
    setup() {

        const store = useStore();

        const localImageOne = ref();
        const imgOneName = ref();
        const imgOne = ref(null);

        const refundForm = ref({
            code: "",
            quantity: "",
            packageQuantity: "",
            driverName: "",
            driverLastname: "",
            patent: "",
            dispatchPlaces: "",
            possibleUbication: "",
            observations: "",
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

.refund-form {
    background-color: white;
    padding: 1em;
}

.refund-form h1 {
    text-align: center;
    margin: 4px 0;
    padding: 4px 0;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    color: white;
    text-transform: uppercase;
}

.refund-form form {
    display: flex;
    flex-direction: column;
}

.refund-form form .block, .hr-grid {
    grid-column: 1/3;
}

.refund-form form p {
    margin: 0;
    padding: .5rem;
}

.refund-form form p label {
    font-size: .8rem;
    padding: 4px 6px;
    margin: 2px 0;
}


.refund-form form input,
.refund-form form select {
    width: 100%;
    padding: .4rem;
}

.item-form-client select {
    margin: 4px 0;
}

// .image-form {
//   display: block;
// }

// .item-form input {
//   width: 100%;
// }

.buttons-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: .4rem;
}

.loader-wrapper {
  width: 100%;
}

.button-form, .button-form-client {
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    color: white;
    padding: 2px;
    margin: 8px 0;
    width: 200px;
    height: 50px;
    text-align: center;
    cursor: default;
    border: none;
    &:hover {
        background-color: rgba(0, 0, 0, 0.827);
    }
}

textarea {
    height: 75%;

}

.button-form-client {
    width: 100%;
    height: 38px;
    margin: auto;
    align-self: center;
}

input[type="file"] {
  display: none;
}

@media screen and (min-width: 768px) {
    
    .refund-form form {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .refund-form form .block {
        grid-column: 1 / 3;
    }

    .buttons-form {
    flex-direction: row;

}

.button-form-client {
    margin: auto;
}

}

</style>