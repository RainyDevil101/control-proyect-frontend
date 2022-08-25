<template>
  <div class="no-data-wrapper">
    <div class="data">
      <p>NO HAY DATOS</p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

p {
    margin: 0;
    padding: 0;
}
.no-data-wrapper {
    background-color: white;
    width: 100%;
    max-width: 1200px;
    min-width: 300px;
    overflow: auto;
    border-radius: 4px;
}

.no-data-wrapper .data {
  display: block;
  margin: auto;
}

.no-data-wrapper .data p {
    text-align: center;
}
</style>