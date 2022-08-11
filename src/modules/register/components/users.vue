<template>
  <div @click="$emit('on:open', { id })" class="user-container">
    <span class="user"
      >{{ user.fullname }} {{user.fulllastname}}
      </span>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {

  emits: ['on:open'],

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    
    const user = ref(props.user);
    const id = props.user.id;


    return {
      user,
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

.user-container {
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

.user {
  display: flex;
  align-content: center;
  justify-content: space-between;
}

span {
    word-wrap: break-word;
  max-width: 20rem;
}
</style>