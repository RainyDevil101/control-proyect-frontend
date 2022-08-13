<template>
  <div v-if="userUpdate === true" class="update-user">
    <update-user @on:close="onShowUpdateUser"/>
  </div>

  <div v-if="getStatusUser === 'CARGANDO'" class="loader-wrapper">
    <loader />
  </div>

  <div v-else class="wrapper-users">

    <div class="users">
      
      <div class="header">
        <h1>Usuarios</h1>
      </div>

      <div v-if="showUsers === true" class="body-user">
              <div class="search">
        <input type="text" placeholder="Buscar usuario" v-model="term" />
      </div>
        <users
          v-for="user of users"
          :key="user"
          :user="user"
          @on:open="onShowUpdateUser"
        />
      </div>
        <div v-else class="not-register"><h1>NO HAY REGISTROS</h1></div>
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
          <div class="form form-name">
            <p>Apellido</p>
            <input
              type="text"
              placeholder="Apellido"
              v-model="userForm.fulllastname"
              maxlength="60"
            />
          </div>
          <div class="form form-rut">
            <p>Rut</p>
            <input
              type="text"
              placeholder="Ej: 12.345.678-k"
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
import { watch } from '@vue/runtime-core';
import { useStore } from "vuex";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";

import users from "../components/users.vue";
import usersCommand from "../composables/usersCommand";
import getTerm from "@/helpers/searchByTerm";
import UpdateUser from "../components/update-user.vue";

export default {
  components: { users, Loader, UpdateUser },
  setup() {
    const store = useStore();

    const term = ref("");

    const { postUser } = usersCommand();
  
    const roles = ref([
      { name: "ADMIN_ROLE" },
      { name: "OPERATOR_ROLE" },
      { name: "PLANNER_ROLE" },
    ]);

    const {
      userTerm,
      getStatusUser,
      divisions,
      users,
      userUpdate,
      userIdStatus,
      showUsers,
    } = getTerm();

    watch(
      () => term.value,
      () => userTerm(term.value)
    );

    const userForm = ref({
      fullname: "TESTTTT",
      fulllastname: "TESTING",
      passwordT: "testing",
      confirmPassword: "testing",
      rut: "14.279.370-9",
      email: "testing@gmail.com",
      users_divisions: "1000",
      role: "ADMIN_ROLE",
      position: "Test",
    });


    return {
      term,
      userForm,
      postUser,
      divisions,
      users,
      roles,
      getStatusUser,
      userTerm,
      userUpdate,
      userIdStatus,
      showUsers,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const { errorsPost, user, nicePost } = await postUser(userForm.value);

        if (nicePost.value === false) {
          Swal.fire("Error", `${errorsPost.value}.`, "error");
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
      onShowUpdateUser: (id) => {
        
        if (userUpdate.value === false) {
          store.dispatch("users/changeUserId", id);
          store.dispatch("users/changeUserUpdate", true);
          return;
        } else {
          store.dispatch("users/loadUsers");
          store.dispatch("users/changeUserUpdate", false);
          return;
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
p,
h1 {
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
  padding: 4rem 0 20px 0;
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
  padding: 15px;
}

.body-user {
  height: 70vh;
  overflow: auto;
  width: 100%;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="text"] {
  border-radius: 4px;
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
  padding: 15px;
}

.loader-wrapper {
  width: 100vw;
  height: 100vh;
}

.create {
  margin: auto;
  width: 100%;
}

.not-register {
  width: 30vw;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.form {
  display: block;
  margin: auto;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type=""] {
  width: 100%;
}

select {
  width: 100%;
}

@media screen and (min-width: 948px) {
  .wrapper-users {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .create {
    margin: auto;
    height: 100%;
    min-width: 400px;
  }

  .users {
    min-width: 400px;
  }

  .body-user {
    height: 60vh;
    overflow: auto;
  }
}
</style>