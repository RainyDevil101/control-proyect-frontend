<template>
  <div class="wrapper-home">
      <div class="home-title">
        <h1>CONTROL MATERIALES</h1>
      </div>
        <img src="../../../assets/home-background.jpg" alt="No disponible">
    </div>
</template>

<style lang="scss" scoped>

.wrapper-home {
    height: 100%;
    width: 100%;
    min-height: 100vh;
    min-width: 100vw;
    display: block;
}

.home-title {
  text-align: center;
  padding-top: 4rem;
}

.home-title h1 {
  margin: 4rem 0 4rem 0;
}

img {
  width: 300px;
  display: block;
  margin: auto;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

@media (min-width: 768px) {

img {
  width: 550px;
}

}

@media (min-width: 992px) {

img {
  width: 700px;
}

}

</style>