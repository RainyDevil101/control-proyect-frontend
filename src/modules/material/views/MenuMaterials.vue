<template>
    <div class="menu">
      <h1>Materiales por despachar</h1>
      <div class="buttons-menu">
        <div @click="$router.push({ name: 'create-material' })" class="buttons-styles">
          <p>Ingreso de material</p>
        </div>
        <div @click="$router.push({ name: 'get-material' })" class="buttons-styles">
          <p>Finalizar pendientes</p>
        </div>
        <div @click="$router.push({ name: 'home-view' })" class="buttons-styles">
          <p>Volver</p>
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

.menu {
  display: flex;
  background-color: white;
  border-radius: 4px;
  flex-direction: column;
  text-align: center;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

@media screen and (min-width: 768px) {

}
</style>

