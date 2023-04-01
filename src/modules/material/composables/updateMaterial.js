import backendConnect from "@/api/backend";
import { ref } from "vue";

const updateMaterial = () => {
  const errors = ref(null);
  const nice = ref(false);
  const code = ref(null);

  const dispatchMaterial = async (check, pictureTwo, id) => {
    const materialUpdate = check;

    if (check.transport_number_two === "" || pictureTwo === "") {
      errors.value = "Debe llenar los campos";
      return { errors, nice, code };
    } else {
      
      try {
        const resp = await backendConnect.put(
          `/api/material/${id}`,
          { materialUpdate, pictureTwo },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        code.value = id;
        nice.value = true;
        errors.value = false;

        return { errors, nice, code };
      } catch (error) {
        if (error.response.data.msg) {
          errors.value = error.response.data.msg;
          code.value = null;
          nice.value = false;
          return { errors, nice, code };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errors.value = msgErr;
          code.value = null;
          nice.value = false;
          return { errors, nice, code };
        } else {
          code.value = id;
          errors.value = false;
          nice.value = true;
          return { errors, nice, code };
        }
      }
    }
  };

  return {
    dispatchMaterial,
    errors,
    nice,
    code,
  };
};

export default updateMaterial;
