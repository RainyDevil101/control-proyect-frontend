<template>
  <div class="completa-wrapper"
  @click="$router.push({ name : 'completed-material', params: { id: completa.id } })"
  >
    <span>ID: <b>{{completa.id}}</b> | </span>
    <span>Número de transporte: <b>{{completa.transport_number}}</b></span>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: {
    completa: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const completa = ref(props.completa);

    return {
        completa,
    };
  },
};
</script>

<style lang="postcss" scoped>

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