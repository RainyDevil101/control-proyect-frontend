<template>
  <div @click="$emit('on:open', { id })" class="division-container">
    <span class="division"
      >{{ division.id }}
      </span>
    <span class="division"
      >{{ division.name }}
      </span>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {

  emits: ['on:open'],

  props: {
    division: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const division = ref(props.division);
    const id = props.division.id;

    return {
      division,
      id,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}

.division-container {
  background-color: white;
  margin: 5px;
  padding: 3px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
}

.division {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>