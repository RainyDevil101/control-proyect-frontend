import { computed, ref } from "vue";
import { useStore } from "vuex";
import backendConnect from "@/api/backend";
import Swal from "sweetalert2";

const updateDestination = () => {

    const store = useStore();

    const errorsUpdate = ref(true);
    const niceUpdate = ref(false);

    const destinationUpdate = computed(
        () => store.getters["destinations/getUptadeDestination"]
    );
    const destination = computed(() => store.getters["destinations/getChangeDestination"])
    const destinationId = computed(() => store.getters["destinations/getChangeDestinationId"])

    const onShowUpdateDestination = (id) => {

        if (destinationUpdate.value === false) {
            store.dispatch("destinations/changeDestinationId", id);
            store.dispatch("destinations/changeDestinationUpdate", true);
            return;
        } else {
            store.dispatch("destinations/changeDestinationUpdate", false);
            return;
        }
    }

    const putDestination = async (destination, id) => {

        errorsUpdate.value = true;

        if (!destination || !id) {
            niceUpdate.value = false;
            errorsUpdate.value = "Complete los campos";
            return { niceUpdate, errorsUpdate };
        }

        if (
            destination.nombre.length === 0
        ) {
            niceUpdate.value = false;
            errorsUpdate.value = "Complete los campos";
            return { niceUpdate, errorsUpdate };

        } else {

            try {

                const { data } = await backendConnect.put(
                    `/api/destination/${id}`,
                    { destination },
                    { headers: { "x-token": localStorage.getItem("token") } }
                );

                niceUpdate.value = true;
                errorsUpdate.value = false;

                return { niceUpdate, errorsUpdate };
            } catch (errors) {
                console.log(errors);
                if (errors.response.data.msg) {
                    errorsUpdate.value = errors.response.data.msg;
                    return { niceUpdate, errorsUpdate };
                }
                if (errors.response.data.errors) {
                    const msgErr = [];
                    const errorsDB = errors.response.data.errors;
                    for (const error of errorsDB) {
                        msgErr.push(" " + error.msg);
                    }
                    errorsUpdate.value = msgErr;
                    return { niceUpdate, errorsUpdate };
                } else {
                    return { niceUpdate, errorsUpdate };
                }
            }
        }
    };

    const onSubmitUpdate = async () => {

        new Swal({
            title: "Espere por favor",
            allowOutsideClick: false,
        });
        Swal.showLoading();

        const { errorsUpdate, niceUpdate } = await putDestination(
            destination.value,
            destinationId.value
        );

        if (niceUpdate.value === false) {
            Swal.fire("Error", `${errorsUpdate.value}.`, "error");
            return;
        } else {
            await store.dispatch("destinations/loadDestinations");

            Swal.fire(
                "Guardado",
                "Destino actualizado con éxito",
                "success"
            ).then(function (result) {
                if (true) {
                    location.reload();
                } else {
                    window.alert("Error, intente nuevamente");
                }
            });
        }
    }

    return {
        onShowUpdateDestination,
        destinationUpdate,
        destination,
        destinationId,
        onSubmitUpdate,
        errorsUpdate,
        niceUpdate,

    };
};

export default updateDestination;