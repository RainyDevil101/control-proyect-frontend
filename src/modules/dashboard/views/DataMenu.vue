<template>
  <div class="wrapper">
    <div class="menu">
      <div class="header">
        <h1>Datos</h1>
      </div>
      <div class="body">
        <div class="categories">
          <div @click="$router.push({ name: 'dashboard-view' })" class="buttons-styles">
            <p>Gráficos</p>
          </div>
          <div @click="$router.push({ name: 'get-completed-material' })" class="buttons-styles">
            <p>Completadas</p>
          </div>
          <div @click="$router.push({ name: 'home-view' })" class="buttons-styles">
            <p>Volver</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup() {

    
    return {
      
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
  display: flex;
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.body {
  margin: auto;
  display: block;
  padding: 0px 0 12px 0;
}

.footer {
  text-align: center;
}

.menu {
  display: block;
  background-color: white;
  border-radius: 4px;
  width: 90%;
}

.categories {
  padding: 25px;
}

.header {
  color: black;
  padding: 15px;
  text-align: center;
}

.buttons-styles {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
  color: white;
  padding: 8px;
  width: 9.8rem;
  margin: 4px auto 4px auto;
  height: 44px;
  border: none;
  cursor: default;
    transition: 0.2s;

  &:hover {
    background-color: rgba($color: #444444, $alpha: 1.0);
  }

}

.categories-item p {
  margin: 6px 0 6px 0;
  padding: 4px;
}

.back {
  margin: auto;
}

@media screen and (min-width: 768px) {
  .menu {
    width: 60%;
  }
}

@media screen and (min-width: 1024px) {
  .menu {
    width: 30%;
  }
}
</style>

