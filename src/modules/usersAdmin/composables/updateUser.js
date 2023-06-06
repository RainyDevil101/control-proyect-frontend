import { computed, ref } from "vue";
import { useStore } from "vuex";
import backendConnect from "@/api/backend";
import Swal from "sweetalert2";

const updateUser = () => {

    const store = useStore();

    const errorsUpdate = ref(true);
    const niceUpdate = ref(false);

    const userUpdatePasswords = ref({
        passwordT: "",
        confirmPasswordT: "",
    });

    const userUpdate = computed(
        () => store.getters["users/getUpdateUser"]
    );
    const user = computed(() => store.getters["users/getChangeUser"])
    const userId = computed(() => store.getters["users/getChangeUserId"])

    const onShowUpdateUser = (id) => {

        if (userUpdate.value === false) {
            store.dispatch("users/changeUserId", id);
            store.dispatch("users/changeUserUpdate", true);
            return;
        } else {
            store.dispatch("users/changeUserUpdate", false);
            return;
        }
    }

    const putUser = async (userUpdatePasswords, user, id) => {

        errorsUpdate.value = true;

        if (!user || !userUpdatePasswords || !id) {
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

        if (userUpdatePasswords.passwordT !== userUpdatePasswords.confirmPasswordT) {

            niceUpdate.value = false;
            errorsUpdate.value = "Las contraseñas no coinciden";

            return { niceUpdate, errorsUpdate };
        } else {

            if (userUpdatePasswords.passwordT.length > 0) {
                user.password = userUpdatePasswords.passwordT;
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

    const onSubmitUpdate = async () => {

        new Swal({
            title: "Espere por favor",
            allowOutsideClick: false,
        });
        Swal.showLoading();

        const { errorsUpdate, niceUpdate } = await putUser(
            userUpdatePasswords.value,
            user.value,
            userId.value
        );

        if (niceUpdate.value === false) {
            Swal.fire("Error", `${errorsUpdate.value}.`, "error");
            return;
        } else {
            await store.dispatch("users/loadUsers");

            Swal.fire(
                "Guardado",
                "Usuario actualizado con éxito",
                "success"
            ).then(function (result) {
                if (true) {
                    location.reload();
                } else {
                    window.alert("Error, intente nuevamente");
                }
            });
        }
    }

    return {
        onShowUpdateUser,
        userUpdate,
        user,
        userId,
        onSubmitUpdate,
        errorsUpdate,
        niceUpdate,
        userUpdatePasswords
    };
};

export default updateUser;