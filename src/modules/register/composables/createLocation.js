import { ref } from "vue";
import backendConnect from "../../../api/backend";

const createLocation = () => {
  const errors = ref(true);
  const location = ref();
  const nice = ref(false);

  const postLocation = async (locationForm) => {
    if (locationForm.name === "" || !locationForm.name) {
      errors.value = "Debe llenar los campos";
      return errors;
    } else {
      const { name } = locationForm;

      try {
        const resp = await backendConnect.post(
          "/api/location",
          { name },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        location.value = resp.data.location;
        nice.value = true;
        errors.value = false;

        return { errors, nice, location };
      } catch (error) {
        if (error.response.data.msg) {
          errors.value = error.response.data.msg;
          location.value = null;
          nice.value = false;
          return { errors, nice, location };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errors.value = msgErr;
          location.value = null;
          nice.value = false;
          return { errors, nice, location };
        } else {
          location.value = resp.data.code;
          errors.value = false;
          nice.value = true;
          return { errors, nice, location };
        }
      }
    }
  };

  return {
    postLocation,
    location,
    nice,
    errors,
  };
};

export default createLocation;
