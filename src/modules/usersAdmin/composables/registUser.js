import { computed, ref } from "vue";
import { useStore } from "vuex";
import backendConnect from "@/api/backend";

const registUser = () => {

    const store = useStore();

    const errors = ref("");
    const ok = ref(true);
    const user = ref();

    const roles = ref([
        { name: "ADMINISTRADOR", role: "ADMIN_ROLE", },
        { name: "OPERADOR", role: "OPERATOR_ROLE" },
        { name: "PLANIFICADOR", role: "PLANNER_ROLE" },
        { name: "DESPACHADOR", role: "REFUNDER_ROLE" }
    ]);

    const postUser = async (userForm) => {

        const { fullname, fulllastname, passwordT, confirmPassword, rut, email, users_divisions, role, position } = userForm;

        if (fullname.length === 0 ||
            fulllastname.length === 0 ||
            passwordT.length === 0 ||
            confirmPassword.length === 0 ||
            rut.length === 0 ||
            email.length === 0 ||
            users_divisions.length === 0 ||
            role.length === 0 ||
            position.length === 0) {
            errors.value = "Debe llenar los campos";
            ok.value = false;
            return { errors, ok }
        }

        try {

             await backendConnect.post("/api/user", { fullname, fulllastname, passwordT, confirmPassword, rut, email, users_divisions, role, position }, { headers: { "x-token": localStorage.getItem("token") } });

            return { ok, user };

        } catch (error) {
            if (error.response.data.msg) {
                errors.value = error.response.data.msg;
                ok.value = false;
                return { errors, ok };
            }
            if (error.response.data.errors) {
                const msgErr = [];
                const errorsDB = error.response.data.errors;
                for (const error of errorsDB) {
                    msgErr.push(" " + error.msg);
                }
                errors.value = msgErr;
                ok.value = false;
                return { errors, ok };
            }
        }
    }

    return {
        roles,
        postUser,
        user,
        divisions: computed(() => store.getters["divisions/getDivisions"])
    };
}




export default registUser;