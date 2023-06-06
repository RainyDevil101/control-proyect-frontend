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
            <li class="nav-item box-a" v-for="link of links">
              <NavbarItem :link="link" />
            </li>
          </ul>
          <div class="button-wrapper">
            <button :disabled="loading === true" class="logout" @click="onLogOut">
              <b>Salir</b>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useAuth from '../auth/composables/useAuth';
import NavbarItem from './NavbarItem.vue';
import menuLinks from '@/helpers/menuLinks';
export default {
  setup() {

    const router = useRouter()
    const { logOut, userRole } = useAuth();
    const { links } = menuLinks(userRole.value);
    const loading = ref(false);

    const buttonNavbar = ref("button-navbar");
    const buttonNavbarRestringed = ref("button-navbar-restringed");



    return {
      buttonNavbar,
      buttonNavbarRestringed,
      userRole,
      links,
      loading,
      onLogOut: () => {
        loading.value = true;
        router.push({ name: "select-login" });
        loading.value = false;
        logOut();
      },
    };
  },
  components: { NavbarItem }
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