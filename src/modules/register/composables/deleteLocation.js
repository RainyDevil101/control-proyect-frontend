import { ref } from "vue";
import backendConnect from "../../../api/backend";

const deleteLocation = () => {
  const errors = ref(true);
  const idDelete = ref();
  const nice = ref(false);

  const delLocation = async (id = "") => {

    if (id === "" || !id) {
      errors.value = "No existe";
      return errors;
    } else {
      try {
        const resp = await backendConnect.delete(
            `/api/location/${id}`,
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        idDelete.value = resp.data;
        nice.value = true;
        errors.value = false;

        return { errors, nice, idDelete };
      } catch (error) {
      }
    }
  };

  return {
    delLocation,
    idDelete,
    nice,
    errors,
  };
};

export default deleteLocation;
