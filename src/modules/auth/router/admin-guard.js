import store from "@/store";
import Swal from "sweetalert2";

const admin = async(to, from, next) => {

    const { user } = await store.dispatch('auth/readToken')

    if ( user === undefined ) {
        next({name: 'select-login'})
    }

    if ( user[0].length === 0 || user === undefined ) {
        next({name: 'select-login'})
    }

    if ( user[0].role === 'ADMIN_ROLE' ) {
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

export default admin