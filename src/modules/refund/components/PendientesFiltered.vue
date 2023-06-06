<template>
  <tr class="cursor-pointer">
    <td @click="$router.push({ name: 'dispatch-dash-refund-admin', params: { id: pendienteFiltered.id } })">{{
      pendienteFiltered.code }}</td>
    <td>{{ pendienteFiltered.id }}</td>
    <td @click="onDeleteImage" class="delete">Eliminar</td>
  </tr>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import deleteRefund from '../helpers/deleteRefund';

export default {
  props: {
    pendienteFiltered: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const store = useStore();
    const pendienteFiltered = ref(props.pendienteFiltered);
    const id = props.pendienteFiltered.id;
    const deletingRefund = ref(false);

    return {
      pendienteFiltered,
      id,
      deletingRefund,
      onDeleteImage: async () => {

        if (deletingRefund.value === true) return;

        deletingRefund.value = true;

        const { isConfirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: "No se podrá recuperar una vez borrado",
          showDenyButton: true,
          confirmButtonText: "Estoy seguro",
        });

        if (!isConfirmed) {
          deletingRefund.value = false;
          return;
        }

        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const { ok } = await deleteRefund(id);

        if (!ok) {
          return Swal.fire("Error", "Comuniquese con el administrador", "error");
        };

        await store.dispatch('refunds/deleteRefund', id);

        return Swal.fire("Eliminado", "", "success")

      },
    }
  }
}
</script>

<style lang="scss" scoped>

td {
  border: 1px solid #ddd;
  padding: 8px;
  word-wrap: break-word;
  background-color: tomato;
}

td.delete {
  background-color: crimson;
  text-align: center;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: white;
    color: crimson;
  }

}
</style>