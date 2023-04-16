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

    if (userForm.fullname === "" || userForm.fulllastname === "" || userForm.rut === "" || userForm.email === "" || userForm.users_divisions === "" || userForm.passwordT === "" || userForm.confirmPassword === "" || userForm.position === "" || userForm.role === "") {
      errorsPost.value = "Debe llenar los campos";
      return {
        errorsPost,
        user,
        nicePost
      };
    } else {

      const fullname = userForm.fullname;
      const fulllastname = userForm.fulllastname;
      const passwordT = userForm.passwordT;
      const email = userForm.email;
      const rut = userForm.rut;
      const users_divisions = userForm.users_divisions;
      const position = userForm.position;
      const role = userForm.role;

      try {
        const resp = await backendConnect.post(
          "/api/user",
          {
            fullname,
            fulllastname,
            passwordT,
            email,
            rut,
            users_divisions,
            position,
            role
          },
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
