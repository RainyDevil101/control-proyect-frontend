import { ref } from "vue";
import backendConnect from "../../../api/backend";

const usersCommand = () => {
  // POST RESPONSES

  const errorsPost = ref(true);
  const user = ref();
  const nicePost = ref(false);

  // UPDATE RESPONSES

  const errorsUpdate = ref(true);
  const niceUpdate = ref(false);
  const passwordT = ref("");

  // DELETE RESPONSES

  const idDelete = ref();
  const errorsDelete = ref(true);
  const niceDelete = ref(false);

  const postUser = async (userForm) => {

    errorsPost.value = true;

    if (userForm.name === "" || !userForm.name) {
      errorsPost.value = "Debe llenar los campos";
      user.value = "";
      return { errorsPost, location, nicePost };
    } else {
      const { name } = userForm;

      try {
        const resp = await backendConnect.post(
          "/api/user",
          { name },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        user.value = resp.data.user;
        nicePost.value = true;
        errorsPost.value = false;

        return { errorsPost, nicePost, user };
      } catch (error) {
        if (error.response.data.msg) {
          errorsPost.value = error.response.data.msg;
          user.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, user };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errorsPost.value = msgErr;
          user.value = null;
          nicePost.value = false;
          return { errorsPost, nicePost, user };
        } else {
          user.value = resp.data.code;
          errorsPost.value = false;
          nicePost.value = true;
          return { errorsPost, nicePost, user };
        }
      }
    }
  };

  const updateUser = async (userUpdate, user, id) => {

    errorsUpdate.value = true;

    if (!user || !userUpdate || !id) {
      niceUpdate.value = false;
      errorsUpdate.value = "Complete los campos";
      return { niceUpdate, errorsUpdate };
    }

    if (
      user.fullname.length === 0 ||
      user.fulllastname.length === 0 ||
      user.rut.length === 0 ||
      user.email.length === 0 ||
      user.position.length === 0 ||
      user.role.length === 0
    ) {
      niceUpdate.value = false;
      errorsUpdate.value = "Complete los campos";
      return { niceUpdate, errorsUpdate };
    }

    if (userUpdate.passwordT !== userUpdate.confirmPasswordT) {

      niceUpdate.value = false;
      errorsUpdate.value = "Las contraseñas no coinciden";

      return { niceUpdate, errorsUpdate };
    } else {

      if (userUpdate.passwordT.length > 0) {
        user.password = userUpdate.passwordT;
      } 

      try {
        
        const { data } = await backendConnect.put(
          `/api/user/${id}`,
          { user },
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

  const deleteUser = async (id = "") => {
    if (id === "" || !id) {
      errorsDelete.value = "No existe";
      return { errorsDelete, niceDelete };
    } else {
      try {
        const resp = await backendConnect.delete(`/api/user/${id}`, {
          headers: { "x-token": localStorage.getItem("token") },
        });

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

    postUser,
    errorsPost,
    user,
    nicePost,

    // UPDATE

    updateUser,
    errorsUpdate,
    niceUpdate,
    passwordT,

    // DELETE

    deleteUser,
    errorsDelete,
    idDelete,
    niceDelete,
  };
};

export default usersCommand;
