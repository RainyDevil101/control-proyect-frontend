<template>
  <div class="completa-wrapper"
  @click="$router.push({ name : 'all-material', params: { id: completa.id } })"
  >
    <span>ID: <b>{{completa.id}}</b> | </span>
    <span>FECHA DE REGISTRO: <b>{{completa.date_in}}</b> | </span>
    <span>FECHA DE DESPACHO <b>{{completa.date_out}}</b></span>
    <span>ESTADO: <b>{{completa.date_out}}</b></span>
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