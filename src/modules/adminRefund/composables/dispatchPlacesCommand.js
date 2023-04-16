import { ref } from "vue";
import backendConnect from "../../../api/backend";

const dispatchPlacesCommand = () => {

  // POST RESPONSES

  const errorsPost = ref(false);
  const dispatchPlace = ref(null);
  const nicePost = ref(false);

  // UPDATE RESPONSES

  const errorsUpdate = ref(false);
  const niceUpdate = ref(false);
  
  // DELETE RESPONSES
  
  const idDelete = ref("");
  const errorsDelete = ref(false);
  const niceDelete = ref(false);

  const postDispatchPlace = async (place) => {

    if (place.length === 0 || !place) {

      errorsPost.value = "Debe llenar los campos";

      return { errorsPost, dispatchPlace,
        nicePost };

    } else {

      try {
        const resp = await backendConnect.post(
          "/api/place",
          { place },
          { headers: { "x-token": localStorage.getItem("token") } }
        );


        dispatchPlace.value = resp.data.msg;
        nicePost.value = true;

        return { errorsPost, nicePost, dispatchPlace };
      } catch (error) {
        if (error.response.data.msg) {
          errorsPost.value = error.response.data.msg;
          return { errorsPost, nicePost, dispatchPlace };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsPost.value = msgErr;
          return { errorsPost, nicePost, dispatchPlace };
        } else {
          dispatchPlace.value = resp.data.id;
          errorsPost.value = false;
          nicePost.value = true;
          return { errorsPost, nicePost, dispatchPlace };
        }
      }
    }
  };

  const updateDispatchPlace = async (place, id) => {

    if (!place || place === "" || place.length === 0) {
      errorsUpdate.value = "No se pudo actualizar";
      return { niceUpdate, errorsUpdate };
    } else {
      try {
        const resp = await backendConnect.put(
          `/api/place/${id}`,
          { place },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        console.log(resp);

        niceUpdate.value = true;

        return { niceUpdate };
      } catch (errors) {
        console.log(errors);
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

  const deleteDispatchPlace = async (id = "") => {

    if (id === "" || !id || id.length === 0) {
      errorsDelete.value = "No existe";
      return { errorsDelete, niceDelete };
    } else {
      try {
        await backendConnect.delete(
            `/api/place/${id}`,
          { headers: { "x-token": localStorage.getItem("token")}}
        );

        niceDelete.value = true;

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

    postDispatchPlace,
    errorsPost,
    dispatchPlace,
    nicePost,

    // UPDATE

    updateDispatchPlace,
    errorsUpdate,
    niceUpdate,
    
    // DELETE
    
    deleteDispatchPlace,
    errorsDelete,
    idDelete,
    niceDelete,

  };
};

export default dispatchPlacesCommand;
