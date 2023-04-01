<template>
  <div class="login-wrapper">
    <div class="login">
        <img class="image-logo" src="../../../assets/logocacciuttolo.png" alt="Logo">
        <button @click="onSupervisores" class="login-boton">Ingresar</button>
        <p>Si no tienes cuenta, ponte en contacto con el administrador.</p>
    </div>

  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    return {
      onSupervisores: () => {
        router.push({ name: "front-auth" });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
  max-width: 768px;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.login {
  margin: 20px auto;
  background-color: #fff;
  padding: 10px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.login p {
  text-align: center;
}

.image-logo {
  width: 100%;
}

.login-boton {
  margin: auto;
  margin-top: 40px;
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
  text-transform: uppercase;

  &:hover {
    background-color: rgba($color: black, $alpha: 0.7);
  }
}


@media screen and (min-width: 768px) {

// .login {
//   background-color: red;
//   margin: auto;
//   padding: auto;
// }

}
</style>