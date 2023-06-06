<template>
    <button :disabled="loading === true" @click="redirectTo" class="button-navbar">
        <b>{{ link.name }}</b>
    </button>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
    props: {
        link: {
            type: Object
        }
    },
    setup(props) {

        const router = useRouter();
        const { link } = props;
        const loading = ref(false);

        const redirectTo = () => {
            loading.value = true;
            router.push({ name: link.to });
            loading.value = false;
        };

        return {
            link,
            redirectTo,
            loading,
        };
    }

};


</script>

<style lang="scss" scoped>

.button-navbar {
  border-radius: 4px;
  margin: 0 2px;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  color: white;
  border: none;
}

</style>