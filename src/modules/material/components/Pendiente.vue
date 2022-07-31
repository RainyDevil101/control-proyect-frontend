<template>
  <div class="pendiente-wrapper"
  @click="$router.push({ name : 'dispatch-material', params: { id: pendiente.id } })"
  >
    <span>ID: <b>{{pendiente.id}}</b> | </span>
    <span>Número de transporte:<b> {{pendiente.transport_number}}</b></span>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: {
    pendiente: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const pendiente = ref(props.pendiente);

    return {
        pendiente,
    };
  },
};
</script>

<style lang="postcss" scoped>

.pendiente-wrapper {
    background-color: tomato;
    padding: 10px;
    margin: 4px;
    border-radius: 4px;
    transition: all .2s ease-in-out;
}

.pendiente-wrapper:hover {
        background-color: rgb(255, 83, 52);
    }

</style>