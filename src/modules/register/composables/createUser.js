import { ref } from "vue";
import backendConnect from "../../../api/backend";

const createUser = () => {
  const errors = ref(true);
  const user = ref(null);
  const nice = ref(false);

  const postUser = async (userForm) => {

    if (userForm.fullname === "" || userForm.fulllastname === "" || userForm.rut === "" || userForm.email === "" || userForm.users_divisions === "" || userForm.passwordT  === "" || userForm.confirmPassword === "" || userForm.position === "" || userForm.role === "" ) {
      errors.value = "Debe llenar los campos";
      return {
        errors,
        user,
        nice
      };

    } 
    
    if ( userForm.passwordT !== userForm.confirmPassword ) {

      errors.value = "Las contraseñas no coinciden"

      return {
        errors,
        user,
        nice
      }
      
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
            rut,
            email,
            users_divisions,
            passwordT,
            position,
            role
           },
          { headers: { "x-token": localStorage.getItem("token") } }
        );

        user.value = resp.data.user;
        nice.value = true;
        errors.value = false;

        return { errors, nice, user };
      } catch (error) {

        if (error.response.data.msg) {
          errors.value = error.response.data.msg;
          user.value = null;
          nice.value = false;
          return { errors, nice, user };
        }
        if (error.response.data.errors) {
          const msgErr = [];
          const errorsDB = error.response.data.errors;
          for (const error of errorsDB) {
            msgErr.push(" " + error.msg);
          }
          errors.value = msgErr;
          user.value = null;
          nice.value = false;
          return { errors, nice, user };
        } else {
          user.value = resp.data.code;
          errors.value = false;
          nice.value = true;
          return { errors, nice, user };
        }
      }


    }
  };

  return {
    postUser,
    user,
    nice,
    errors,
  };
};

export default createUser;
