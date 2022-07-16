import { ref } from "vue";
import backendConnect from "../../../api/backend";

const deleteDivision = () => {
  const errors = ref(true);
  const idDelete = ref();
  const nice = ref(false);

  const delDivision = async (id = "") => {

    if (id === "" || !id) {
      errors.value = "No existe";
      return errors;
    } else {
      try {
        const resp = await backendConnect.delete(
            `/api/division/${id}`,
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        idDelete.value = resp.data;
        nice.value = true;
        errors.value = false;

        console.log(idDelete.value, nice.value, errors.value);

        return { errors, nice, idDelete };
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    delDivision,
    idDelete,
    nice,
    errors,
  };
};

export default deleteDivision;
