import backendConnect from "../../../api/backend";

const state = {
  status: "CARGANDO",
  divisions: "",
  // POR ID
  changeDivisionId: "",
  divisionNeeded: "",
  divisionIdStatus: "CARGANDO",
  updateDivision: false,
  divisionUpdated: "",
};

const getters = {
  // TODAS
  getDivisionsByTerm:
    (state) =>
    (term = "") => {
      if (term.length === 0) return state.divisions;

      return state.divisions.filter((division) =>
        division.name.toLowerCase().includes(term.toLocaleLowerCase())
      );
    },
  getStatus(state) {
    return state.status;
  },
  getDivisionNeeded(state) {
    return state.divisionNeeded;
  },
  getDivisionIdStatus(state) {
    return state.divisionIdStatus;
  },
  getUpdateDivision(state) {
    return state.updateDivision;
  },
  changeDivisionId(state) {
    if (!state.changeDivisionId) {
      return;
    }
    const divisionIdToChange = state.changeDivisionId.id;

    const divisionToChange = state.changeDivisionId;

    return { divisionIdToChange, divisionToChange };
  },
};

const mutations = {
  // GUARDAR Y DISTRIBUIR LAS DIVISIONES SEGÚN SU ORDEN

  saveDivisions(state, { divisions }) {
    state.status = "CARGANDO";

    if (!divisions) return;

    if (divisions.length === 0) {
      state.divisions = "";
      state.status = "RECIBIDOS";
      return;
    }

    localStorage.removeItem("aDi");

    localStorage.setItem("aDi", JSON.stringify(divisions));

    state.divisions = divisions;
    state.status = "RECIBIDOS";
    return;
  },

  // OBTENIENDO LA DIVISIÓN POR EL ID

  getDivisionById(state, { id }) {
    state.divisionIdStatus = "CARGANDO";

    if (id === null) {
      state.divisions = "";
      return;
    }

    if (state.divisions === "") {
      return;
    }

    if (state.divisions.length === 0) {
      return;
    }

    const divisionId = state.divisions.filter((x) => x.id == id);

    if (divisionId.length === 0) {
      state.divisionNeeded = "none";
      state.divisionIdStatus = "RECIBIDO";
      return;
    }

    state.divisionNeeded = divisionId[0];
    state.divisionIdStatus = "RECIBIDO";
  },
  deleteDivision(state, { id }) {
    state.divisions = state.divisions.filter((u) => u.id !== id);
  },
  changeDivision(state, { onUpdate }) {
    state.updateDivision = onUpdate;
  },
  changeDivisionId(state, { id }) {
    if (!id) {
      return;
    }

    if (id === "") {
      return;
    }

    if (id.length === 0) {
      return;
    }

    if (state.divisions === "") {
      return;
    }

    const idFilter = id.id;

    const getDivisionById = state.divisions.filter((x) => x.id == idFilter);

    state.changeDivisionId = getDivisionById[0];
  },
  logOut(state) {
  state.status = "CARGANDO";
  state.divisions = "";
  state.changeDivisionId = "";
  state.divisionNeeded = "";
  state.divisionIdStatus = "CARGANDO";
  state.updateDivision = false;
  state.divisionUpdated = "";
  // localStorage.removeItem("aDi");
  },
};

const actions = {
  // OBTENER LA CARGA DE DIVISIONES

  async loadDivisions({ commit }) {

    try {
      const { data } = await backendConnect.get("/api/division/", {
        headers: { "x-token": localStorage.getItem("token") },
      });

      if (!data) {
        commit("saveDivisions", []);
        return;
      }

      const { divisions } = data;

      commit("saveDivisions", { divisions });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.errors };
    }
  },

  // CAMBIAR NOMBRE A UNA LOCACIÓN

  async getDivisionById({ commit }, id) {
    commit("getDivisionById", { id });
    return { ok: true };
  },
  async renoveDivisions({ commit }, divisions) {
    if (!divisions) return;
    commit("saveDivisions", { divisions });
    return { ok: true };
  },
  async changeDivisionUpdate({ commit }, onUpdate) {
    commit("changeDivision", { onUpdate });
    return { ok: true };
  },
  async changeDivisionId({ commit }, id) {
    commit("changeDivisionId", { id });
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
