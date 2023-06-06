import backendConnect from "../../../api/backend";

const state = {
  status: "AUTHENTICATING",
  user: "null",
  token: null,
  pathWanted: false,
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
  },
  getUserId(state) {
    return state.user[0].id;
  },
  getPathWanted(state) {
    return state.pathWanted;
  },
  getUserRole(state) {
    if(state.user === null) {
      return "null"
    } else {
      return state.user[0].role;
    }
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
  savePathState(state, {pathToStore}) {
    if (pathToStore) {
      state.pathWanted = pathToStore;
    } else {
      state.pathWanted = false;
    }
  },
  logOut(state) {
      state.user = null;
      state.token = null;
      state.status = "AUTHENTICATING";
      state.pathWanted = false;
      localStorage.removeItem("token");
      localStorage.removeItem('mP');
      localStorage.removeItem('mC');
      localStorage.removeItem('aDi');
      localStorage.removeItem('aD');
      localStorage.removeItem('aU');
      localStorage.removeItem('aM');
      localStorage.removeItem('aR');
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

      return { ok: true, errors: false };
    } catch (errors) {
      console.log(errors);
      return { ok: false, errors: errors.response.data.errors[0].msg };
    }
  },
  async readToken({ commit }) {
    if (!localStorage.getItem("token")) {
      commit("logOut");
      commit("materials/logOut", null, { root: true });
      commit("destinations/logOut", null, { root: true });
      commit("clients/logOut", null, { root: true });
      commit("users/logOut", null, { root: true });
      commit("places/logOut", null, { root: true });
      commit("refunds/logOut", null, { root: true });
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
  async savePathWanted({ commit }, pathToStore) {

    commit("savePathState", {pathToStore});
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
