<template>
    <div class="incompleted-wrapper"
    @click="$router.push({ name : 'dispatch-refund', params: { id: incompleted.id } })"
    >
      <span>ID: <b>{{incompleted.id}}</b> | N° transporte:<b> {{incompleted.transport_number}}</b> | Código:<b> {{incompleted.code}}</b></span>
    </div>
  </template>
  
  <script>
  import { ref } from '@vue/reactivity';
  export default {
    props: {
        incompleted: {
        type: Object,
        required: true,
      },
    },
  
    setup(props) {
  
      const incompleted = ref(props.incompleted);
  
      return {
        incompleted,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  
  .incompleted-wrapper {
    display: flex;
      background-color: tomato;
      padding: 10px;
      margin: 4px;
      border-radius: 4px;
      transition: all .2s ease-in-out;
      overflow: auto;
      justify-content: space-between;
  }
  
  .incompleted-wrapper:hover {
          background-color: rgb(255, 83, 52);
      }
  
  </style>