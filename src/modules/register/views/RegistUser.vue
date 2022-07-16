<template>
  <loader v-if="status === 'CARGANDO' || secondStatus === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="users">
      <div class="header">
        <h1>Usuarios</h1>
      </div>

      <div class="body">
        <users
          v-if="users.length > 0"
          v-for="user of users"
          :key="user"
          :user="user"
        />
        <div v-else class="no-registers"><h1>No hay registros</h1></div>
      </div>
      <div class="button-wrapper">
        <button
          type="button"
          @click="$router.push({ name: 'select-register' })"
          class="btn btn-warning back"
        >
          Volver
        </button>
      </div>
    </div>
    <div class="create-wrapper">
      <div class="create">
        <form @submit.prevent="onSubmit">
          <div class="form form-name">
            <p>Nombre</p>
            <input
              type="text"
              placeholder="Nombre"
              v-model="userForm.fullname"
              maxlength="60"
            />
          </div>
          <div class="form form-rut">
            <p>Rut</p>
            <input
              type="text"
              placeholder="Ej: 12345678k"
              v-model="userForm.rut"
              maxlength="11"
            />
          </div>
          <div class="form form-email">
            <p>Email</p>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              v-model="userForm.email"
              maxlength="50"
            />
          </div>
          <div class="form form-password">
            <p>Contraseña</p>
            <input
              type="password"
              maxlength="70"
              v-model="userForm.passwordT"
            />
          </div>
          <div class="form form-password">
            <p>Confirmar contraseña</p>
            <input
              type="password"
              maxlength="70"
              v-model="userForm.confirmPassword"
            />
          </div>
          <div class="form form-position">
            <p>Cargo</p>
            <input type="text" v-model="userForm.position" maxlength="50" />
          </div>
          <div class="form form-division">
            <p>División</p>
            <select
              v-model="userForm.users_divisions"
              aria-label="Default select example"
            >
              <option
                v-for="division of divisions"
                :key="division.id"
                :value="division.id"
              >
                {{ division.name }}
              </option>
            </select>
          </div>
          <div class="form form-role">
            <p>Rol de usuario</p>
            <select v-model="userForm.role">
              <option v-for="role of roles" :key="role.name" :value="role.name">
                {{ role.name }}
              </option>
            </select>
          </div>
          <div class="button-create">
            <button type="submit" class="button-forum">CREAR</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import Swal from "sweetalert2";

import Loader from "@/modules/components/Loader.vue";
import getUser from "../../get/getUser";
import users from "../components/users.vue";
import createUser from "../composables/createUser";
import getDivisions from "@/modules/get/getDivision";

export default {
  components: { users, Loader },
  setup() {
    const store = useStore();

    const roles = ref([
      { name: "ADMIN_ROLE" },
      { name: "OPERATOR_ROLE" },
      { name: "PLANNER_ROLE" },
    ]);
    const { users, searchUsers, status } = getUser();

    const userForm = ref({
      fullname: "Alexis Herrera",
      passwordT: "testing",
      confirmPassword: "testing",
      rut: "19268695-4",
      email: "testing@gmail.com",
      users_divisions: "1000",
      role: "ADMIN_ROLE",
      position: "Test",
    });

    const { postUser } = createUser();
    const { divisions, searchDivisions, secondStatus } = getDivisions();

    return {
      users,
      searchUsers,
      status,
      userForm,
      postUser,
      divisions,
      searchDivisions,
      secondStatus,
      roles,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const { user, nice, errors } = await postUser(userForm.value);

        if (nice.value === false) {
          Swal.fire("Error", `${errors.value}.`, "error");
          return;
        } else {
          Swal.fire("Guardado", "Usuario registrado con éxito", "success").then(
            function (result) {
              if (true) {
                location.reload();
              } else {
                window.alert("Error, intente nuevamente");
              }
            }
          );
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.wrapper {
  width: 100vw;
  height: 100vh;
  padding-top: 6rem;
  padding-bottom: 5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: grid;
  margin: auto;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);

  grid-template-areas:
    "users users"
    "create create";
}
.users {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
  grid-area: users;
  height: 100%;
}

.create-wrapper {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
  grid-area: create;
  height: 100%;
}

.button-wrapper {
  padding: 4px 0 4px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  color: #fff;
  padding: 15px;
  text-align: center;
}

.form {
  padding: 10px;
}

.form p {
  color: #fff;
  margin-bottom: 6px;
}

.form input {
  width: 100%;
}

.button-create {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-forum {
  margin: 4px;
  border-radius: 4px;
  width: 70px;
}

.body {
  height: 30vh;
  overflow: auto;
}

.no-registers {
  display: flex;
  height: 100%;
  align-content: center;
  justify-content: center;
}

.no-registers h1 {
  margin: auto;
  text-align: center;
  color: #fff;
}

.form select {
  width: 100%;
}

input[type="text"] {
  border-radius: 4px;
}

@media screen and (min-width: 768px) {
  .wrapper {
    grid-template-areas:
      "users create"
      "users create";
  }

  .body {
    height: 80%;
  }

  .create-wrapper {
    // height: 70%;
    width: 60%;
  }

  .wrapper {
    padding-left: 4rem;
    padding-right: 4rem;
    grid-gap: 4rem;
  }
}
</style>