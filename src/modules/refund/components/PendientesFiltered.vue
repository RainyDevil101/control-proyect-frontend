<template>
  <tr class="cursor-pointer">
    <td @click="$router.push({ name: 'dispatch-dash-refund-admin', params: { id: pendienteFiltered.id } })">{{
      pendienteFiltered.code }}</td>
    <td>{{ pendienteFiltered.id }}</td>
    <td @click="onDeleteImage" class="delete">Eliminar</td>
  </tr>
</template>

<script>
import { ref } from 'vue';
import deleteRefund from '../helpers/deleteRefund';

export default {
  emits: ['on:open'],
  props: {
    pendienteFiltered: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const pendienteFiltered = ref(props.pendienteFiltered);
    const id = props.pendienteFiltered.id;

    return {
      pendienteFiltered,
      id,
      onDeleteImage: async () => {

        await deleteRefund(id);

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