import { computed, ref } from "vue";
import { useStore } from "vuex";
import backendConnect from "@/api/backend";
import Swal from "sweetalert2";

const deleteDestination = () => {

  const store = useStore();

  const idDelete = ref();
  const errorsDelete = ref(true);
  const niceDelete = ref(false);

  const destinationId = computed(() => store.getters["destinations/getChangeDestinationId"])

  const delDestination = async (id = "") => {

    if (id === "" || !id || id.length === 0) {
      errorsDelete.value = "No existe";
      return { errorsDelete, niceDelete };
    } else {
      try {
        const resp = await backendConnect.delete(`/api/destination/${id}`, {
          headers: { "x-token": localStorage.getItem("token") },
        });

        idDelete.value = resp.data;
        niceDelete.value = true;
        errorsDelete.value = false;

        return { errorsDelete, niceDelete, idDelete };
      } catch (errors) {
        if (errors.response.data.msg) {
          errorsDelete.value = errors.response.data.msg;
          return { niceDelete, errorsDelete };
        }
        if (errors.response.data.errors) {
          const msgErr = [];
          const errorsDB = errors.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsDelete.value = msgErr;
          return { niceDelete, errorsDelete };
        } else {
          return { niceDelete, errorsDelete };
        }
      }
    }
  };

  const onDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No se podrá recuperar una vez borrado",
      showDenyButton: true,
      confirmButtonText: "Estoy seguro",
    });

    if (isConfirmed) {
      new Swal({
        title: "Espere por favor",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const { niceDelete } = await delDestination(
        destinationId.value
      );

      if (niceDelete.value === true) {
        await store.dispatch("destinations/loadDestinations");

        Swal.fire("Eliminado", "", "success").then(function (result) {
          if (true) {
            location.reload();
          } else {
            window.alert("Error", "intente nuevamente");
          }
        });
      }
    }
  }


  return {
    onDelete,
    idDelete,
    errorsDelete,
    niceDelete,
    delDestination,
    destinationId
  };
};

export default deleteDestination