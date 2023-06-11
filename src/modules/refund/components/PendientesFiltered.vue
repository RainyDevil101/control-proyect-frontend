<template>
  <tr class="cursor-pointer">
    <td @click="$router.push({ name: 'dispatch-dash-refund-admin', params: { id: pendienteFiltered.id } })">{{
      pendienteFiltered.code }}</td>
    <td>{{ pendienteFiltered.id }}</td>
    <td class="icon-td">
      <div class="icon-container">
        <button :disabled="deletingRefund" class="btn btn-danger button-i" @click="onDeleteRefund"><i
            class="fa-solid fa-trash"></i></button>
        <button :disabled="updatingRefund" class="btn btn-warning button-i"
        @click="$router.push({ name: 'update-refund', params: {id: pendienteFiltered.id}})"><i class="fa-solid fa-pen-to-square"></i></button>
      </div>
    </td>
  </tr>
</template>

<script>
import { useStore } from 'vuex';
import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import updateRefundData from '../composables/updateRefundData';
import deleteRefund from '../helpers/deleteRefund';


export default {
  emits: ['on:update'],
  props: {
    pendienteFiltered: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const store = useStore();
    const pendienteFiltered = ref(props.pendienteFiltered);
    const { updatingRefund, deletingRefund } = updateRefundData();

    const id = props.pendienteFiltered.id;

    return {
      pendienteFiltered,
      id,
      deletingRefund,
      updatingRefund,
      onDeleteRefund: async () => {

        store.dispatch('refunds/deleteRefundData');

        const { isConfirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: "No se podrá recuperar una vez borrado",
          showDenyButton: true,
          confirmButtonText: "Estoy seguro",
        });
        if (!isConfirmed) {
          store.dispatch('refunds/deleteRefundData');
          return;
        }
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        const { ok } = await deleteRefund(id);
        if (!ok) {
          store.dispatch('refunds/deleteRefundData');
          return Swal.fire("Error", "Comuniquese con el administrador", "error");
        }
        ;
        await store.dispatch("refunds/deleteRefund", id);
        store.dispatch('refunds/deleteRefundData');
        return Swal.fire("Eliminado", "", "success");
      },
    };
  },
}
</script>

<style lang="scss" scoped>

td {
  border: 1px solid #ddd;
  padding: 8px;
  word-wrap: break-word;
  margin: 0;
}

.icon-td {
  margin: 0;
  padding: 0;
}

.icon-container {
  display: flex;
  // background-color: red;
  align-items: center;
  justify-content: space-around;
}

.button-i {
  margin: 1px;
  width: 100%;
  height: 100%;
  border-radius: 0;
}

@media screen and (min-width: 768px) {

};

</style>