import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import backendConnect from '@/api/backend';
import updateImageOne from './updateImageOne';

const updateRefundData = () => {

    const store = useStore();
    const router = useRouter();
    const errors = ref(null);
    const ok = ref(null);
    const msg = ref(null);
    const localImageOne = ref(null);
    const imgOneName = ref(null);
    const imgOne = ref(null);

    const fileImage = ref(null);
    const { onUpdateImageOne } = updateImageOne();

    const onUpdatingRefund = (id = '') => {

        if (!id || id.length === 0) return;
        store.dispatch('refunds/updateRefundData');
        store.dispatch('refunds/refundToUpdateData', id);

        return;
    };

    const onResetUpdate = () => {
        store.dispatch('refunds/resetUpdateRefundData');
        return;
    };

    const onSubmitUpdate = async () => {

        new Swal({
            title: "Actualizando, espere por favor",
            allowOutsideClick: false,
        });
        Swal.showLoading();

        const getRefund = computed(() => store.getters['refunds/getRefundToUpdate']);

        const refundData = getRefund.value;

        if (!refundData || refundData.length === 0 || refundData === null) return;

        const trimmedRefund = {};
        for (let key in refundData) {
            if (typeof refundData[key] === "string") {
                trimmedRefund[key] = refundData[key].trim();
            } else {
                trimmedRefund[key] = refundData[key];
            }
        };

        const { id } = trimmedRefund;

        if (fileImage.value) {
            const imageToDelete = trimmedRefund.image_one;
            const { received, imageUrl } = await onUpdateImageOne(fileImage.value, id);
            received ? (trimmedRefund.imageToDelete = imageToDelete, trimmedRefund.image_one = imageUrl) : '';
        };

        try {

            const { data } = await backendConnect.put(
                `/api/refund/update/${id}`,
                { trimmedRefund },
                { headers: { "x-token": localStorage.getItem("token") } }
            );

            ok.value = data.ok;
            msg.value = data.msg;

            Swal.fire("Registro actualizado").then(function (result) {
                if (true) {
                    router.push({ name: "get-dispatch-refund-admin" });
                }
            })

            return;
        } catch (error) {

            console.log(error);

            ok.value === false

            if (error.response.data.msg) {
                errors.value = error.response.data.msg;
                return;
            };

            if (error.response.data.errors) {
                const msgErr = [];
                const errorsDB = error.response.data.errors;
                for (const error of errorsDB) {
                    msgErr.push(" " + error.msg);
                };
                errors.value = msgErr;
                return;
            };

            Swal.fire("Error", "Intente nuevamente", "error");

            return;
        };
    };

    return {
        onUpdatingRefund,
        onSubmitUpdate,
        errors,
        ok,
        msg,
        localImageOne,
        imgOneName,
        imgOne,
        onResetUpdate,
        fileImage,
        updatingRefund: computed(() => store.getters['refunds/getUpdateRefundBoolean']),
        deletingRefund: computed(() => store.getters['refunds/getDeleteRefundBoolean']),
        refundToUptade: computed(() => store.getters['refunds/getRefundToUpdate']),
        showUpdate: computed(() => store.getters['refunds/getShowUpdate']),
        imageOne: computed(() => store.getters['refunds/getActualImageOne']),
        imageOneCompleted: computed(() => store.getters['refunds/getCompletedImageOne']),
    };
};

export default updateRefundData;