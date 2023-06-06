import backendConnect from '@/api/backend';

const deleteRefund = async (id) => {

    if (!id || id.length === 0) return;

    try {

        const { data } = await backendConnect.delete(`/api/refund/${id}`, { headers: { 'x-token': localStorage.getItem('token') } });

        return {
            ok: true,
            errorMessage: null,
        };

    } catch (error) {

        return {
            ok: false,
            errorMessage: error.response.data.msg,
        };
    };

};

export default deleteRefund;