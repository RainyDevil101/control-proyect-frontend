<template>
  <div class="user-container">
    <span class="user"
      >{{ user.fullname }}
      </span><p class="delete" @click="onDelete">Eliminar</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Swal from "sweetalert2";
import deleteUser from "../composables/deleteUser";


export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    
    const user = ref(props.user);
    const toDelete = ref(props.user.id);
    const { delUser } = deleteUser();

    return {
      user,
      deleteUser,
      delUser,

      onDelete: async () => {
        const { isConfirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: "No se podrá recuperar una vez borrado",
          showDenyButton: true,
          confirmButtonText: "Estoy seguro",
        });

        if (isConfirmed) {
          new Swal({
            title: "Espere por favor",
            allowOutsideClick: false,
          });
          Swal.showLoading();

          const { nice } = await delUser(toDelete.value);

          if (nice.value === true) {

            Swal.fire("Eliminado", "", "success").then(function (result) {
              if (true) {
                location.reload();
              } else {
                window.alert("Error", "intente nuevamente");
              }
            });

          }

        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}

.user-container {
  background-color: white;
  margin: 5px;
  padding: 3px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
}

.delete {
  cursor: default;
  border-radius: 4px;
  padding: 3px;
  color: white;
  background-color: rgba(218, 58, 58, 0.786);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(218, 58, 58, 0.515);
  }
}

.user {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>