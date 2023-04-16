import { ref } from "vue";
import { DateTime } from "luxon";
import { read, utils, writeFile } from "xlsx";

const createFile = () => {
  const errors = ref(false);
  const excel = ref(false);
  const nice = ref(false);
  

  const createExcelFile = async (refundsData, dates) => {

    if (refundsData === false || refundsData.length === 0 || refundsData === "") {
      errors.value = "No hay datos para exportar";
      return { errors, excel, nice };
    }

    const dataRenamed = [];

    for (const r of refundsData) {

      dataRenamed.push({
        ID: r.id,
        Código: r.code,
        Cantidad: r.quantity,
        "Cantidad de bultos": r.packageQuantity,
        "Ubicación Final": r.possibleUbication,
        "Patente": r.patent,
        "Responsable de almacenamiento": r.fullname + " " + r.fulllastname,
        "Fecha de ingreso": new Date(r.date_in).toLocaleString(),
        "Fecha de almacenamiendo": new Date(r.finish_date).toLocaleString()
      })
    }

    // return;

    try {
      const name = "Despachos finalizados";
      const excel = dataRenamed;
      let { initDate, finDate } = dates;

      if (initDate.length === 0) {
        initDate = "INICIO"
      };
      
      if (finDate.length === 0) {
        finDate = new Date().toLocaleDateString();
      };

      let objectMaxLength = [];

      for (let i = 0; i < excel.length; i++) {
        let value = Object.values(excel[i]);
        for (let j = 0; j < value.length; j++) {
          if (typeof value[j] == "number") {
            objectMaxLength[j] = 20;
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

      return { errors, excel, nice };
    } catch (error) {
      console.log(error);
      errors.value = "Intente nuevamente";
      return { errors, excel, nice };
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
