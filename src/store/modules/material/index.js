import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    imageOne: '',
    imageTwo: '',
    //MATERIALES PENDIENTES
    materialsPending: '',
    // TODOS LOS MATERIALES
    allMaterials: '',
    // MATERIALES COMPLETOS
    materialsCompleted: '',
    materialCompletedNeeded: '',
    completedPendiente: '',
    completedImageOne: false,
    completedImageTwo: false,
    // MATERIAL PARA SER USADO, SE BUSCA EL ID PENDIENTE
    materialPendingNeeded: '',
    materialPendingIdStatus: 'CARGANDO',
    pendiente: '',
    pendingImageOne: false,
    pendingImageTwo: false,
};

const getters = {

    // TODAS

    getAllMaterials(state) {

        if (state.allMaterials === '') return '';

        const allMaterials = state.allMaterials;

        const allMaterialsSort = allMaterials.sort((a, b) => {
            return b.pendiente - a.pendiente;
        })

        return allMaterialsSort;
    },
    statusState(state) {
        return state.status;
    },
    
    // COMPLETADAS
    
    getCompletas(state) {
        return state.materialsCompleted;
    },
    getMaterialCompletedNeeded(state) {
        return state.materialCompletedNeeded;
    },
    getMaterialCompletedIdStatus(state) {
        return state.materialCompletedIdStatus;
    },
    getCompletedPendiente(state) {
        return state.completedPendiente;
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
    getImageTwo(state) {
        return state.imageTwo;
    },
    
    // PENDIENTES
    
    getPendientes(state) {
        return state.materialsPending;
    },
    getMaterialPendingNeeded(state) {
        return state.materialPendingNeeded;
    },
    getMaterialPendingIdStatus(state) {
        return state.materialPendingIdStatus;
    },
    getPendiente(state) {
        return state.pendiente;
    },
    getPendingImageOne(state) {
        return state.pendingImageOne;
    },
    getPendingImageTwo(state) {
        return state.pendingImageTwo;
    },
};

const mutations = {

    // GUARDAR Y DISTRIBUIR LOS MATERIALES SEGÚN SU ORDEN

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

        const materialsPending   = materials.filter(x => x.pendiente === 1);
        const materialsCompleted = materials.filter(x => x.pendiente === 0);

        localStorage.setItem('aM', JSON.stringify(materials));

        state.materialsPending   = materialsPending;
        state.materialsCompleted = materialsCompleted;
        state.allMaterials       = materials;
        state.status             = 'RECIBIDOS';
        return;


    },

    // PENDIENTES

    getMaterialPendingById(state, { id }) {

        if (id === null) {
            state.materialPendingNeeded = '';
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

            state.materialPendingNeeded = 'none';
            state.pendiente = 'none';
            state.materialPendingIdStatus = 'RECIBIDO';
            return;
        }

        if (materialPending[0].pendiente === 1) {
            state.pendiente = 'Pendiente';
        } else {
            state.pendiente = 'Completado';
        };
        
        state.imageOne = materialPending[0].image_one;
        state.imageTwo = materialPending[0].image_two;
        state.materialPendingNeeded = materialPending[0];
        state.materialPendingIdStatus = 'RECIBIDO';
        

    },
    updateMaterialD(state, { id }) {
        state.materialsPending = state.materialsPending.filter(x => x.id != id);
    },

    // COMPLETADAS

    getMaterialCompletedById(state, { id }) {

        if (id === null) {
            state.materialPendingNeeded = '';
            return;
        }
        
        if (state.materialsPending === '') {
            return;
        }
        
        if (state.materialsPending.length === 0) {
            return;
        }

        const materialCompleted = state.materialsCompleted.filter(x => x.id == id);

        if (materialCompleted.length === 0) {
            state.materialCompletedNeeded = 'none';
            state.materialCompletedIdStatus = 'RECIBIDO';
            return;
        }

        if (materialCompleted[0].pendiente === 1) {
            state.completedPendiente = 'Pendiente';
        } else {
            state.completedPendiente = 'Completado';
        };

        state.imageOne = materialCompleted[0].image_one;
        state.imageTwo = materialCompleted[0].image_two;
        state.materialCompletedNeeded = materialCompleted[0];
        state.materialCompletedIdStatus = 'RECIBIDO';
        
    },
    changeImageOne(state, { onImageOne }) {

        state.completedImageOne = onImageOne

    },
    changeImageTwo(state, { onImageTwo }) {

        
        state.completedImageTwo = onImageTwo


    },
    deleteForumM(state, { id }) {

        state.materialsPending = state.materialsPending.filter(u => u.uid !== id)

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
    async getMaterialPending({ commit }, id) {
        commit('getMaterialPendingById', { id });
        return { ok: true };
    },
    async getMaterialCompleted({ commit }, id) {
        commit('getMaterialCompletedById', { id });
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