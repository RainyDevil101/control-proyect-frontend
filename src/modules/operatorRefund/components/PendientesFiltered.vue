<template>
  <div class="pendiente-wrapper"
  @click="$router.push({ name : 'dispatch-dash-refund', params: { id: pendienteFiltered.id } })"
  >
    <span>ID: <b>{{pendienteFiltered.id}}</b> | {{ pendienteFiltered.statusDelivery }}</span>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: {
    pendienteFiltered: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const pendienteFiltered = ref(props.pendienteFiltered);

    return {
      pendienteFiltered,
    };
  },
};
</script>

<style lang="scss" scoped>

.pendiente-wrapper {
  display: flex;
    background-color: tomato;
    padding: 10px;
    margin: 4px;
    border-radius: 4px;
    transition: all .2s ease-in-out;
    overflow: auto;
    justify-content: space-between;
}

.pendiente-wrapper:hover {
        background-color: rgb(255, 83, 52);
    }

</style>