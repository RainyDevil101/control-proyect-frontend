<template>
  <div
    class="allMaterial-wrapper"
    :class="[allMaterial.date_out === 'PENDIENTE' ? pending : completed]"
    @click="
      [
        allMaterial.date_out === 'PENDIENTE'
          ? $router.push({
              name: 'dispatch-material',
              params: { id: allMaterial.id },
            })
          : $router.push({
              name: 'completed-material',
              params: { id: allMaterial.id },
            }),
      ]
    "
  >
    <span
      >ID: <b>{{ allMaterial.id }}</b> |
    </span>
    <span
      >FECHA DE REGISTRO: <b>{{ allMaterial.date_in }}</b> |
    </span>
    <span
      >FECHA DE DESPACHO <b>{{ allMaterial.date_out }}</b></span
    >
    <!-- <span
      >ESTADO: <b>{{ allMaterial.date_out }}</b></span
    > -->
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    allMaterial: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const allMaterial = ref(props.allMaterial);
    const pending = ref("pending");
    const completed = ref("completed");

    return {
      allMaterial,
      pending,
      completed,
    };
  },
};
</script>

<style lang="postcss" scoped>
.allMaterial-wrapper {
  background-color: rgb(201, 201, 201);
  padding: 10px;
  margin: 4px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.allMaterial-wrapper:hover {
  background-color: rgb(155, 155, 155);
}

.pending {
  background-color: tomato;

}

.pending:hover {
    background-color: rgb(255, 83, 52);
}

</style>