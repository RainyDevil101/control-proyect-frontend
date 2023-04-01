import backendConnect from "@/api/backend";
import { ref } from "vue";

const updateRefund = () => {
  const errors = ref(null);
  const nice = ref(false);
  const code = ref(null);

  const dispatchRefund = async (checkUbication, pictureTwo, id) => {

    if (pictureTwo === "") {
      errors.value = "Debe llenar los campos";
      return { errors, nice, code };

    } else {

      const possibleUbication = checkUbication;

      try {
        const resp = await backendConnect.put(
          `/api/refund/${id}`,
          { possibleUbication, pictureTwo },
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

  const finishRefund = async (dataFormDelivery, dataFormReserve, id) => {


    if (dataFormDelivery.length === 0 || dataFormReserve.length === 0 || !id || id.length === 0) {
      errors.value = "Debe llenar los campos";
      return { errors, nice, code };

    } else {

      try {
        const resp = await backendConnect.put(
          `/api/refund/finish/${id}`,
          { dataFormDelivery, dataFormReserve },
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
    dispatchRefund,
    finishRefund,
    errors,
    nice,
    code,
  };
};

export default updateRefund;
