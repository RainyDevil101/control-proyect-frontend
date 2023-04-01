import backendConnect from "../../../api/backend";

const state = {
  status: "CARGANDO",
  clients: "a",
  // POR ID
  clientSelected: "",
  clientNeeded: "",
  statusClientSelected: "CARGANDO",
  updateClient: false,
  clientUpdated: "",
  total: "",
  numberOfPages: "",
  currentPage: "",
};

const getters = {
  // TODAS
  getClientsByTerm: (state) => (term = "") => {
        if (term.length === 0 || !term) return state.clients;

        return state.clients.filter((client) =>
          client.name.toLowerCase().includes(term.toLowerCase())
        );
      },
  getStatus(state) {
    return state.status;
  },
  getClientNeeded(state) {
    return state.clientNeeded;
  },
  getStatusClientNeeded(state) {
    return state.statusClientSelected;
  },
  getUpdateClient(state) {
    return state.updateClient;
  },
  getClientSelected(state) {
    if (!state.clientSelected || state.clientSelected.length === 0) {
      return;
    }
    const clientToUpdateId = state.clientSelected.id;

    const clientToUpdate = state.clientSelected;

    return { clientToUpdateId, clientToUpdate };
  },
  getCurrentPage(state) {
    return state.currentPage;
  },
  getNumberOfPages(state) {
    return state.numberOfPages;
  }
};

const mutations = {

  // GUARDAR Y DISTRIBUIR LOS CLIENTES SEGÚN SU ORDEN

  saveClients(state, { clients, total, numberOfPages, currentPage }) {

    state.status = "CARGANDO";

    if (!clients || clients.length === 0) {
      state.clients = "";
      state.status = "RECIBIDOS";
      return;
    }

    localStorage.removeItem("aClients");

    localStorage.setItem("aClients", JSON.stringify(clients));

    state.clients = clients;
    state.total = total;
    state.numberOfPages = numberOfPages;
    state.currentPage = currentPage;
    state.status = "RECIBIDOS";
  },

  // OBTENIENDO EL CLIENTE POR EL ID

  gettingClientById(state, { id }) {
    state.statusClientSelected = "CARGANDO";

    if (id === null || !state.clients || state.clients.length === 0) {
      return;
    }

    const clientId = state.clients.filter((x) => x.id == id);

    if (clientId.length === 0) {
      state.clientNeeded = "none";
      state.statusClientSelected = "RECIBIDO";
      return;
    }

    state.clientNeeded = clientId[0];
    state.statusClientSelected = "RECIBIDO";
  },
  changeClient(state, { onUpdate }) {
    state.updateClient = onUpdate;
  },
  clientSelected(state, { id }) {
    if (!id || id.length === 0 || state.clients.length === 0 || !state.clients) {
      return;
    }

    const idFilter = id.id;

    const gettingClientById = state.clients.filter(
      (x) => x.id == idFilter
    );

    state.clientSelected = gettingClientById[0];
  },
  logOut(state) {
    state.status = "CARGANDO",
      state.clients = "",
      state.clientSelected = "",
      state.clientNeeded = "",
      state.statusClientSelected = "CARGANDO",
      state.updateClient = false,
      state.clientUpdated = "",
      state.total = "",
      state.numberOfPages = "",
      state.currentPage = "",
      localStorage.removeItem("aClients");
  },
};

const actions = {
  // OBTENER LA CARGA DE CLIENTES

  async loadClients({ commit }, page = 1) {
    try {
      const { data } = await backendConnect.get(`/api/client?page=${page}`, {
        headers: { "x-token": localStorage.getItem("token") },
      });

      console.log(data);

      if (!data || data.length === 0) {
        commit("saveClients", []);
        return;
      }

      const { clients, total, numberOfPages, currentPage } = data;

      commit("saveClients", { clients, total, numberOfPages, currentPage });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.errors };
    }
  },

  // CAMBIAR NOMBRE A UN CLIENTE

  async gettingClientById({ commit }, id) {
    commit("gettingClientById", { id });
    return { ok: true };
  },
  async renoveClients({ commit }, clients) {
    if (!clients) return;
    commit("saveClients", { clients });
    return { ok: true };
  },
  // async updateClient({ commit }, id) {
  //   commit("updateClient", { id });
  //   return { ok: true };
  // },
  async changeClientUpdate({ commit }, onUpdate) {
    commit("changeClient", { onUpdate });
    return { ok: true };
  },
  async clientSelected({ commit }, id) {
    commit("clientSelected", { id });
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
