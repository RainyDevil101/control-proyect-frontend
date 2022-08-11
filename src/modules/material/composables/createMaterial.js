import { ref } from "vue";
import backendConnect from "../../../api/backend";

const sendMaterial = () => {
  const errors = ref(true);
  const materialId = ref(null);
  const nice = ref(false);

  const sendForum = async (materialForm, imgOne, userDivision, id) => {

    if (!userDivision) {
      errors.value = "Error usuario logeado";
      return { errors, nice, materialId };
    }

    if (
      materialForm.transport_number === "" ||
      materialForm.code === "" ||
      materialForm.cantidad === "" ||
      materialForm.cantidad_bultos === "" ||
      materialForm.destination === "" ||
      materialForm.ubication === ""
    ) {
      errors.value = "Debe llenar los campos";
      return {errors, materialId, nice};
    } else {

      try {

        const resp = await backendConnect.post(
          "/api/material",
          { materialForm, imgOne, userDivision, id },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        console.log(resp);

        materialId.value = resp.data.id;
        nice.value = true;
        errors.value = false;

        return { errors, nice, materialId };
      } catch (error) {

        console.log(error);

        if (error.response.data.msg) {
          errors.value = error.response.data.msg;
          materialId.value = null;
          nice.value = false;
          return { errors, nice, materialId };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errors.value = msgErr;
          materialId.value = null;
          nice.value = false;
          return { errors, nice, materialId };
        } else {
          materialId.value = resp.data.id;
          errors.value = false;
          nice.value = true;
          return { errors, nice, materialId };
        }
      }
    }
  };

  return {
    errors,
    sendForum,
    materialId,
    nice,
  };
};

export default sendMaterial;
