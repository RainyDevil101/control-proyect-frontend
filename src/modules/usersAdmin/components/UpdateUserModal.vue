<template>
  <div class="modal-background fade-in" @click.self="$emit('on:close')">
    <div class="modal-container">
      <div class="update-wrapper">
        <form @submit.prevent="onSubmitUpdate">
          <div class="input-change-name margin-item">
            <input type="text" placeholder="Nombres" v-model="user.fullname" maxlength="60" />
          </div>
          <div class="input-change-name margin-item">
            <input type="text" placeholder="Apellidos" v-model="user.fulllastname" maxlength="60" />
          </div>
          <div class="input-change-name margin-item">
            <input type="text" placeholder="Rut" maxlength="60" v-model="user.rut" />
          </div>
          <div class="input-change-name margin-item">
            <input type="text" placeholder="Email" maxlength="60" v-model="user.email" />
          </div>
          <div class="input-change-name margin-item">
            <input type="text" placeholder="Cargo" maxlength="60" v-model="user.position" />
          </div>
          <div class="input-change-name margin-item">
            <input type="password" placeholder="Contraseña" v-model="userUpdatePasswords.passwordT" maxlength="60" />
          </div>
          <div class="input-change-name margin-item">
            <input type="password" placeholder="Confirme contraseña" v-model="userUpdatePasswords.confirmPasswordT"
              maxlength="60" />
          </div>
          <div class="input-change-name margin-item">
            <select v-model="user.role">
              <option v-for="role of roles" :key="role.name" :value="role.role">
                {{ role.name }}
              </option>

            </select>
          </div>
          <div class="update-button">
            <button class="btn btn-warning" type="submit">
              Actualizar
            </button>
            <button type="button" class="btn btn-danger" @click="onDelete">
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import updateUser from "../composables/updateUser";
import deleteUser from "../composables/deleteUser";

export default {
  emits: ["on:close"],
  props: {
    roles: {
      type: Object,
      required: true
    },
  },
  setup(props) {

    const { user, userId, onSubmitUpdate, userUpdatePasswords } = updateUser();
    const { onDelete } = deleteUser();

    const roles = props.roles;

    return {
      userId,
      user,
      roles,
      onSubmitUpdate,
      userUpdatePasswords,
      onDelete

    };
  },
};
</script>
  
<style lang="scss" scoped>
  
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }
  
  .input-change-name {
    display: grid;
  }
  
  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70vw;
    max-width: 550px;
  }
  
  .modal-container {
    padding: 3rem;
    color: black;
    background-color: white;
    width: auto;
    height: auto;
    max-width: 95vw;
    max-height: 80vh;
    overflow: auto;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
  }
  
  .margin-item {
    margin: 20px 0 20px 0;
  }
  
  .update-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .fade-in {
    animation: fadeIn ease-out 0.2s;
    -webkit-animation: fadeIn ease-out 0.2s;
    -moz-animation: fadeIn ease-out 0.2s;
    -o-animation: fadeIn ease-out 0.2s;
    -ms-animation: fadeIn ease-out 0.2s;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  </style>