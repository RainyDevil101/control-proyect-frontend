<template>
    <div class="wrapper-home">
        <img src="../../../assets/home-background.jpg" alt="No disponible">
    </div>
</template>

<style lang="scss" scoped>

.wrapper-home {
    height: 100%;
    width: 100%;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
}

img {
  width: 300px;
  display: block;
  margin: auto;
  border: 1px solid white;
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