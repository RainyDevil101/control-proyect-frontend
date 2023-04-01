import { ref } from "vue";
import backendConnect from "../../../api/backend";

const dispatchPlacesCommand = () => {

  // POST RESPONSES

  const errorsPost = ref(true);
  const dispatchPlace = ref(null);
  const nicePost = ref(false);

  // UPDATE RESPONSES

  // const errorsUpdate = ref(true);
  // const niceUpdate = ref(false);
  
  // DELETE RESPONSES
  
  // const idDelete = ref();
  // const errorsDelete = ref(true);
  // const niceDelete = ref(false);

  const postDispatchPlace = async (dispatchPlaceName) => {

    if (dispatchPlaceName.length === 0 || !dispatchPlaceName) {

      errorsPost.value = "Debe llenar los campos";

      dispatchPlace.value = '';

      return { errorsPost, dispatchPlace,
        nicePost };

    } else {

      const place = dispatchPlaceName;

      try {
        const resp = await backendConnect.post(
          "/api/place",
          { place },
          { headers: { "x-token": localStorage.getItem("token") } }
        );


        dispatchPlace.value = resp.data.msg;
        nicePost.value = true;
        errorsPost.value = false;

        return { errorsPost, nicePost, dispatchPlace };
      } catch (error) {
        if (error.response.data.msg) {
          errorsPost.value = error.response.data.msg;
          dispatchPlace.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, dispatchPlace };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsPost.value = msgErr;
          dispatchPlace.value = null;
          nicePost.value = false;
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

  // const updateDestination = async (updateForum, id) => {

  //   if (!updateForum || updateForum.nombre === "") {
  //     niceUpdate.value = false;
  //     errorsUpdate.value = "No se pudo actualizar";
  //     return { niceUpdate, errorsUpdate };
  //   } else {
  //     try {
  //       const resp = await backendConnect.put(
  //         `/api/dispatchPlace/${id}`,
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
  //           `/api/dispatchPlace/${id}`,
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

    postDispatchPlace,
    errorsPost,
    dispatchPlace,
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

export default dispatchPlacesCommand;
