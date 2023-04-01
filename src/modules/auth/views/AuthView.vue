<template>
  <div class="login-wrapper">
    <div class="login">
      <h4 class="login-header-wrapper">Iniciar sesión</h4>
      <form class="login-forum" @submit.prevent="onSubmit">
        <div class="forum-mail" data-validate="Enter username">
          <input v-model="userForm.rut" type="text" class="input-forum" placeholder="Rut Ej: 12.345.678-9" required />
          <div class="change-forum mt-5">
            <p>Ingrese su RUT con puntos y guión.</p>

          </div>
        </div>

        <div class="forum-password" data-validate="Enter password">
          <input v-model="userForm.passwordT" type="password" class="input-forum" placeholder="Contraseña" required />
        </div>

        <div class="in-forum">
          <button :disabled="loading === true" class="login-boton">Ingresar</button>
          <button type="button" @click="onBack" class="login-boton">
            Volver
          </button>
        </div>

        <div class="change-forum mt-5">
          <p>Si no tienes cuenta, ponte en contacto con el administrador.</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";
import Swal from "sweetalert2";

export default {
  setup() {
    const router = useRouter();
    const { loginUser } = useAuth();

    const userForm = ref({
      rut: "13.689.671-7",
      passwordT: "administrador",
    });

    const loading = ref(false);
    const { pathWanted } = useAuth();

    return {
      userForm,
      loading,
      pathWanted,

      onSubmit: async () => {
        loading.value = true;
        const { ok, errors } = await loginUser(userForm.value);


        if (!ok) {
          Swal.fire("Error", `${errors}.`, "error");
          loading.value = false;
        } else {
          if (pathWanted.value === false) {
            return router.push({ name: "home-view" });
          } else {
            return router.push({ name: pathWanted.value });
          }
        };
      },
      onBack: async () => {
        router.push({ name: "select-login" });
      },
    };
  },
};
</script>

<style lang="scss" scoped>

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  max-width: 768px;
  margin: 0 auto;
  width: 90%;
}

.login {
  margin: 20px auto;
  padding: 10px;
  display: block;
  background-color: #fff;
  text-align: center;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.forum-mail {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.forum-password {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
input:focus,
textarea:focus,
select:focus {
  outline: none;
}

::-webkit-input-placeholder {
  text-align: center;
}

:-moz-placeholder {
  text-align: center;
}

.input-forum {
  text-align: center;
  width: 60%;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: solid 2px rgb(255, 255, 255);
  transition: 0.5s;

  &:hover {
    border-bottom: solid 2px rgb(172, 172, 172);
  }
  &:focus {
    border-bottom: solid 2px rgb(0, 0, 0);
  }
}

.login-header-wrapper {
  text-align: center;
  color: #fff;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.change-forum {
  font-size: 12px;
}

.login-boton {
  margin: auto;
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  font-size: 1.5rem;
  color: white;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border: none;
  min-width: 217px;
  max-width: 280px;
  transition: 0.5s;
  border-radius: 0.3rem;

  &:hover {
    background-color: rgba($color: black, $alpha: 0.7);
  }
}
</style>