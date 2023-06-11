import convertDate from "@/helpers/convertDate";
import backendConnect from "../../../api/backend";

const state = {
  status: "CARGANDO",
  imageOne: '',
  actualImageOne: '',
  imageTwo: '',
  // REFUNDS PENDIENTES
  pendingRefunds: '',
  // TODOS LOS REFUNDS
  allRefunds: '',
  // REFUNDS ALMACENADOS, SE BUSCA EL ID
  storedRefunds: '',
  storedRefundNeeded: '',
  storedRefundDateNeeded: '',
  storedRefundHourNeeded: '',
  storedRefundOutDateNeeded: '',
  storedRefundOutHourNeeded: '',
  storedRefundIdStatus: 'CARGANDO',
  pendingStored: '',
  storedImageOne: false,
  storedImageTwo: false,
  // REFUNDS COMPLETOS, SE BUSCA EL ID
  completedRefunds: '',
  completedRefundNeeded: '',
  completedRefundDateNeeded: '',
  completedRefundHourNeeded: '',
  completedRefundOutDateNeeded: '',
  completedRefundOutHourNeeded: '',
  completedRefundIdStatus: 'CARGANDO',
  pendingCompleted: '',
  completedImageOne: false,
  completedImageTwo: false,
  // REFUND PARA SER USADO, SE BUSCA EL ID PENDIENTE
  pendingRefundNeeded: '',
  pendingRefundDateNeeded: '',
  pendingRefundHourNeeded: '',
  pendingRefundIdStatus: 'CARGANDO',
  pending: '',
  pendingImageOne: false,
  pendingImageTwo: false,
  // MOSTRAR MODAL
  createClient: false,

  // Actualizar refund
  refundToUpdate: '',
  updateRefundBoolean: false,
  showUpdate: false,
  // Eliminar refund
  deleteRefundBoolean: false,

};

const getters = {

  // TODAS

  getAllRefunds(state) {
    if (state.allRefunds === '') return '';

    const allRefunds = state.allRefunds;

    const allRefundsSort = allRefunds.sort((a, b) => {
      return b.incompleted = a.incompleted;
    })

    return allRefundsSort;
  },
  getCompletedRefundsFiltered: (state) => (filters) => {

    if (filters.length === 0 || filters === '') return state.completedRefunds;

    const getCompleted = state.completedRefunds
    
    if(getCompleted.length === 0) return [];
    
    const completed = getCompleted.filter((refund) => refund.dispatchPlaces_id === filters);

    return completed;
  },

  // ESTADO RECIBIDO

  statusState(state) {
    return state.status;
  },

  // FINALIZADAS

  getCompletas(state) {
    return state.completedRefunds;
  },
  getRefundCompletedNeeded(state) {
    return state.completedRefundNeeded;
  },
  getRefundCompletedNeededDate(state) {
    const date = state.completedRefundDateNeeded;
    const hour = state.completedRefundHourNeeded;
    const outDate = state.completedRefundOutDateNeeded;
    const outHour = state.completedRefundOutHourNeeded;
    
    return { date, hour, outDate, outHour };
  },
  getCompletedRefundIdStatus(state) {
    return state.completedRefundIdStatus;
  },
  getPendingCompleted(state) {
    return state.pendingCompleted;
  },
  getCompletedImageOne(state) {
    return state.completedImageOne;
  },
  getCompletedImageTwo(state) {
    return state.completedImageTwo;
  },
  getImageOne(state) {
    return state.imageOne;
  },
  getActualImageOne(state) {
    return state.actualImageOne;
  },
  getImageTwo(state) {
    return state.imageTwo;
  },

  // PENDIENTES

  getPendientes(state) {
    return state.pendingRefunds;
  },
  getPendientesFiltered: (state) => (filters) => {

    if (filters.length === 0 || filters === '' || !filters) return state.pendingRefunds;

    const getPendings = state.pendingRefunds;

    if (getPendings.length === 0) return [];

    const pendings = getPendings.filter((refund) => refund.dispatchPlaces_id === filters);

    return pendings;
  },
  getPendingRefundNeeded(state) {
    return state.pendingRefundNeeded;
  },
  getPendingRefundDateNeeded(state) {
    const date = state.pendingRefundDateNeeded;
    const hour = state.pendingRefundHourNeeded;
    return { date, hour };
  },
  getPendingRefundIdStatus(state) {
    return state.pendingRefundIdStatus;
  },
  getPending(state) {
    return state.pending;
  },
  getPendingImageOne(state) {
    return state.pendingImageOne;
  },
  getPendingImageTwo(state) {
    return state.pendingImageTwo;
  },
  getCreateClient(state) {
    return state.createClient;
  },

  // ALMACENADAS
  getAlmacenadas(state) {
    return state.storedRefunds;
  },
  getAlmacenadasFiltered: (state) => (filters) => {

    if (filters.length === 0 || filters === '' || !filters) return state.storedRefunds;

    const getAllStored = state.storedRefunds;

    if (getAllStored.length === 0) return [];

    const allStored = getAllStored.filter((refund) => refund.dispatchPlaces_id === filters);

    return allStored ;
  },
  getRefundStoredNeeded(state) {
    return state.storedRefundNeeded;
  },
  getStoredRefundDateNeeded(state) {
    const date = state.storedRefundDateNeeded;
    const hour = state.storedRefundHourNeeded;
    const outDate = state.storedRefundOutDateNeeded;
    const outHour = state.storedRefundOutHourNeeded;

    const refundStoredIdDate = { date, hour, outDate, outHour };

    return refundStoredIdDate;
  },
  getStoredRefundIdStatus(state) {
    return state.storedRefundIdStatus;
  },
  getPendingStored(state) {
    return state.pendingStored;
  },
  getUpdateRefundBoolean(state) {
    return state.updateRefundBoolean;
  },
  getDeleteRefundBoolean(state) {
    return state.deleteRefundBoolean;
  },
  getRefundToUpdate(state) {
    return state.refundToUpdate[0];
  },
  getShowUpdate(state) {
    return state.showUpdate;
  },
};

