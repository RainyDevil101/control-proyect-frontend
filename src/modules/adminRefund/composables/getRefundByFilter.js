import { ref } from "vue";
import backendConnect from "../../../api/backend";

const getRefundByFilter = () => {

    const isLoading = ref(false);
    const refunds = ref("");
    const total = ref(null);
    const errorsPost = ref(false);
    const ok = ref(true);

    const getRefunds = async ({ initDate, finDate }) => {

        try {

            isLoading.value = true;
            refunds.value = "";
            total.value = null;

            const { data } = await backendConnect.post(
                "/api/refundByDate",
                { initDate, finDate },
                { headers: { "x-token": localStorage.getItem("token") } })

            refunds.value = data.refunds;
            total.value = data.total[0];
            isLoading.value = false;
            return { errorsPost, ok, refunds, total };

        } catch (error) {
            if (error.response.data.msg) {
                errorsPost.value = error.response.data.msg;
                refunds.value = "";
                ok.value = false;
                isLoading.value = false;
                return { errorsPost, ok, refunds };
            }
            if (error.response.data.errors) {
                const msgErr = [];
                const errorsDB = error.response.data.errors;
                for (const error of errorsDB) {
                    msgErr.push(" " + error.msg);
                }
                errorsPost.value = msgErr;
                refunds.value = "";
                ok.value = false;
                isLoading.value = false;
                return { errorsPost, ok, refunds };
            }
        }
    }

    return {
        isLoading,
        getRefunds,
        refunds,
        total
    };
}

export default getRefundByFilter;