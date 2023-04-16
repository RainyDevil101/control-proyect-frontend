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
            <button :disabled="loading === true" @click="onDatamenu" :class="[userRole === 'PLANNER_ROLE' || userRole === 'ADMIN_ROLE' ? buttonNavbar : buttonNavbarRestringed]">
              <b>Reportes</b>
            </button>
          </li>
          <li class="nav-item box-a">
            <button :disabled="loading === true" @click="onAdministration" :class="[userRole === 'ADMIN_ROLE' ? buttonNavbar : buttonNavbarRestringed]">
              <b>Administrador</b>
            </button>
          </li>
          <li class="nav-item box-a">
            <button :disabled="loading === true" @click="onMaterials" :class="[userRole === 'PLANNER_ROLE' || userRole === 'OPERATOR_ROLE' || userRole === 'ADMIN_ROLE' ? buttonNavbar : buttonNavbarRestringed]">
              <b>Ingreso de Materiales</b>
            </button>
          </li>
          <li class="nav-item box-a">
            <button :disabled="loading === true" @click="onOperatorRefund" :class="[userRole === 'OPERATOR_ROLE' ? buttonNavbar : buttonNavbarRestringed]">
              <b>Registrar Devolución Concentrador</b>
            </button>
          </li>
          <li class="nav-item box-a">
            <button :disabled="loading === true" @click="onRefund" :class="[userRole === 'REFUNDER_ROLE' ? buttonNavbar : buttonNavbarRestringed]">
              <b>Devoluciones</b>
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
    const { logOut, userRole } = useAuth();

    const loading = ref(false);
    const buttonNavbar = ref("button-navbar");
    const buttonNavbarRestringed = ref("button-navbar-restringed");

    return {
      loading,
      buttonNavbar,
      buttonNavbarRestringed,
      userRole,


      onLogOut: () => {
        loading.value = true;
        router.push({ name: "select-login" });
        loading.value = false;
        logOut();
      },
      onMenu: () => {
        loading.value = true;
        router.push({ name: 'home-view' });
        loading.value = false;
      },
      onDatamenu: () => {
        loading.value = true;
        router.push({ name: 'data-menu' });
        loading.value = false;
      },
      onAdministration: () => {
        loading.value = true;
        router.push({ name: 'regist-user' });
        loading.value = false;
      },
      onMaterials: () => {
        loading.value = true;
        router.push({ name: 'menu-materials' });
        loading.value = false;
      },
      onOperatorRefund: () => {
        loading.value = true;
        router.push({ name: 'get-dispatch-refund' });
        loading.value = false;
      },
      onRefund: () => {
        loading.value = true;
        router.push({ name: 'menu-refunds' });
        loading.value = false;
      },
    };
  }
};
</script>

<style lang="scss" scoped>

.bcc {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);

}

.navbar-position {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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

.button-navbar-restringed {
  display: none;
}

.button-navbar {
  border-radius: 4px;
  margin: 0 2px;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  color: white;
  border: none;
}

</style>