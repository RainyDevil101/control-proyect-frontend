<template>
  <div class="completa-wrapper"
  @click="$router.push({ name : 'completed-refund', params: { id: completaFiltered.id } })"
  >
    <span>ID: <b>{{completaFiltered.id}}</b> | </span>
    <span>ESTADO: <b>{{completaFiltered.statusDelivery}}</b></span>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: {
    completaFiltered: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const completaFiltered = ref(props.completaFiltered);

    return {
      completaFiltered,
    };
  },
};
</script>

<style lang="scss" scoped>

.completa-wrapper {
    background-color: rgb(201, 201, 201);
    padding: 10px;
    margin: 4px;
    border-radius: 4px;
    transition: all .2s ease-in-out;
}

.completa-wrapper:hover {
        background-color: rgb(155, 155, 155);
    }

</style>