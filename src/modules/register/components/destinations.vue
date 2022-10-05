<template>
  <div @click="$emit('on:open', { id })" class="destination-container">
    <span class="destination"
      ><p>{{ destination.id }}</p>
      </span>
    <span class="destination-name"
      ><p>{{ destination.nombre }}</p>
      </span>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {

  emits: ['on:open'],

  props: {
    destination: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const destination = ref(props.destination);
    const id = props.destination.id;

    return {
      destination,
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

.destination-container {
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.destination {
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.destination-name {
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.destination-name p {

  max-width: 14rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

}

</style>