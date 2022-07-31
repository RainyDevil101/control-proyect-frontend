import backendConnect from "../../../api/backend";

const state = {
  status: "AUTHENTICATING",
  user: "null",
  token: null,
};

const getters = {
  currentState(state) {
    return state.status;
  },
  getUser(state) {
    return state.user;
  },
  getUserDivision(state) {
    return state.user[0].users_divisions;
  }
};

const mutations = {
  loginUser(state, { user, token }) {
    if (token) {
      localStorage.setItem("token", token);
      state.token = token;
    }

    state.user = user;
    state.status = "authenticated";
  },
  logOut(state) {
      state.user = null,
      state.token = null,
      state.status = "AUTHENTICATING",
      localStorage.removeItem("token");
      localStorage.removeItem('mP');
      localStorage.removeItem('mC');
      localStorage.removeItem('aDi');
  },
};

const actions = {
  async signInUser({ commit }, user) {
    const { rut, passwordT } = user;

    try {
      const { data } = await backendConnect.post("/api/auth/login", {
        rut,
        passwordT,
      });

      const { user, token } = data;

      delete user[0].password;

      commit("loginUser", { user, token });

      return { ok: true };
    } catch (errors) {

      return { ok: false };
    }
  },
  async readToken({ commit }) {
    if (!localStorage.getItem("token")) {
      commit("logOut");
      commit("materials/logOut", null, { root: true });
      commit("destinations/logOut", null, { root: true });
      commit("users/logOut", null, { root: true });
      commit("locations/logOut", null, { root: true });
      return { ok: false, message: "No hay token" };
    }

    try {
      const { data } = await backendConnect.get("/api/auth", {
        headers: { "x-token": localStorage.getItem("token") },
      });
      const { user, token } = data;

      commit("loginUser", { user, token });
      return { ok: true, user };
    } catch (error) {
      commit("logOut");
      return { ok: false };
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
