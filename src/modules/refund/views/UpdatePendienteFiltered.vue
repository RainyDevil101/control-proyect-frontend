<template>
    <ImgOne v-if="imageOneCompleted" :imageOne="imageOne" @on:close="onShowImageOne" />

    <Loader v-if="showUpdate" />

    <div v-else class="modal-container">
        <h1>Modificar</h1>
        <form @submit.prevent="onSubmitUpdate">
            <p class="item-form">
                <label for="code">Código</label>
                <input id="code" v-model="refund.code" type="text" maxlength="45" />
            </p>
            <p class="item-form">
                <label for="quantity">Cantidad</label>
                <input id="quantity" v-model="refund.quantity" type="number" maxlength="2" />
            </p>
            <p class="item-form">
                <label for="package">Cantidad de bultos</label>
                <input id="package" v-model="refund.packageQuantity" type="number" maxlength="2" />
            </p>
            <p class="item-form">
                <label for="driverName">Nombre del Chofer</label>
                <input id="driverName" v-model="refund.driverName" type="text" maxlength="45">
            </p>
            <p class="item-form">
                <label for="driverLastname">Apellido del Chofer</label>
                <input id="driverLastname" v-model="refund.driverLastname" type="text" maxlength="45">
            </p>
            <p class="item-form">
                <label for="patent">Patente</label>
                <input id="patent" v-model="refund.patent" type="text" maxlength="6">
            </p>
            <p class="item-form">
                <label for="ubication">Ubicación teórica</label>
                <input id="ubication" v-model="refund.possibleUbication" type="text" maxlength="30">
            </p>
            <p class="item-form">
                <label>Destino</label>
                <select v-model="refund.dispatchPlaces_id">
                    <option v-for="place of places" :key="place.id" :value="place.id">
                        {{ place.place }}
                    </option>
                </select>
            </p>
            <p class="item-form-client block">
                <label>Cliente</label>
                <select v-model="refund.client">
                    <option selected disabled value="">--Seleccione un cliente--</option>
                    <option v-for="client of clients" :key="client.id" :value="client.id">
                        {{ client.name }}
                    </option>
                </select>
            </p>
            <p class="item-form block">
                <label for="observations">Observaciones</label>
                <textarea id="observations" v-model="refund.observations" maxlength="70"></textarea>
            </p>
            <div class="buttons-form block">
                <button @click="$router.push({ name: 'get-dispatch-refund-admin' })" class="button-form"
                    type="button">Volver</button>

                <input class="button-form" type="file" @change="onImageOne" id="imageOne"
                    accept="image/png, image/jpg, image/jpeg" />


                <button class="button-form" type="button" @click="onShowImageOne">
                    Ver imagen ingreso
                </button>

                <button type="button" class="button-form" v-if="localImageOne"><label for="imageOne">{{ imgOneName
                }}</label></button>

                <button type="button" v-if="!localImageOne" class="button-form"><label for="imageOne"
                        class="label-image">Actualizar
                        imagen</label></button>
                <button class="button-form" type="submit">Modificar</button>

            </div>
        </form>
    </div>
</template>
    
<script>
import { useRoute } from 'vue-router';
import { ref, watch } from "vue";
import { useStore } from 'vuex';
import getClients from "@/modules/get/getClient";
import getPlaces from "../../get/getPlace";
import updateRefundData from "../composables/updateRefundData";
import Loader from '@/modules/components/Loader.vue';
import ImgOne from '@/modules/operatorRefund/components/ImgOne.vue';
export default {
    // emits: ["on:closeUpdate"],
    components: { Loader, ImgOne },
    setup() {

        const route = useRoute();
        const store = useStore();

        const { refundToUptade: refund, onSubmitUpdate, onUpdatingRefund, showUpdate, imageOne, imageOneCompleted, localImageOne, imgOneName, imgOne, fileImage } = updateRefundData();
        const { places, searchPlaces, placeStatus } = getPlaces();
        const { clients, searchClients, clientStatus } = getClients();

        onUpdatingRefund(route.params.id);

        watch(
            () => localImageOne.value,
            () => (imgOne.value = localImageOne.value)
        );

        return {
            clients,
            clientStatus,
            onSubmitUpdate,
            places,
            placeStatus,
            refund,
            refund,
            searchClients,
            searchPlaces,
            onUpdatingRefund,
            showUpdate,
            localImageOne,
            imgOneName,
            imgOne,
            imageOne,
            imageOneCompleted,
            fileImage,
            onShowImageOne: () => {
                if (imageOneCompleted.value === false) {
                    return store.dispatch("refunds/changeImageOne", true);
                } else {
                    return store.dispatch("refunds/changeImageOne", false);
                }
            },
            onImageOne: async (event) => {
                const file = event.target.files[0];
                if (!file) {
                    localImageOne.value = null;
                    imgOneName.value = null;
                    file.value = null;
                    return;
                } else {
                    imgOneName.value = file.name;
                    const fr = new FileReader();
                    fr.onload = () => (localImageOne.value = fr.result);
                    fr.readAsDataURL(file);
                    fileImage.value = file;
                    return
                }
            },
        };
    },
};
</script>
    
<style lang="scss" scoped>

    
    .modal-container {
      padding: 1rem;
      color: black;
      background-color: white;
      width: auto;
      height: auto;
      max-width: 95vw;
      max-height: 80vh;
      overflow: auto;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    }

    .modal-container form {
      display: flex;
      flex-direction: column;
    }

    .modal-container form .block {
      grid-column: 1/3;
    }

    .modal-container form p {
      margin: 0;
      padding: .5rem;
    }

    .modal-container form p label {
      font-size: .8rem;
      padding: 4px 6px;
      margin: 2px 0;
    }

    .modal-container form input,
    .modal-container form select {
      width: 100%;
      padding: .4rem;
    }
    
    .fade-in {
      animation: fadeIn ease-out 0.2s;
      -webkit-animation: fadeIn ease-out 0.2s;
      -moz-animation: fadeIn ease-out 0.2s;
      -o-animation: fadeIn ease-out 0.2s;
      -ms-animation: fadeIn ease-out 0.2s;
    }

.buttons-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: .4rem;
}

.button-form {
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    color: white;
    padding: 2px;
    margin: 8px auto;
    width: 200px;
    height: 50px;
    text-align: center;
    cursor: default;
    border: none;
    &:hover {
        background-color: rgba(0, 0, 0, 0.827);
    }
}

    .modal-container h1 {
      text-align: center;
      margin: 4px 0;
      padding: 4px 0;
      background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
      color: white;
      text-transform: uppercase;
    }

    label {
      font-weight: bolder;
    }

    .label-image {
        font-weight: normal;
    }

    input[type="file"] {
        display: none;
    }
    
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @-moz-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @-webkit-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @-o-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @-ms-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }


@media screen and (min-width: 992px) {
    
    .modal-container form {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .modal-container form .block {
        grid-column: 1 / 3;
    }

    .buttons-form {
        flex-direction: row;

    }

    .modal-container {
        flex-direction: row;

    }
}
</style>