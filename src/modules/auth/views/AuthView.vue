<template>
  <div class="wrapper">
    <div class="login">
      <div class="selector">
        <h4>INICIAR SESIÓN</h4>
      </div>
      <form class="login-forum" @submit.prevent="onSubmit">
        <div class="forum-mail" data-validate="Enter username">
          <input
            v-model="userForm.rut"
            type="text"
            class="input-forum"
            placeholder="Rut Ej: 12.345.678-9"
            required
          />
        </div>

        <div class="forum-password" data-validate="Enter password">
          <input
            v-model="userForm.passwordT"
            type="password"
            class="input-forum"
            placeholder="Contraseña"
            required
          />
        </div>

        <div class="in-forum">
          <button class="login-boton">Ingresar</button>
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
      rut: "",
      passwordT: "",
    });

    // const userForm = ref({
    //   rut: "19.268.695-4",
    //   passwordT: "HERRERACARRENO",
    // });

    // const userForm = ref({
    //   rut: "19.268.695-4",
    //   passwordT: "HERRERACARRENO",
    // });

    return {
      userForm,

      onSubmit: async () => {
        const { ok, errors } = await loginUser(userForm.value);

        if (!ok) Swal.fire("Error", `${errors}.`, "error");
        else router.push({ name: "home-view" });
      },
      onBack: async () => {
        router.push({ name: "select-login" });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  width: 90%;
  height: 50%;
  background-color: #fff;
  display: block;
  border-radius: 4px;
  text-align: center;
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

.login-forum {
  margin-top: 3rem;
}

.selector {
  text-align: center;
  display: block;
  color: #fff;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

.change-forum {
  color: rgba($color: #3b3b3b, $alpha: 1);
  font-size: 0.7rem;
  text-decoration: none;
}

// x-Small devices (landscape phones, 375px and up)

@media (min-width: 375px) {
  .forum-mail {
    font-size: 1.3rem;
  }
  .forum-password {
    font-size: 1.3rem;
  }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
  .forum-mail {
    font-size: 1.5rem;
  }
  .forum-password {
    font-size: 1.5rem;
  }
  .login-boton {
    font-size: 1.4rem;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .forum-mail {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 5rem;
  }
  .forum-password {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .login-boton {
    font-size: 1.5rem;
  }

  .login {
  width: 40%;
}

}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {

    .login {
  width: 30%;
}

}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>