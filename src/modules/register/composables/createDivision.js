import { ref } from "vue";
import backendConnect from "../../../api/backend";

const createDivision = () => {
  const errors = ref(true);
  const division = ref();
  const nice = ref(false);

  const postDivision = async (divisionForm) => {
    if (divisionForm.name === "" || !divisionForm.name) {
      errors.value = "Debe llenar los campos";
      return errors;
    } else {
      const { name } = divisionForm;

      try {
        const resp = await backendConnect.post(
          "/api/division",
          { name },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        division.value = resp.data.division;
        nice.value = true;
        errors.value = false;

        return { errors, nice, division };
      } catch (error) {
        if (error.response.data.msg) {
          errors.value = error.response.data.msg;
          division.value = null;
          nice.value = false;
          return { errors, nice, division };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errors.value = msgErr;
          division.value = null;
          nice.value = false;
          return { errors, nice, division };
        } else {
          division.value = resp.data.code;
          errors.value = false;
          nice.value = true;
          return { errors, nice, division };
        }
      }
    }
  };

  return {
    postDivision,
    division,
    nice,
    errors,
  };
};

export default createDivision;
