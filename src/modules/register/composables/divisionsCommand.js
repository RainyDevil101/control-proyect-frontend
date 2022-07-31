import { ref } from "vue";
import backendConnect from "../../../api/backend";

const divisionsCommnad = () => {

  // POST RESPONSES

  const errorsPost = ref(true);
  const division = ref();
  const nicePost = ref(false);

  // UPDATE RESPONSES

  const errorsUpdate = ref(true);
  const niceUpdate = ref(false);
  
  // DELETE RESPONSES
  
  const idDelete = ref();
  const errorsDelete = ref(true);
  const niceDelete = ref(false);

  const postDivision = async (divisionForm) => {
    if (divisionForm.name === "" || !divisionForm.name) {
      errorsPost.value = "Debe llenar los campos";
      division.value = '';
      return { errorsPost, location,
        nicePost };
    } else {
      const { name } = divisionForm;

      try {
        const resp = await backendConnect.post(
          "/api/division",
          { name },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        division.value = resp.data.division;
        nicePost.value = true;
        errorsPost.value = false;

        return { errorsPost, nicePost, division };
      } catch (error) {
        if (error.response.data.msg) {
          errorsPost.value = error.response.data.msg;
          division.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, division };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsPost.value = msgErr;
          division.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, division };
        } else {
          division.value = resp.data.code;
          errorsPost.value = false;
          nicePost.value = true;
          return { errorsPost, nicePost, division };
        }
      }
    }
  };

  const updateDivision = async (updateForum, id) => {

    if (!updateForum || updateForum.nombre === "") {
      niceUpdate.value = false;
      errorsUpdate.value = "No se pudo actualizar";
      return { niceUpdate, errorsUpdate };
    } else {
      try {
        const resp = await backendConnect.put(
          `/api/division/${id}`,
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

  const deleteDivision = async (id = "") => {

    if (id === "" || !id) {
      errorsDelete.value = "No existe";
      return { errorsDelete, niceDelete };
    } else {
      try {
        const resp = await backendConnect.delete(
            `/api/division/${id}`,
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

    postDivision,
    errorsPost,
    division,
    nicePost,

    // UPDATE

    updateDivision,
    errorsUpdate,
    niceUpdate,
    
    // DELETE
    
    deleteDivision,
    errorsDelete,
    idDelete,
    niceDelete,

  };
};

export default divisionsCommnad;
