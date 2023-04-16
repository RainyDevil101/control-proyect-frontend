import backendConnect from "../../../api/backend";

const state = {
  status: "CARGANDO",
  destinations: "",
  // POR ID
  changeDestinationId: "",
  destinationNeeded: "",
  destinationIdStatus: "CARGANDO",
  updateDestination: false,
  destinationUpdated: "",
  total: "",
  numberOfPages: "",
  currentPage: "",
};

const getters = {
  // TODAS

  getDestinationsByTerm:
    (state) =>
    (term = "") => {
      if (term.length === 0) return state.destinations;

      return state.destinations.filter((destination) =>
        destination.nombre.toLowerCase().includes(term.toLocaleLowerCase())
      );
    },
  getStatus(state) {
    return state.status;
  },
  getDestinationNeeded(state) {
    return state.destinationNeeded;
  },
  getDestinationIdStatus(state) {
    return state.destinationIdStatus;
  },
  getUpdateDestination(state) {
    return state.updateDestination;
  },
  getDestinationSelected(state) {
    if (!state.changeDestinationId) {
      return;
    }
    const id = state.changeDestinationId.id;

    return id;
  },
};

const mutations = {
  // GUARDAR Y DISTRIBUIR LOS DESTINOS SEGÚN SU ORDEN

  saveDestinations(state, { destinations, total, numberOfPages, currentPage }) {
    state.status = "CARGANDO";

    if (!destinations || destinations.length === 0) {
      state.destinations = "";
      state.status = "RECIBIDOS";
      return;
    }

    localStorage.removeItem("aD");

    localStorage.setItem("aD", JSON.stringify(destinations));

    state.destinations = destinations;
    state.total = total;
    state.numberOfPages = numberOfPages;
    state.currentPage = currentPage;
    state.status = "RECIBIDOS";
    return;
  },

  // OBTENIENDO EL DESTINO POR EL ID

  getDestinationById(state, { id }) {
    state.destinationIdStatus = "CARGANDO";
    
    if (id === null) {
      state.destinations = "";
      return;
    }

    if (state.destinations === "") {
      return;
    }

    if (state.destinations.length === 0) {
      return;
    }


    const destinationId = state.destinations.filter((x) => x.id == id);

    if (destinationId.length === 0) {
      state.destinationNeeded = "none";
      state.destinationIdStatus = "RECIBIDO";
      return;
    }

    state.destinationNeeded = destinationId[0];
    state.destinationIdStatus = "RECIBIDO";
  },
  changeDestination(state, { onUpdate }) {
    state.updateDestination = onUpdate;
  },
  changeDestinationId(state, { id }) {
    if (!id) {
      return;
    }

    if (id === "") {
      return;
    }

    if (id.length === 0) {
      return;
    }

    if (state.destinations === "") {
      return;
    }

    const idFilter = id.id;

    const getDestinationById = state.destinations.filter(
      (x) => x.id == idFilter
    );

    state.changeDestinationId = getDestinationById[0];
  },
  logOut(state) {
  state.status = "CARGANDO",
  state.destinations = "",
  state.changeDestinationId = "",
  state.destinationNeeded = "",
  state.destinationIdStatus = "CARGANDO",
  state.updateDestination = false,
  state.destinationUpdated = "",
  state.total = "",
  state.numberOfPages = "",
  state.currentPage = "",
      localStorage.removeItem("aD");
  },
};

const actions = {
  // OBTENER LA CARGA DE DESTINOS

  async loadDestinations({ commit }, page = 1) {
    try {
      const { data } = await backendConnect.get(`/api/destination?page=${page}`, {
        headers: { "x-token": localStorage.getItem("token") },
      });

      if (!data || data.length === 0) {
        commit("saveDestinations", []);
        return;
      }

      const { destinations, total, numberOfPages, currentPage } = data;

      commit("saveDestinations", { destinations, total, numberOfPages, currentPage });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.errors };
    }
  },

  // CAMBIAR NOMBRE A UN DESTINO

  async getDestinationById({ commit }, id) {
    commit("getDestinationById", { id });
    return { ok: true };
  },
  async renoveDestinations({ commit }, destinations) {
    if (!destinations) return;
    commit("saveDestinations", { destinations });
    return { ok: true };
  },
  async updateDestination({ commit }, id) {
    commit("updateDestination", { id });
    return { ok: true };
  },
  async changeDestinationUpdate({ commit }, onUpdate) {
    commit("changeDestination", { onUpdate });
    return { ok: true };
  },
  async changeDestinationId({ commit }, id) {
    console.log(id, 2);
    commit("changeDestinationId", { id });
    return { ok: true };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
