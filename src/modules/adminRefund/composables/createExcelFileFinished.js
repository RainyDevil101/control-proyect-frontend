import { ref } from "vue";
import { utils, writeFile } from "xlsx";

const createFileFinished = () => {
  const errors = ref(false);
  const excel = ref(false);
  const nice = ref(false);


  const createExcelFileFinished = async (refundsData, refundStatus = "") => {

    if (refundsData === false || refundsData.length === 0 || refundsData === "" || refundStatus.length === 0) {
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
        "Conductor": r.driverName + " " + r.driverLastname,
        "Fecha de ingreso": new Date(r.date_in).toLocaleString(),
        "Fecha de almacenamiento": (!r.finish_date) ? 'Pendiente' : new Date(r.finish_date).toLocaleString()
      })
    }

    // return;

    try {
      const name = refundStatus;
      const excel = dataRenamed;

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

      let fileName = `INFORME_${refundStatus}.xlsx`;

      writeFile(workbook, fileName);

      errors.value = false;
      excel.value = fileName;
      nice.value = true;

      return { errors, excel, nice };
    } catch (error) {
      errors.value = "Intente nuevamente";
      return { errors, excel, nice };
    }
  };



  return {
    createExcelFileFinished,
    errors,
    excel,
    nice,
  };
};

export default createFileFinished;
