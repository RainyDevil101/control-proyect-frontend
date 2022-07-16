import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    //MATERIALES PENDIENTES
    materialsPending: '',
    // TODOS LOS MATERIALES
    allMaterials: '',
    // MATERIALES COMPLETOS
    materialsCompleted: '',
    // MATERIAL PARA SER USADO, SE BUSCA EL ID
    materialNeeded: '',
    materialIdStatus: 'CARGANDO',
    pendiente: '',
};

const getters = {

    getPendientes(state) {
        
        return state.materialsPending;
        
    },
    statusState(state) {
        
        return state.status;
        
    },
    getMaterialNeeded(state) {
        return state.materialNeeded;
    },
    getMaterialIdStatus(state) {
        return state.materialIdStatus;
    },
    getPendiente(state) {
        return state.pendiente;
    }
};

const mutations = {

    saveMaterials(state, { materials }) {

        state.status = 'CARGANDO';

        if (!materials) return;
        
        if (materials.length === 0) {
            state.materialsPending   = '';
            state.materialsCompleted = '';
            state.allMaterials       = '';
            state.status             = 'RECIBIDOS';
            return;
        };
        
        localStorage.removeItem('mP');
        localStorage.removeItem('mC');
        localStorage.removeItem('aM');

        const materialsPending   = materials.filter(pending => pending.date_out === 'PENDIENTE');
        const materialsCompleted = materials.filter(pending => pending.date_out !== 'PENDIENTE');

        localStorage.setItem('aM', JSON.stringify(materials));

        state.materialsPending   = materialsPending;
        state.materialsCompleted = materialsCompleted;
        state.allMaterials       = materials;
        state.status             = 'RECIBIDOS';
        return;


    },
    getMaterialById(state, { id }) {

        if (id === null) {
            state.materialNeeded = '';
            return;
        }
        
        if (state.materialsPending === '') {
            return;
        }
        
        if (state.materialsPending.length === 0) {
            return;
        }
        
        
        const materialPending = state.materialsPending.filter(x => x.id == id);

        if (materialPending.length === 0) {

            state.materialNeeded = 'none';
            state.pendiente = 'none';
            state.materialIdStatus = 'RECIBIDO';

            return

        }

        if (materialPending[0].pendiente === 1) {
            state.pendiente = 'Pendiente';
        } else {
            state.pendiente = 'Completado';
        };
        
        state.materialNeeded = materialPending[0];
        state.materialIdStatus = 'RECIBIDO';

    },
    deleteForumM(state, { id }) {

        state.materialsPending = state.materialsPending.filter(u => u.uid !== id)

    },
    updateMaterialD(state, { id }) {


        state.materialsPending = state.materialsPending.filter(x => x.id != id);

    },
    logOut(state) {

        state.status = 'CARGANDO',
        state.materialsPending = '',
        localStorage.removeItem('aM');
        localStorage.removeItem('token');

    },
}

const actions = {

    async loadMaterials({ commit }) {

        try {
            const { data } = await backendConnect.get('/api/material/', { headers: { 'x-token': localStorage.getItem('token') } });


            if (!data) {
                commit('saveAllMaterials', []);
                commit('saveMaterials', []);
                return;
            };
            
            const { materials } = data;

            commit('saveMaterials', { materials });

            return { ok: true };

        } catch (error) {
            return { ok: false, message: error.response.data.errors };
        };

    },
    async deleteMaterial({ commit }, id) {

        commit('deleteMaterialM', { id });

        return { ok: true };

    },
    async getMaterial({ commit }, id) {
        commit('getMaterialById', { id });
        return { ok: true };
    },
    async renoveMaterials({ commit }, materials) {
        if (!materials) return;
        commit('saveMaterials', { materials });
        return { ok: true };
    },
    async updateMaterial({ commit }, id) {

        commit('updateMaterialD', { id });

        return { ok: true};

    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};