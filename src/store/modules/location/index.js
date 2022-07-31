import backendConnect from "../../../api/backend";

const state = {
  status: "CARGANDO",
  locations: "",
  // POR ID
  changeLocationId: "",
  locationNeeded: "",
  locationIdStatus: "CARGANDO",
  updateLocation: false,
  locationUpdated: "",
};

const getters = {
  // TODAS
  getLocationsByTerm:
    (state) =>
    (term = "") => {
      if (term.length === 0) return state.locations;

      return state.locations.filter((location) =>
      location.name.toLowerCase().includes(term.toLocaleLowerCase())
      );
    },
  getStatus(state) {
    return state.status;
  },
  getLocationNeeded(state) {
    return state.locationNeeded;
  },
  getLocationIdStatus(state) {
    return state.locationIdStatus;
  },
  getUpdateLocation(state) {
    return state.updateLocation;
  },
  changeLocationId(state) {
    if (!state.changeLocationId) {
      return;
    }
    const locationIdToChange = state.changeLocationId.id;

    const locationToChange = state.changeLocationId;

    return { locationIdToChange, locationToChange };
  },
};

const mutations = {
  // GUARDAR Y DISTRIBUIR LAS LOCACIONES SEGÚN SU ORDEN

  saveLocations(state, { locations }) {
    state.status = "CARGANDO";

    if (!locations) return;

    if (locations.length === 0) {
      state.locations = "";
      state.status = "RECIBIDOS";
      return;
    }

    localStorage.removeItem("aL");

    localStorage.setItem("aL", JSON.stringify(locations));

    state.locations = locations;
    state.status = "RECIBIDOS";
    return;
  },

  // OBTENIENDO EL DESTINO POR EL ID

  getLocationById(state, { id }) {
    state.locationIdStatus = "CARGANDO";
    
    if (id === null) {
      state.locations = "";
      return;
    }

    if (state.locations === "") {
      return;
    }

    if (state.locations.length === 0) {
      return;
    }


    const locationId = state.locations.filter((x) => x.id == id);

    if (locationId.length === 0) {
      state.locationNeeded = "none";
      state.locationIdStatus = "RECIBIDO";
      return;
    }

    state.locationNeeded = locationId[0];
    state.locationIdStatus = "RECIBIDO";
  },
  deleteLocation(state, { id }) {
    state.locations = state.locations.filter((u) => u.id !== id);
  },
  changeLocation(state, { onUpdate }) {
    state.updateLocation = onUpdate;
  },
  changeLocationId(state, { id }) {
    if (!id) {
      return;
    }

    if (id === "") {
      return;
    }

    if (id.length === 0) {
      return;
    }

    if (state.locations === "") {
      return;
    }

    const idFilter = id.id;

    const getLocationById = state.locations.filter(
      (x) => x.id == idFilter
    );

    state.changeLocationId = getLocationById[0];
  },
  logOut(state) {
  state.status = "CARGANDO",
  state.locations = "",
  state.changeLocationId = "",
  state.locationNeeded = "",
  state.locationIdStatus = "CARGANDO",
  state.updateLocation = false,
  state.locationUpdated = "",
      localStorage.removeItem("aL");
  },
};

const actions = {
  // OBTENER LA CARGA DE DESTINOS

  async loadLocations({ commit }) {

    try {
      const { data } = await backendConnect.get("/api/location/", {
        headers: { "x-token": localStorage.getItem("token") },
      });

      if (!data) {
        commit("saveLocations", []);
        return;
      }

      const { locations } = data;

      commit("saveLocations", { locations });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.errors };
    }
  },

  // CAMBIAR NOMBRE A UNA LOCACIÓN

  async getLocationById({ commit }, id) {
    commit("getLocationById", { id });
    return { ok: true };
  },
  async renoveLocations({ commit }, locations) {
    if (!locations) return;
    commit("saveLocations", { locations });
    return { ok: true };
  },
  async changeLocationUpdate({ commit }, onUpdate) {
    commit("changeLocation", { onUpdate });
    return { ok: true };
  },
  async changeLocationId({ commit }, id) {
    commit("changeLocationId", { id });
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