const mutations = {

  // GUARDAR Y DISTRIBUIR LOS REFUNDS SEGÚN SU ORDEN

  saveRefunds(state, { refunds }) {

    state.status = "CARGANDO";

    state.imageOne = '';
    state.imageTwo = '';

    state.pendingRefunds = '';
    state.allRefunds = '';
    state.storedRefunds = '';

    state.storedRefundNeeded = '';
    state.storedRefundDateNeeded = '';
    state.storedRefundHourNeeded = '';
    state.storedRefundOutDateNeeded = '';
    state.storedRefundOutHourNeeded = '';
    state.storedRefundIdStatus = 'CARGANDO';
    state.pendingStored = '';
    state.storedImageOne = false;
    state.storedImageTwo = false;

    state.completedRefunds = '';
    state.completedRefundNeeded = '';
    state.completedRefundDateNeeded = '';
    state.completedRefundHourNeeded = '';
    state.completedRefundOutDateNeeded = '';
    state.completedRefundOutHourNeeded = '';
    state.completedRefundIdStatus = 'CARGANDO';
    state.pendingCompleted = '';
    state.completedImageOne = false;
    state.completedImageTwo = false;

    state.pendingRefundNeeded = '';
    state.pendingRefundDateNeeded = '';
    state.pendingRefundHourNeeded = '';
    state.pendingRefundIdStatus = 'CARGANDO';
    state.pending = '';
    state.pendingImageOne = false;
    state.pendingImageTwo = false;

    if (!refunds) return;

    if (refunds.length === 0) {

      state.pendingRefunds = '';
      state.refundsStored = '';
      state.completedRefunds = '';
      state.allRefunds = '';
      state.status = null;
      return;
    }

    
    localStorage.removeItem('aR');
    
    const pendingRefunds = refunds.filter(x => x.statusDelivery === 'PENDIENTE');
    const storedRefunds = refunds.filter(x => x.statusDelivery === 'ALMACENADO');
    const completedRefunds = refunds.filter(x => x.statusDelivery === 'FINALIZADO');
    
    localStorage.setItem('aR', JSON.stringify(refunds));

    state.pendingRefunds = pendingRefunds;
    state.storedRefunds = storedRefunds;
    state.completedRefunds = completedRefunds;
    state.allRefunds = refunds;
    state.status = 'RECIBIDOS';

    return;

  },

  // PENDIENTES

  getPendingRefundById(state, { id }) {

    if (id === null) {
      state.pendingRefundNeeded = '';
      return;
    }
    if (state.pendingRefunds === '') {
      return;
    }

    if (state.pendingRefunds.length === 0) {
      return;
    }


    const pendingRefund = state.pendingRefunds.filter(x => x.id == id);

    if (pendingRefund.length === 0) {

      state.pendingRefundNeeded = 'none';
      state.pending = 'none';
      state.pendingRefundIdStatus = 'RECIBIDO';
      return;

    }

    const dateNeeded = pendingRefund[0].date_in;

    const { converTime, convertHour } = convertDate(dateNeeded);

    state.pendingRefundHourNeeded = convertHour;
    state.pendingRefundDateNeeded = converTime;
    state.imageOne = pendingRefund[0].image_one;
    state.imageTwo = pendingRefund[0].image_two;

    state.pending = pendingRefund[0].statusDelivery;
    state.pendingRefundNeeded = pendingRefund[0];
    state.pendingRefundIdStatus = 'RECIBIDO';
  },
  updateRefund(state, { id }) {
    state.pendingRefunds = state.pendingRefunds.filter(x => x.id != id);
    return;
  },

  // STORED

  getStoredRefundById(state, { id }) {

    
    if (id === null) {
      state.storeRefundNeeded = '';
      return;
    }
    if (state.storedRefunds === '') {
      return;
    }
    
    if (state.storedRefunds.length === 0) {
      return;
    }
    
    
    const storedRefund = state.storedRefunds.filter(x => x.id == id);
    
    if (storedRefund.length === 0) {
      
      state.storedRefundNeeded = 'none';
      state.pendingStored = 'none';
      state.storedRefundIdStatus = 'RECIBIDO';
      return;
    }

    if (storedRefund[0].incompleted === 1) {
      state.pendingStored = 'PENDIENTE';
    } else {
      state.pendingStored = 'COMPLETADO';
    };
    
    const neededDate = storedRefund[0].date_in;
    
    const neededOutDate = storedRefund[0].date_out;
    
    const getNeededDate = convertDate(neededDate);
    const getNeededOutDate = convertDate(neededOutDate);
    
    state.storedRefundHourNeeded = getNeededDate.convertHour;
    state.storedRefundDateNeeded = getNeededDate.converTime;
    state.storedRefundOutHourNeeded = getNeededOutDate.convertHour;
    state.storedRefundOutDateNeeded = getNeededOutDate.converTime;
    
    state.imageOne = storedRefund[0].image_one;
    state.imageTwo = storedRefund[0].image_two;
    
    state.pendingStored = storedRefund[0].statusDelivery;
    state.storedRefundNeeded = storedRefund[0];
    state.storedRefundIdStatus = 'RECIBIDO';
    
    return;
  },
  // updateStoredRefund(state, { id }) {
  //   state.storedRefunds = state.storedRefunds.filter(x => x.id != id);
  //   return;
  // },

  // COMPLETADAS

  getCompletedRefundById(state, { id }) {

    if (id === null) {
      state.completedRefundNeeded = '';
      return;
    }

    if (state.completedRefunds === '') {
      return;
    }

    if (state.completedRefunds.length === 0) {
      return;
    }

    const completedRefund = state.completedRefunds.filter(x => x.id == id);

    if (completedRefund.length === 0) {
      state.completedRefundNeeded = 'none';
      state.pendingCompleted = 'none';
      state.completedRefundIdStatus = 'RECIBIDO';
      return;
    }

    if (completedRefund[0].incompleted === 1) {
      state.pendingCompleted = 'PENDIENTE';
    } else {
      state.pendingCompleted = 'COMPLETADO';
    };

    const neededDate = completedRefund[0].date_in;
    const neededOutDate = completedRefund[0].date_out;

    const getNeededDate = convertDate(neededDate);
    const getNeededOutDate = convertDate(neededOutDate);

    state.completedRefundHourNeeded = getNeededDate.convertHour;
    state.completedRefundDateNeeded = getNeededDate.converTime;
    state.completedRefundOutHourNeeded = getNeededOutDate.convertHour;
    state.completedRefundOutDateNeeded = getNeededOutDate.converTime;
    state.imageOne = completedRefund[0].image_one;
    state.imageTwo = completedRefund[0].image_two;
    state.completedRefundNeeded = completedRefund[0];
    state.completedRefundIdStatus = 'RECIBIDO';
    return;
  },
  changeImageOne(state, { onImageOne }) {
    state.completedImageOne = onImageOne;
    return;
  },
  changeImageTwo(state, { onImageTwo }) {
    state.completedImageTwo = onImageTwo;
    return;
  },
  createClient(state, {onUpdate}) {
    state.createClient = onUpdate;
  },
  deleteRefundR(state, { id }) {
    state.pendingRefunds = state.pendingRefunds.filter(r => r.id !== id);
    return;
  },
  dataRefundToUpdate(state, { id }) {
    state.showUpdate === false
    state.refundToUpdate = state.allRefunds.filter(r => r.id == id);
    state.actualImageOne = state.refundToUpdate[0].image_one;
    state.showUpdate === true;
    return;
  },
  resetUpdateRefundData(state) {
    state.updateRefundBoolean = false;
    state.actualImageOne = '';
  },
  updateRefundData(state) {
    state.updateRefundBoolean = !state.updateRefundBoolean;
  },
  deleteRefundData(state) {
    state.deleteRefundBoolean = !state.deleteRefundBoolean;
  },
  logOut(state) {
    state.status = "CARGANDO";

    state.imageOne = '';
    state.actualImageOne = '';
    state.imageTwo = '';

    state.pendingRefunds = '';
    state.allRefunds = '';
    state.storedRefunds = '';
    state.storedRefundNeeded = '';
    state.storedRefundDateNeeded = '';
    state.storedRefundHourNeeded = '';
    state.storedRefundOutDateNeeded = '';
    state.storedRefundOutHourNeeded = '';
    state.storedRefundIdStatus = 'CARGANDO';
    state.storedImageOne = false;
    state.storedImageTwo = false;
    state.storedCompleted = '';
    
    state.completedRefunds = '';
    state.completedRefundNeeded = '';
    state.completedRefundDateNeeded = '';
    state.completedRefundHourNeeded = '';
    state.completedRefundOutDateNeeded = '';
    state.completedRefundOutHourNeeded = '';
    state.completedRefundIdStatus = 'CARGANDO';
    state.pendingCompleted = '';
    
    state.completedImageOne = false;
    state.completedImageTwo = false;
    state.pendingRefundNeeded = '';
    state.pendingRefundDateNeeded = '';
    state.pendingRefundHourNeeded = '';
    state.pendingRefundIdStatus = 'CARGANDO';
    state.pending = '';
    state.pendingImageOne = false;
    state.pendingImageTwo = false;

    state.refundToUpdate = '';
    state.updateRefundBoolean = false;
    state.showUpdate = false;
    state.deleteRefundBoolean = false;

    localStorage.removeItem('aR');
    return;
  }

};

