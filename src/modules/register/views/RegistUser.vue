<template>
  <loader v-if="status === 'CARGANDO' || secondStatus === 'CARGANDO'" />

  <div v-else class="wrapper-users">
    <div class="users">
      <div class="header">
        <h1>Usuarios</h1>
      </div>

      <div class="body-user">
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
          <div class="header">
            <h1>Registrar usuario</h1>
          </div>
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
          <div class="button-wrapper">
            <button type="submit" class="btn btn-warning back">CREAR</button>
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
p, h1 {
  margin: 4px 0 4px 0;
  padding: 0;
}

p {
  color: white;
}

.wrapper-users {
  display: block;
  min-height: 100vh;
  width: 90vw;
  margin: auto;
  padding: 4rem 0 10px 0;
}

.button-wrapper {
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.users {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
  min-width: 300px;
  padding: 4px;
}

.body-user {
  height: 74vh;
  overflow: auto;
}

.header h1 {
  text-align: center;
  color: white;
  padding: 10px;
}

.create-wrapper {
  margin-top: 20px;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  min-width: 300px;
  border-radius: 4px;
  display: flex;
  padding: 4px;
}

.create {
  margin: auto;
  height: 90.5vh;
}

.form {
  display: block;
  margin: auto;
}

input[type="text"], input[type="email"], input[type="password"], input[type=""] {
  width: 100%;
}

select {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .wrapper-users {
    display: flex;
    justify-content: space-around;
    align-items: center;
      padding: 4rem 0 10px 0;
  };

  .create {
  margin: auto;
  height: 100%;
}

.body-user {
  height: 60vh;
  overflow: auto;
}

}
</style>