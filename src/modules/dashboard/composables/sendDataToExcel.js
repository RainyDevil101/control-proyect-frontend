import { ref } from "vue";
import backendConnect from "@/api/backend";

const sendData = () => {

  const errors = ref(true);
  const excel = ref(null);
  const nice = ref(false);
  const file = ref(null);

  const postData = async (category, dataToGenerateExcel, dates) => {

      if (dataToGenerateExcel === null) {
        errors.value = 'No hay datos para realizar un reporte';
        excel.value = null;
        nice.value = false;
        return { errors, excel, nice};
      } else if (dates.initDate === '' || dates.finDate === '') {
        errors.value = 'Debe ingresar un rango de fechas'
        excel.value = null;
        nice.value = false;
        return { errors, excel, nice };
      }

    try {
      const { data } = await backendConnect.post(
        "/api/dataExcel/generateExcel",
        { category, dataToGenerateExcel, dates },
        { headers: { "x-token": localStorage.getItem("token") } }
      );

      console.log(data);

       errors.value = false;
       excel.value = data.fileName;
       nice.value = true;

    } catch (error) {
        console.error(error);
    }
  };

  const getFile = async (fileName) => {

    if (!fileName) return;

    try {
      const { data } = await backendConnect.get(
        "/api/dataExcel/downloadExcel",
        { fileName },
        { headers: { "x-token": localStorage.getItem("token") } }
      );

      console.log(data);

       file.value = data;

    } catch (error) {
        console.error(error);
    }
  };

  return {
    postData,
    getFile,
    errors,
    excel,
    nice,
    file,
  };
};

export default sendData;
