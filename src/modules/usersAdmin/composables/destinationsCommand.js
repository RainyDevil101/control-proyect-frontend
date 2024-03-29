import { ref } from "vue";
import backendConnect from "../../../api/backend";

const destinationsCommand = () => {

  // POST RESPONSES

  const errorsPost = ref(true);
  const destination = ref();
  const nicePost = ref(false);

  // UPDATE RESPONSES

  const errorsUpdate = ref(true);
  const niceUpdate = ref(false);

  // DELETE RESPONSES

  const idDelete = ref();
  const errorsDelete = ref(true);
  const niceDelete = ref(false);

  const postDestination = async (name, id) => {

    if (name === "" || name.length === 0 || !name || id === "" || id.length === 0 || !id) {
      errorsPost.value = "Debe llenar los campos";
      destination.value = '';
      return {
        errorsPost, destination,
        nicePost
      };
    } else {

      try {
        const resp = await backendConnect.post(
          "/api/destination",
          { name, id },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        destination.value = resp.data.destination;
        nicePost.value = true;
        errorsPost.value = false;

        return { errorsPost, nicePost, destination };
      } catch (error) {
        if (error.response.data.msg) {
          errorsPost.value = error.response.data.msg;
          destination.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, destination };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsPost.value = msgErr;
          destination.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, destination };
        } else {
          destination.value = resp.data.code;
          errorsPost.value = false;
          nicePost.value = true;
          return { errorsPost, nicePost, destination };
        }
      }
    }
  };

  const updateDestination = async (nombre, id) => {

    if (!nombre || nombre === "" || nombre.length === 0) {
      niceUpdate.value = false;
      errorsUpdate.value = "No se pudo actualizar";
      return { niceUpdate, errorsUpdate };
    } else {
      try {
        const resp = await backendConnect.put(
          `/api/destination/${id}`,
          { nombre },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        niceUpdate.value = true;

        errorsUpdate.value = false;

        return { niceUpdate, errorsUpdate };
      } catch (errors) {

        if (errors.response.data.msg) {
          errorsUpdate.value = errors.response.data.msg;
          return { niceUpdate, errorsUpdate };
        }
        if (errors.response.data.errors) {
          const msgErr = [];
          const errorsDB = errors.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsUpdate.value = msgErr;
          return { niceUpdate, errorsUpdate };
        } else {
          return { niceUpdate, errorsUpdate };
        }
      }
    }
  };

  const deleteDestination = async (id = "") => {

    if (id === "" || !id) {
      errorsDelete.value = "No existe";
      return { errorsDelete, niceDelete };
    } else {
      try {
        const resp = await backendConnect.delete(
          `/api/destination/${id}`,
          { headers: { "x-token": localStorage.getItem("token") } }
        );

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

  return {

    // POST

    postDestination,
    errorsPost,
    destination,
    nicePost,

    // UPDATE

    updateDestination,
    errorsUpdate,
    niceUpdate,

    // DELETE

    deleteDestination,
    errorsDelete,
    idDelete,
    niceDelete,

  };
};

export default destinationsCommand;
