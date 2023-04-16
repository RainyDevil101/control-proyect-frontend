import { computed } from "vue";
import { useStore } from "vuex";

const getUsers = () => {

    const store = useStore();
    const currentPage = computed(() => store.getters["users/getCurrentPage"]);

    const numberOfPages = computed(() => store.getters["users/getNumberOfPages"]);
    const total = computed(() => store.getters["users/getTotal"]);

    return {
        users: computed(() => store.getters["users/getUsers"]),
        status: computed(() => store.getters["users/getStatus"]),
        currentPage,
        total,
        numberOfPages,
        nextPage: () => {

            
            let next = currentPage.value + 1;


            if (next > numberOfPages.value) {

                return next = numberOfPages;

            }

            store.dispatch("users/loadUsers", next)
        },
        prevPage: () => {

            let prev = currentPage.value - 1;

            if (prev < 1) {
                return prev = 1;
            }

            store.dispatch("users/loadUsers", prev)
        }
    };
}

export default getUsers;