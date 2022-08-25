<template>
<div class="navbar-position">
    <nav class="navbar navbar-expand-lg navbar-dark bcc">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 txt-c">
          <li class="nav-item box-a">
            <a @click="$router.push({ name: 'home-view' })" class="nav-link active pointer">
              <b>Menu</b>
            </a>
          </li>
          <li class="nav-item box-a">
            <a @click="$router.push({ name: 'data-menu' })" class="nav-link active pointer">
              <b>Datos</b>
            </a>
          </li>
          <li class="nav-item box-a">
            <a @click="$router.push({ name: 'select-register' })" class="nav-link active pointer">
              <b>Administrador</b>
            </a>
          </li>
          <li class="nav-item box-a">
            <a @click="$router.push({ name: 'menu-materials' })" class="nav-link active pointer">
              <b>Materiales</b>
            </a>
          </li>
        </ul>
        <div class="button-wrapper">
          <button class="logout" @click="onLogOut">
          <b>Salir</b>
        </button>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from '../auth/composables/useAuth';
export default {
  setup() {

    const router = useRouter();
    const { logOut } = useAuth();

    return {
      onLogOut: () => {
        router.push({ name: "select-login" });
        logOut();
      },
    }

  }
}
</script>

<style lang="scss" scoped>
.bcc {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);

}

.navbar-position {
  position: fixed;
  width: 100%;
}

.txt-c {
  text-align: center;
}

  nav .navbar-nav li a{
  color: white !important;
    cursor: pointer;
  }

.logout {
  height: 40px;
  width: 120px;
  border: none;
  text-decoration: none;
  background-color: transparent;
  transition: 0.3s;
  border-radius: 4px;
  color: white;

}

.button-wrapper {
  display: flex;
  justify-content: center;
}

</style>