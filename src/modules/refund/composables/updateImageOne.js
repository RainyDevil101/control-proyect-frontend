import { ref } from "vue";
import backendConnect from "@/api/backend";

const updateImageOne = () => {

    const onUpdateImageOne = async (file, id) => {

        if (!file || !id || id.length === 0 || id === null) return;

        const formData = new FormData();
        formData.append('file', file);

        try {

            const { data } = await backendConnect.post(
                `/api/refund/updateImage/${id}`,
                formData,
                { headers: { "x-token": localStorage.getItem("token"), "Content-Type": "multipart/form-data" } }
            );

            const { ok, secure_url } = data;

            const received = ok;
            const imageUrl = secure_url;

            return {
                received,
                imageUrl,
            };
        } catch (error) {
            console.log(error);
            // ok.value = error.response.data.ok;

            return {
                received: false,
                imageUrl: null
            };
        }

    };

    return {
        onUpdateImageOne,
    }
};

export default updateImageOne;