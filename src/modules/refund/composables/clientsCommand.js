import { ref } from "vue";
import backendConnect from "../../../api/backend";

const clientsCommand = () => {

  // POST RESPONSES

  const errorsPost = ref(true);
  const client = ref(null);
  const nicePost = ref(false);

  // UPDATE RESPONSES

  // const errorsUpdate = ref(true);
  // const niceUpdate = ref(false);
  
  // DELETE RESPONSES
  
  // const idDelete = ref();
  // const errorsDelete = ref(true);
  // const niceDelete = ref(false);

  const postClient = async (clientName) => {

    if (clientName.length === 0 || !clientName) {

      errorsPost.value = "Debe llenar los campos";

      client.value = '';

      return { errorsPost, client,
        nicePost };

    } else {

      const name = clientName;

      try {
        const resp = await backendConnect.post(
          "/api/client",
          { name },
          { headers: { "x-token": localStorage.getItem("token") } }
        );


        client.value = resp.data.msg;
        nicePost.value = true;
        errorsPost.value = false;

        return { errorsPost, nicePost, client };
      } catch (error) {
        if (error.response.data.msg) {
          errorsPost.value = error.response.data.msg;
          client.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, client };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsPost.value = msgErr;
          client.value = null;
          nicePost.value = false;
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

  // const updateDestination = async (updateForum, id) => {

  //   if (!updateForum || updateForum.nombre === "") {
  //     niceUpdate.value = false;
  //     errorsUpdate.value = "No se pudo actualizar";
  //     return { niceUpdate, errorsUpdate };
  //   } else {
  //     try {
  //       const resp = await backendConnect.put(
  //         `/api/client/${id}`,
  //         { updateForum },
  //         { headers: { "x-token": localStorage.getItem("token") } }
  //       );

  //       niceUpdate.value = true;

  //       errorsUpdate.value = false;

  //       return { niceUpdate, errorsUpdate };
  //     } catch (errors) {

  //       if (errors.response.data.msg) {
  //         errorsUpdate.value = errors.response.data.msg;
  //         return { niceUpdate, errorsUpdate };
  //       }
  //       if (errors.response.data.errors) {
  //         const msgErr = [];
  //         const errorsDB = errors.response.data.errors;
  //         for (const error of errorsDB) {
  //           msgErr.push(" " + error.msg);
  //         }
  //         errorsUpdate.value = msgErr;
  //         return { niceUpdate, errorsUpdate };
  //       } else {
  //         return { niceUpdate, errorsUpdate };
  //       }
  //     }
  //   }
  // };

  // const deleteDestination = async (id = "") => {

  //   if (id === "" || !id) {
  //     errorsDelete.value = "No existe";
  //     return { errorsDelete, niceDelete };
  //   } else {
  //     try {
  //       const resp = await backendConnect.delete(
  //           `/api/client/${id}`,
  //         { headers: { "x-token": localStorage.getItem("token")}}
  //       );

  //       idDelete.value = resp.data;
  //       niceDelete.value = true;
  //       errorsDelete.value = false;

  //       return { errorsDelete, niceDelete, idDelete };
  //     } catch (errors) {

  //       if (errors.response.data.msg) {
  //         errorsDelete.value = errors.response.data.msg;
  //         return { niceDelete, errorsDelete };
  //       }
  //       if (errors.response.data.errors) {
  //         const msgErr = [];
  //         const errorsDB = errors.response.data.errors;
  //         for (const error of errorsDB) {
  //           msgErr.push(" " + error.msg);
  //         }
  //         errorsDelete.value = msgErr;
  //         return { niceDelete, errorsDelete };
  //       } else {
  //         return { niceDelete, errorsDelete };
  //       }
  //     }
  //   }
  // };

  return {

    // POST

    postClient,
    errorsPost,
    client,
    nicePost,

    // UPDATE

    // updateDestination,
    // errorsUpdate,
    // niceUpdate,
    
    // DELETE
    
    // deleteDestination,
    // errorsDelete,
    // idDelete,
    // niceDelete,

  };
};

export default clientsCommand;
