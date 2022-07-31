<template>
  <div @click="$emit('on:open', { id })" class="location-container">
    <span class="location"
      >{{ location.id }}
      </span>
    <span class="location"
      >{{ location.name }}
      </span>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  
  emits: ['on:open'],

  props: {
    location: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const location = ref(props.location);
    const id = props.location.id;

    return {
      location,
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

.location-container {
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

.location {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>