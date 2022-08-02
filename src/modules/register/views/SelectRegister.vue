<template>
  <div class="wrapper">
    <div class="menu">
      <div class="header">
        <h1>Registrar</h1>
      </div>
      <div class="body">
        <div class="categories">
          <div @click="$router.push({ name: 'register-user' })" class="categories-item">
            <p>Usuarios</p>
          </div>
          <div @click="$router.push({ name: 'register-location' })" class="categories-item">
            <p>Ubicación</p>
          </div>
          <div @click="$router.push({ name: 'register-destination' })" class="categories-item">
            <p>Destino</p>
          </div>
        </div>
        <div class="footer">
          <button type="button" @click="$router.push({ name: 'create-material' })" class="btn btn-warning back">
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
  width: 90%;
}

.categories {
  padding: 25px;
}

.header {
  color: #fff;
  padding: 15px;
  text-align: center;
}

.categories-item {
  margin: auto;
  width: 70%;
  cursor: default;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgb(223, 223, 223);
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

