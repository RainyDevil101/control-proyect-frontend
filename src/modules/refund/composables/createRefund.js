import { ref } from 'vue';
import backendConnect from '../../../api/backend';

const sendRefund = () => {
  const errors = ref(true);
  const refundId = ref(null);
  const nice = ref(false);

  const sendForum = async (refundForm, imgOne, userDivision, id) => {

    if (!userDivision) {
      errors.value = "Error usuario logeado";
      return { errors, nice, refundId };
    }

    if (
      refundForm.code === "" ||
      refundForm.quantity === "" ||
      refundForm.packageQuantity === "" ||
      refundForm.driverName === "" ||
      refundForm.driverLastname === "" ||
      refundForm.patent === "" ||
      refundForm.dispatchPlaces === "" ||
      refundForm.possibleUbication === "" ||
      refundForm.client === "" ||
      refundForm.observations === ""
    ) {
      errors.value = "Debe llenar los campos";
      return {errors, refundId, nice};
    } else {

      try {

        const resp = await backendConnect.post(
          "/api/refund",
          { refundForm, imgOne, userDivision, id },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        console.log(resp.data);

        refundId.value = resp.data.id;
        nice.value = true;
        errors.value = false;

        return { errors, nice, refundId };
      } catch (error) {

        if (error.response.data.msg) {
          errors.value = error.response.data.msg;
          refundId.value = null;
          nice.value = false;
          return { errors, nice, refundId };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errors.value = msgErr;
          refundId.value = null;
          nice.value = false;
          return { errors, nice, refundId };
        } else {
            refundId.value = resp.data.id;
          errors.value = false;
          nice.value = true;
          return { errors, nice, refundId };
        }
      }
    }
  };

  return {
    errors,
    sendForum,
    refundId,
    nice,
  };
};

export default sendRefund;
