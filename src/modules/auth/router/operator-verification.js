import store from "@/store";
import Swal from "sweetalert2";

const revisor = async(to, from, next) => {

    const {user} = await store.dispatch('auth/readToken')

    if ( user === undefined ) {
        next({name: 'select-login'})
    }

    if ( user[0].role === 'OPERATOR_ROLE' ) {
        next()
    } else {
        Swal.fire({
            title: "Error",
            text: "No tiene los permisos",
            icon: "error"
        });
        next(from.fullPath)
    }

}

export default revisor