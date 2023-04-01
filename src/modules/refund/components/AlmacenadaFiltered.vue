<template>
  <div class="pendiente-wrapper"
  @click="$router.push({ name : 'stored-refund', params: { id: almacenadaFiltered.id } })"
  >
    <span>ID: <b>{{almacenadaFiltered.id}}</b> | {{ almacenadaFiltered.statusDelivery }}</span>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: {
    almacenadaFiltered: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const almacenadaFiltered = ref(props.almacenadaFiltered);

    return {
      almacenadaFiltered,
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