import store from "@/store";
import Swal from "sweetalert2";

const revisor = async(to, from, next) => {

    const {user} = await store.dispatch('auth/readToken')

    if ( user[0].length == 0 ) {
        next({name: 'select-login'})
        return
    }
    if( user[0].role === 'ADMIN_ROLE' ) {
        next({ name: 'admin-menu' })
        return
    } else {
        Swal.fire({
            title: "Error",
            text: "No tiene los permisos",
            icon: "error"
        });
        next({name: 'select-login'})
    }

}

export default revisor