import { computed, ref } from "vue";
import { useStore } from "vuex";

const getTerm = (term) => {
  const store = useStore();

  //DESTINOS
  const destinations = ref("");
  const showDestinations = ref(false);

  const destinationTerm = (term = "") => {
    const resp = computed(() =>
      store.getters["destinations/getDestinationsByTerm"](term)
    );

    destinations.value = resp.value;

    if (destinations.value.length > 0) {
      showDestinations.value = true;
    }

    return;
  };

  destinationTerm(term);

  //USUARIOS
  const users = ref("");
  const showUsers = ref(false);

  const userTerm = (term = "") => {
    const resp = computed(() =>
      store.getters["users/getUserByTerm"](term)
    );

    users.value = resp.value;

    if (users.value.length > 0) {
      showUsers.value = true;
    }

    return;
  };

  userTerm(term);

  //DIVISIONES
  const divisions = ref("");
  const showDivisions = ref(false);

  const divisionTerm = (term = "") => {
    const resp = computed(() =>
      store.getters["divisions/getDivisionsByTerm"](term)
    );

    divisions.value = resp.value;

    if (divisions.value.length > 0) {
      showDivisions.value = true;
    }

    return;
  };

  divisionTerm(term);

  return {
    //DESTINOS

    destinations,
    showDestinations,
    destinationTerm,
    getStatusDestination: computed(
      () => store.getters["destinations/getStatus"]
    ),
    destinationUpdate: computed(
      () => store.getters["destinations/getUpdateDestination"]
    ),
    destinationById: computed(
      () => store.getters["destinations/changeDestinationId"]
    ),
    destinationIdStatus: computed(
      () => store.getters["destinations/getDestinationIdStatus"]
    ),

    //USUARIOS

    users,
    showUsers,
    userTerm,
    getStatusUser: computed(() => store.getters["users/getStatus"]),
    userUpdate: computed(
      () => store.getters["users/getUpdateUser"]
    ),
    userById: computed(() => store.getters["users/changeUserId"]),
    userIdStatus: computed(
      () => store.getters["users/getUserIdStatus"]
    ),

    //DIVISIONES

    divisions,
    showDivisions,
    divisionTerm,
    getStatusDivision: computed(() => store.getters["divisions/getStatus"]),
    divisionUpdate: computed(
      () => store.getters["divisions/getUpdateDivision"]
    ),
    divisionById: computed(() => store.getters["divisions/changeDivisionId"]),
    divisionIdStatus: computed(
      () => store.getters["divisions/getDivisionIdStatus"]
    ),
  };
};

export default getTerm;