const actions = {

  async loadRefunds({ commit }) {

    state.status = "CARGANDO";
    
    try {

      const { data } = await backendConnect.get('/api/refund/', { headers: { 'x-token': localStorage.getItem('token') } });

      if (!data) {
        commit('saveAllRefunds', []);
        commit('saveRefunds', []);
        return;
      }

      const { refunds } = data;


      commit('saveRefunds', { refunds });

      return { ok: true };

    } catch (error) {
      return { ok: false, message: error.response.data.errors };
    };
  },
  async deleteRefund({ commit }, id) {
    commit('deleteRefundR', { id });
    return { ok: true };
  },
  async getPendingRefund({ commit }, id) {
    commit('getPendingRefundById', { id });
    return { ok: true };
  },
  async getStoredRefund({ commit }, id) {
    commit('getStoredRefundById', { id });
    return { ok: true };
  },
  async getCompletedRefund({ commit }, id) {
    commit('getCompletedRefundById', { id });
    return { ok: true };
  },
  async refundToUpdateData({ commit }, id) {
    commit('dataRefundToUpdate', { id });
    return { ok: true };
  },
  async changeImageOne({ commit }, onImageOne) {
    commit('changeImageOne', { onImageOne })
    return { ok: true }
  },
  async changeImageTwo({ commit }, onImageTwo) {
    commit('changeImageTwo', { onImageTwo })
    return { ok: true }
  },
  async changeCreateClient({ commit }, onUpdate) {
    commit('createClient', { onUpdate })
    return { ok: true }
  },
  async renovateRefunds({ commit }, refunds) {
    if (!refunds) return;
    commit('saveRefunds', { refunds });
    return { ok: true };
  },
  async updateRefundData({ commit }) {
    commit('updateRefundData');
    return { ok: true };
  },
  async resetUpdateRefundData({ commit }) {
    commit('resetUpdateRefundData');
    return { ok: true };
  },
  async deleteRefundData({ commit }) {
    commit('deleteRefundData');
    return { ok: true };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
