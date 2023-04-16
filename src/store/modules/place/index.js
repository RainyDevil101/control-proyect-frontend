import backendConnect from "../../../api/backend";

const state = {
  status: "CARGANDO",
  dispatchPlaces: "",
  // POR ID
  changeDispatchPlaceId: "",
  dispatchPlaceNeeded: "",
  statusDispatchPlaceSelected: "CARGANDO",
  updateDispatchPlace: false,
  dispatchPlaceUpdated: "",
  total: "",
  numberOfPages: "",
  currentPage: "",
};

const getters = {
  // TODAS
  getDispatchPlacesByTerm: (state) => (term = "") => {
        if (term.length === 0 || !term) return state.dispatchPlaces;

        return state.dispatchPlaces.filter((dispatchPlace) =>
          dispatchPlace.place.toLowerCase().includes(term.toLowerCase())
        );
      },
  getStatus(state) {
    return state.status;
  },
  getDispatchPlaceNeeded(state) {
    return state.dispatchPlaceNeeded;
  },
  getStatusDispatchPlaceNeeded(state) {
    return state.statusDispatchPlaceSelected;
  },
  getUpdateDispatchPlace(state) {
    return state.updateDispatchPlace;
  },
  getDispatchPlaceSelected(state) {
    if (!state.changeDispatchPlaceId || state.changeDispatchPlaceId.length === 0) {
      return;
    }
    const dispatchPlaceToUpdateId = state.changeDispatchPlaceId.id;

    return dispatchPlaceToUpdateId;
  },
  getCurrentPage(state) {
    return state.currentPage;
  },
  getNumberOfPages(state) {
    return state.numberOfPages;
  }
};

const mutations = {

  // GUARDAR Y DISTRIBUIR LOS LUGARES DE DESPACHO SEGÚN SU ORDEN

  saveDispatchPlaces(state, { dispatchPlaces, total, numberOfPages, currentPage }) {
    state.status = "CARGANDO";

    if (!dispatchPlaces || dispatchPlaces.length === 0) {
      state.dispatchPlaces = "";
      state.status = "RECIBIDOS";
      return;
    }

    localStorage.removeItem("aPlaces");

    localStorage.setItem("aPlaces", JSON.stringify(dispatchPlaces));


    state.dispatchPlaces = dispatchPlaces;
    state.total = total;
    state.numberOfPages = numberOfPages;
    state.currentPage = currentPage;
    state.status = "RECIBIDOS";

  },

  // OBTENIENDO EL LUGAR DE DESPACHO POR EL ID

  gettingDispatchDispatchPlaceById(state, { id }) {
    state.statusDispatchPlaceSelected = "CARGANDO";

    if (id === null || !state.dispatchPlaces || state.dispatchPlaces.length === 0) {
      return;
    }

    const dispatchPlaceId = state.dispatchPlaces.filter((x) => x.id == id);

    if (dispatchPlaceId.length === 0) {
      state.dispatchPlaceNeeded = "none";
      state.statusDispatchPlaceSelected = "RECIBIDO";
      return;
    }

    state.dispatchPlaceNeeded = dispatchPlaceId[0];
    state.statusDispatchPlaceSelected = "RECIBIDO";
  },
  changeDispatchPlace(state, { onUpdate }) {
    state.updateDispatchPlace = onUpdate;
  },
  changeDispatchPlaceId(state, { id }) {
    if (!id || id.length === 0 || state.dispatchPlaces.length === 0 || !state.dispatchPlaces) {
      return;
    }

    const idFilter = id.id;

    const gettingDispatchDispatchPlaceById = state.dispatchPlaces.filter(
      (x) => x.id == idFilter
    );

    state.changeDispatchPlaceId = gettingDispatchDispatchPlaceById[0];
  },
  logOut(state) {
    state.status = "CARGANDO",
      state.dispatchPlaces = "",
      state.changeDispatchPlaceId = "",
      state.dispatchPlaceNeeded = "",
      state.statusDispatchPlaceSelected = "CARGANDO",
      state.updateDispatchPlace = false,
      state.dispatchPlaceUpdated = "",
      state.total = "",
      state.numberOfPages = "",
      state.currentPage = "",
      localStorage.removeItem("aPlaces");
  },
};

const actions = {
  // OBTENER LA CARGA DE LUGARES DE DESPACHO

  async loadDispatchPlaces({ commit }, page = 1) {

    try {
      const { data } = await backendConnect.get(`/api/place?page=${page}`, {
        headers: { "x-token": localStorage.getItem("token") },
      });

      if (!data || data.length === 0) {
        commit("saveDispatchPlaces", []);
        return;
      }

      const { places: dispatchPlaces, total, numberOfPages, currentPage } = data;

      commit("saveDispatchPlaces", { dispatchPlaces, total, numberOfPages, currentPage });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.errors };
    }
  },

  // CAMBIAR NOMBRE A UN LUGAR DE DESPACHO

  async gettingDispatchDispatchPlaceById({ commit }, id) {
    commit("gettingDispatchDispatchPlaceById", { id });
    return { ok: true };
  },
  async renoveDispatchPlaces({ commit }, dispatchPlaces) {
    if (!dispatchPlaces) return;
    commit("saveDispatchPlaces", { dispatchPlaces });
    return { ok: true };
  },
  async updateDispatchPlace({ commit }, id) {
    commit("dispatchPlaceDispatchPlace", { id });
    return { ok: dispatchPlace }
  },
  async changeDispatchPlaceUpdate({ commit }, onUpdate) {
    commit("changeDispatchPlace", { onUpdate });
    return { ok: true };
  },
  async changeDispatchPlaceId({ commit }, id) {
    console.log(id);
    commit("changeDispatchPlaceId", { id });
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
