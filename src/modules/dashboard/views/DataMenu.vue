<template>
    <div class="menu">
        <h1>Reportes</h1>
      <div class="body">
        <div class="categories">
          <div @click="$router.push({ name: 'dashboard-view' })" class="buttons-styles">
            <p>Gráficos</p>
          </div>
          <div @click="$router.push({ name: 'get-completed-material' })" class="buttons-styles">
            <p>Finalizados</p>
          </div>
          <div @click="$router.push({ name: 'get-dispatch-material' })" class="buttons-styles">
            <p>Pendientes</p>
          </div>
          <div @click="$router.push({ name: 'home-view' })" class="buttons-styles">
            <p>Volver</p>
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
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.menu h1 {
  text-align: center;
}

.categories {
  padding: 25px;
}

.header {
  color: black;
  padding: 15px;
  text-align: center;
}


.categories-item p {
  margin: 6px 0 6px 0;
  padding: 4px;
}

.back {
  margin: auto;
}

@media screen and (min-width: 768px) {

}

</style>

