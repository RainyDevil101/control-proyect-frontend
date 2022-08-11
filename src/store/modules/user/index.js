import backendConnect from "../../../api/backend";

const state = {
  status: "CARGANDO",
  users: "",
  // POR ID
  changeUserId: "",
  userNeeded: "",
  userIdStatus: "CARGANDO",
  updateUser: false,
  userUpdated: "",
};

const getters = {
  // TODAS

  getUserByTerm:
    (state) =>
    (term = "") => {
      if (term.length === 0) return state.users;

      return state.users.filter((user) =>
        user.fullname.toLowerCase().includes(term.toLocaleLowerCase()) || user.fulllastname.toLowerCase().includes(term.toLocaleLowerCase())
      );
    },
  getStatus(state) {
    return state.status;
  },
  getUserNeeded(state) {
    return state.userNeeded;
  },
  getUserIdStatus(state) {
    return state.userIdStatus;
  },
  getUpdateUser(state) {
    return state.updateUser;
  },
  changeUserId(state) {
    if (!state.changeUserId) {
      return;
    }
    const userIdToChange = state.changeUserId.id;

    const userToChange = state.changeUserId;

    return { userIdToChange, userToChange };
  },
};

const mutations = {
  // GUARDAR Y DISTRIBUIR LOS USUARIOS SEGÚN SU ORDEN

  saveUsers(state, { users }) {
    state.status = "CARGANDO";

    if (!users) return;

    if (users.length === 0) {
      state.users = "";
      state.status = "RECIBIDOS";
      return;
    }

    localStorage.removeItem("aU");

    localStorage.setItem("aU", JSON.stringify(users));

    state.users = users;
    state.status = "RECIBIDOS";
    return;
  },

  // OBTENIENDO EL USUARIO POR EL ID

  getUserById(state, { id }) {
    state.userIdStatus = "CARGANDO";
    
    if (id === null) {
      state.users = "";
      return;
    }

    if (state.users === "") {
      return;
    }

    if (state.users.length === 0) {
      return;
    }


    const userId = state.users.filter((x) => x.id == id);

    if (userId.length === 0) {
      state.userNeeded = "none";
      state.userIdStatus = "RECIBIDO";
      return;
    }

    state.userNeeded = userId[0];
    state.userIdStatus = "RECIBIDO";
  },
  changeUser(state, { onUpdate }) {
    state.updateUser = onUpdate;
  },
  changeUserId(state, { id }) {
    if (!id) {
      return;
    }

    if (id === "") {
      return;
    }

    if (id.length === 0) {
      return;
    }

    if (state.users === "") {
      return;
    }

    const idFilter = id.id;

    const getUserById = state.users.filter(
      (x) => x.id == idFilter
    );

    state.changeUserId = getUserById[0];
  },
  logOut(state) {
  state.status = "CARGANDO",
  state.users = "",
  state.changeUserId = "",
  state.userNeeded = "",
  state.userIdStatus = "CARGANDO",
  state.updateUser = false,
  state.userUpdated = "",
      localStorage.removeItem("aU");
  },
};

const actions = {
  // OBTENER LA CARGA DE USUARIOS

  async loadUsers({ commit }) {
    try {
      const { data } = await backendConnect.get("/api/user/", {
        headers: { "x-token": localStorage.getItem("token") },
      });

      if (!data) {
        commit("saveUsers", []);
        return;
      }

      const { users } = data;

      commit("saveUsers", { users });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.response.data.errors };
    }
  },

  // CAMBIAR NOMBRE A UN USUARIO

  async getUserById({ commit }, id) {
    commit("getUserById", { id });
    return { ok: true };
  },
  async renoveUsers({ commit }, users) {
    if (!users) return;
    commit("saveUsers", { users });
    return { ok: true };
  },
  async changeUserUpdate({ commit }, onUpdate) {
    commit("changeUser", { onUpdate });
    return { ok: true };
  },
  async changeUserId({ commit }, id) {
    commit("changeUserId", { id });
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
