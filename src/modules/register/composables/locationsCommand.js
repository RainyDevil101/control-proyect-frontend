import { ref } from "vue";
import backendConnect from "../../../api/backend";

const locationsCommand = () => {

  // POST RESPONSES

  const errorsPost = ref(true);
  const location = ref();
  const nicePost = ref(false);

  // UPDATE RESPONSES

  const errorsUpdate = ref(true);
  const niceUpdate = ref(false);
  
  // DELETE RESPONSES
  
  const idDelete = ref();
  const errorsDelete = ref(true);
  const niceDelete = ref(false);

  const postLocation = async (locationForm) => {

    errorsPost.value = true;

    if (locationForm.name.length === 0 || locationForm.sector.length === 0 || locationForm.location_division.length === 0) {
      errorsPost.value = "Debe llenar los campos";
      location.value = '';
      return { errorsPost, location,
        nicePost };
    } else {

      try {
        const resp = await backendConnect.post(
          "/api/location",
          { locationForm },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        location.value = resp.data.location;
        nicePost.value = true;
        errorsPost.value = false;

        return { errorsPost, nicePost, location };
      } catch (error) {
        if (error.response.data.msg) {
          errorsPost.value = error.response.data.msg;
          location.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, location };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsPost.value = msgErr;
          location.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, location };
        } else {
          location.value = resp.data.code;
          errorsPost.value = false;
          nicePost.value = true;
          return { errorsPost, nicePost, location };
        }
      }
    }
  };

  const updateLocation = async (updateForum, id) => {

    errorsUpdate.value = true;

    if (!updateForum || updateForum.name === "") {
      niceUpdate.value = false;
      errorsUpdate.value = "No se pudo actualizar";
      return { niceUpdate, errorsUpdate };
    } else {
      try {
        const resp = await backendConnect.put(
          `/api/location/${id}`,
          { updateForum },
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

  const deleteLocation = async (id = "") => {

    if (id === "" || !id) {
      errorsDelete.value = "No existe";
      return { errorsDelete, niceDelete };
    } else {
      try {
        const resp = await backendConnect.delete(
            `/api/location/${id}`,
          { headers: { "x-token": localStorage.getItem("token")}}
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

    postLocation,
    errorsPost,
    location,
    nicePost,

    // UPDATE

    updateLocation,
    errorsUpdate,
    niceUpdate,
    
    // DELETE
    
    deleteLocation,
    errorsDelete,
    idDelete,
    niceDelete,

  };
};

export default locationsCommand;
