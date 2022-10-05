import backendConnect from '../../../api/backend';
import convertDate from '@/helpers/convertDate';
import { DateTime } from "luxon";

const state = {
    status: 'CARGANDO',
    statusCharts: 'CARGANDO',
    imageOne: '',
    imageTwo: '',
    //MATERIALES PENDIENTES
    materialsPending: '',
    // TODOS LOS MATERIALES
    allMaterials: '',
    // MATERIALES COMPLETOS, SE BUSCA EL ID
    materialsCompleted: '',
    materialCompletedNeeded: '',
    materialCompletedNeededDate: '',
    materialCompletedNeededHour: '',
    materialCompletedNeededOutDate: '',
    materialCompletedNeededOutHour: '',
    materialCompletedIdStatus: 'CARGANDO',
    completedPendiente: '',
    completedImageOne: false,
    completedImageTwo: false,
    // MATERIAL PARA SER USADO, SE BUSCA EL ID PENDIENTE
    materialPendingNeeded: '',
    materialPendingNeededDate: '',
    materialPendingNeededHour: '',
    materialPendingIdStatus: 'CARGANDO',
    pendiente: '',
    pendingImageOne: false,
    pendingImageTwo: false,

    // GRÁFICOS

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
    getMaterialCompletedNeededDate(state) {
        const date = state.materialCompletedNeededDate;
        const hour = state.materialCompletedNeededHour;
        const outDate = state.materialCompletedNeededOutDate;
        const outHour = state.materialCompletedNeededOutHour;
        return { date, hour, outDate, outHour };
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
    getMaterialPendingNeededDate(state) {
        const date = state.materialPendingNeededDate;
        const hour = state.materialPendingNeededHour;
        return { date, hour };
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

    // GRÁFICOS
    gettingData: (state) => (dateFormated) => {

        if(state.allMaterials.length === 0) {
            const allMaterialsFiltered = '';
            return { allMaterialsFiltered };
        }

        if(dateFormated.date_in.finDate.length > 0) {
            let addDay = new Date(dateFormated.date_in.finDate).toISOString();
            let finalDate = DateTime.fromISO(addDay).plus({ hours: 23, minutes: 59}).toISO();
            dateFormated.date_in.finDate = finalDate;
        }

        const getMaterialsByDate = state.allMaterials;

        let filters = {};
        
        for(const keys in dateFormated) {
            
            if( (dateFormated[keys].constructor === Object) || (dateFormated[keys].constructor === String && dateFormated[keys].length > 0) || (dateFormated[keys].constructor === Number)) {
                filters[keys] = dateFormated[keys];
            };
        };
        
        const keysInitFin = [
            'date_in',
        ];
        
        const filteredData = getMaterialsByDate.filter((item) => {
            
            for (const key in filters) {
                if (item[key] === undefined) {
                    return false;
                }
                else if (keysInitFin.includes(key)) {
                    if (filters[key]['initDate'] !== '' && item[key] < filters[key]['initDate']) {
                        return false;
                    }
                    if (filters[key]['finDate'] !== '' && item[key] >= filters[key]['finDate']) {
                        return false;
                    }
                }
                else if (filters[key] !== item[key]) {
                    return false;
                }
            };
            return true
        });
        
        // const allMaterialsFiltered = filteredData;
        const allMaterialsFiltered = filteredData;

        return { allMaterialsFiltered };

    },
    getStatusCharts(state) {
        return state.statusCharts;
    }

};

const mutations = {

    // GUARDAR Y DISTRIBUIR LOS MATERIALES SEGÚN SU ORDEN

    saveMaterials(state, { materials }) {

        state.status = 'CARGANDO';
        state.statusCharts = 'CARGANDO';
        state.imageOne = '';
        state.imageTwo = '';
        state.materialsPending = '';
        state.allMaterials = '';
        state.materialsCompleted = '';
        state.materialCompletedNeeded = '';
        state.materialCompletedNeededDate = '';
        state.materialCompletedNeededHour = '';
        state.materialCompletedNeededOutDate = '';
        state.materialCompletedNeededOutHour = '';
        state.materialCompletedIdStatus = 'CARGANDO';
        state.completedPendiente = '';
        state.completedImageOne = false;
        state.completedImageTwo = false;
        state.materialPendingNeeded = '';
        state.materialPendingNeededDate = '';
        state.materialPendingNeededHour = '';
        state.materialPendingIdStatus = 'CARGANDO';
        state.pendiente = '';
        state.pendingImageOne = false;
        state.pendingImageTwo = false;

        if (!materials) return;
        
        if (materials.length === 0) {
            state.materialsPending   = '';
            state.materialsCompleted = '';
            state.allMaterials       = '';
            state.status             = 'RECIBIDOS';
            return;
        };
        
        localStorage.removeItem('aM');

        const materialsPending   = materials.filter(x => x.pendiente === 1);
        const materialsCompleted = materials.filter(x => x.pendiente === 0);

        localStorage.setItem('aM', JSON.stringify(materials));

        state.materialsPending   = materialsPending;
        state.materialsCompleted = materialsCompleted;
        state.allMaterials       = materials;
        state.status             = 'RECIBIDOS';
        state.statusCharts       = 'RECIBIDOS';
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

        const neededDate = materialPending[0].date_in;

        const { converTime, convertHour } = convertDate(neededDate);

        state.materialPendingNeededHour = convertHour;
        state.materialPendingNeededDate = converTime;
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
            state.materialCompletedNeeded = '';
            return;
        }
        
        if (state.materialsCompleted === '') {
            return;
        }
        
        if (state.materialsCompleted.length === 0) {
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

        const neededDate = materialCompleted[0].date_in;
        const neededOutDate = materialCompleted[0].date_out;

        const getNeededDate = convertDate(neededDate);
        const getNeededOutDate = convertDate(neededOutDate);

        state.materialCompletedNeededHour = getNeededDate.convertHour;
        state.materialCompletedNeededDate = getNeededDate.converTime;
        state.materialCompletedNeededOutHour = getNeededOutDate.convertHour;
        state.materialCompletedNeededOutDate = getNeededOutDate.converTime;
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

        state.status = 'CARGANDO';
        state.statusCharts = 'RECIBIDOS';
        state.imageOne = '';
        state.imageTwo = '';
        //MATERIALES PENDIENTES
        state.materialsPending = '';
        // TODOS LOS MATERIALES
        state.allMaterials = '';
        // MATERIALES COMPLETOS, SE BUSCA EL ID
        state.materialsCompleted = '';
        state.materialCompletedNeeded = '';
        state.materialCompletedNeededDate = '';
        state.materialPendingNeededHour = '';
        state.completedPendiente = '';
        state.completedImageOne = false;
        state.completedImageTwo = false;
        // MATERIAL PARA SER USADO, SE BUSCA EL ID PENDIENTE
        state.materialPendingNeeded = '';
        state.materialPendingNeededDate = '';
        state.materialPendingNeededHour = '';
        state.materialPendingNeededOutDate = '',
        state.materialPendingNeededOutHour = '',
        state.materialPendingIdStatus = 'CARGANDO';
        state.pendiente = '';
        state.pendingImageOne = false;
        state.pendingImageTwo = false;
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