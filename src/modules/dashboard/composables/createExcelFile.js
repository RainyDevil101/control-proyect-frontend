import { ref } from "vue";
import {read, utils, writeFile} from "xlsx";

const createFile = () => {

    const errors = ref(true);
    const excel = ref(null);
    const nice = ref(null);

    const createExcelFile = async (category, dataToGenerateExcel, dates) => {

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
            const name = category;
            const excel = dataToGenerateExcel;
            const { initDate, finDate } = dates;
        
            let objectMaxLength = [];
        
            for (let i = 0; i < excel.length; i++) {
              let value = Object.values(excel[i]);
              for (let j = 0; j < value.length; j++) {
                if (typeof value[j] == "number") {
                  objectMaxLength[j] = 10;
                } else {
                  objectMaxLength[j] =
                    objectMaxLength[j] >= value[j].length
                      ? objectMaxLength[j]
                      : value[j].length;
                };
              };
            };
        
            const wscols = objectMaxLength.map((w) => {
              return { width: w };
            });
        
            const worksheet = utils.json_to_sheet(excel);
        
            worksheet["!cols"] = wscols;
        
            const workbook = utils.book_new();
        
            utils.book_append_sheet(workbook, worksheet, name);
        
            let fileName = `INFORME_${name}_${initDate}_${finDate}.xlsx`;
        
            writeFile(workbook, fileName);

            errors.value = false;
            excel.value = fileName;
            nice.value = true;

        return {errors, excel, nice};

        

          } catch (error) {
            console.log(error);
          }

    };

  
    return {
        createExcelFile,
        errors,
        excel,
        nice,
    };
  };
  
  export default createFile;
  