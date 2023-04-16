import { ref } from "vue";
import Swal from "sweetalert2";
import registUser from "./registUser";

const submitUser = () => {

    const userForm = ref({
        fullname: "",
        fulllastname: "",
        passwordT: "",
        confirmPassword: "",
        rut: "",
        email: "",
        users_divisions: "",
        role: "",
        position: "",
    });


    const { postUser } = registUser();

    const onSubmit = async () => {

        
        new Swal({
            title: "Espere por favor",
            allowOutsideClick: false,
        });
        Swal.showLoading();
        
        
        const { ok, errors } = await postUser(userForm.value);
        
          if (ok.value === false) {
            Swal.fire("Error", `${errors.value}.`, "error");
            return;
          } else {
            Swal.fire("Guardado", "Usuario registrado con éxito", "success").then(
              function (result) {
                if (true) {
                  location.reload();
                } else {
                  window.alert("Error, intente nuevamente");
                }
              }
            );
          }

    }

    return {
        onSubmit,
        userForm
    }

}

export default submitUser;