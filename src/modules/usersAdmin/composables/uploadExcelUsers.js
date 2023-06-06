import { ref } from "vue";
import backendConnect from "../../../api/backend";

const uploadUsers = () => {
  const errors = ref(true);
  const nice = ref(null);
  const message = ref(null);

  const sendData = async (excelFile) => {
    if (!excelFile) {
        errors.value = 'Debe seleccionar un archivo';
        nice.value = false;
        return { errors, nice };
    };

    try {
      const formData = new FormData();
      formData.append("file", excelFile);

      const { data } = await backendConnect.post(
        "/api/userExcel/uploadFile",
        formData,
        {
          headers: { "x-token": localStorage.getItem("token") },
        }
      );

      nice.value = true;
      errors.value = false;
      message.value = data.msg;

      return { errors, nice, message };
    } catch (error) {
      if (error.response.data.msg) {
        errors.value = error.response.data.msg
        nice.value = false;
        return { errors, nice, message };
      } else if (error.response.data.errors) {
        const msgErr = [];
        const errorsDb = error.response.data.errors;
        for (const error of errorsDb) {
          msgErr.push(" " + error.msg);
        }
        errors.value = msgErr;
        nice.value = false;
        return { errors, nice, message };
      } else {
        errors.value = true;
        nice.value = false;
        return { errors, nice, message };
      }
    }
  };

  return {
    errors,
    sendData,
    nice,
    message,
  };
};

export default uploadUsers;
