<template>
  <div class="location-container">
    <span class="location"
      >{{ location.name }}
      </span><p class="delete" @click="onDelete">Eliminar</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Swal from "sweetalert2";
import deleteLocation from "../composables/deleteLocation";

const { delLocation } = deleteLocation();

export default {
  props: {
    location: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const location = ref(props.location);
    const toDelete = ref(props.location.id);

    return {
      location,
      delLocation,

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

          const { nice } = await delLocation(toDelete.value);

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

.location-container {
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

.location {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>