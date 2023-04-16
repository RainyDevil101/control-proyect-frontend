import { ref } from "vue";
import backendConnect from "../../../api/backend";

const clientsCommand = () => {

  // POST RESPONSES

  const errorsPost = ref(false);
  const client = ref(null);
  const nicePost = ref(false);

  // UPDATE RESPONSES

  const errorsUpdate = ref(false);
  const niceUpdate = ref(false);
  
  // DELETE RESPONSES
  
  const idDelete = ref("");
  const errorsDelete = ref(false);
  const niceDelete = ref(false);

  const postClient = async (name) => {

    if (name.length === 0 || !name) {

      errorsPost.value = "Debe llenar los campos";

      return { errorsPost, client,
        nicePost };

    } else {

      try {
        const resp = await backendConnect.post(
          "/api/client",
          { name },
          { headers: { "x-token": localStorage.getItem("token") } }
        );


        client.value = resp.data.msg;
        nicePost.value = true;

        return { errorsPost, nicePost, client };
      } catch (error) {
        if (error.response.data.msg) {
          errorsPost.value = error.response.data.msg;
          return { errorsPost, nicePost, client };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsPost.value = msgErr;
          return { errorsPost, nicePost, client };
        } else {
          client.value = resp.data.id;
          errorsPost.value = false;
          nicePost.value = true;
          return { errorsPost, nicePost, client };
        }
      }
    }
  };

  const updateClient = async (name, id) => {

    if (!name || name === "" || name.length === 0) {
      errorsUpdate.value = "No se pudo actualizar";
      return { niceUpdate, errorsUpdate };
    } else {
      try {
        const resp = await backendConnect.put(
          `/api/client/${id}`,
          { name },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        niceUpdate.value = true;

        return { niceUpdate };
      } catch (error) {
        console.log(error);
        if (error.response.data.msg) {
          errorsUpdate.value = error.response.data.msg;
          return { niceUpdate, errorsUpdate };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
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

  const deleteClient = async (id = "") => {

    if (id === "" || !id || id.length === 0) {
      errorsDelete.value = "No existe";
      return { errorsDelete, niceDelete };
    } else {
      try {
        await backendConnect.delete(
            `/api/client/${id}`,
          { headers: { "x-token": localStorage.getItem("token")}}
        );

        niceDelete.value = true;

        return { niceDelete };
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

    postClient,
    errorsPost,
    client,
    nicePost,

    // UPDATE

    updateClient,
    errorsUpdate,
    niceUpdate,
    
    // DELETE
    
    deleteClient,
    errorsDelete,
    idDelete,
    niceDelete,

  };
};

export default clientsCommand;
