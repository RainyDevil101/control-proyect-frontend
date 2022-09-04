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
            <button :disabled="loading === true" @click="onMenu" class="button-navbar">
              <b>Menu</b>
            </button>
          </li>
          <li class="nav-item box-a">
            <button :disabled="loading === true" @click="onDatamenu" class="button-navbar">
              <b>Reportes</b>
            </button>
          </li>
          <li class="nav-item box-a">
            <button :disabled="loading === true" @click="onAdministration" class="button-navbar">
              <b>Administrador</b>
            </button>
          </li>
          <li class="nav-item box-a">
            <button :disabled="loading === true" @click="onMaterials" class="button-navbar">
              <b>Ingreso de Materiales</b>
            </button>
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
import { ref } from 'vue';
export default {
  setup() {

    const router = useRouter();
    const { logOut } = useAuth();

    const loading = ref(false);

    return {
      loading,


      onLogOut: () => {
        loading.value = true;
        router.push({ name: "select-login" });
        logOut();
      },
      onMenu: () => {
        loading.value = true;
        router.push({ name: 'home-view' });
      },
      onDatamenu: () => {
        loading.value = true;
        router.push({ name: 'data-menu' });
      },
      onAdministration: () => {
        loading.value = true;
        router.push({ name: 'select-register' });
      },
      onMaterials: () => {
        loading.value = true;
        router.push({ name: 'menu-materials' });
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

.button-navbar {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  color: white;
  border: none;
}

</style>