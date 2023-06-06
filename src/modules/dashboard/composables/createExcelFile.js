import { ref } from "vue";
import { DateTime } from "luxon";
import { read, utils, writeFile } from "xlsx";

const createFile = () => {
  const errors = ref(true);
  const excel = ref(null);
  const nice = ref(null);

  const usersExcelErrors = ref(true);
  const usersExcel = ref(null);
  const usersExcelOk = ref(null);

  const usersExcelErrorsCompleted = ref(true);
  const usersExcelCompleted = ref(null);
  const usersExcelOkCompleted = ref(null);

  const createExcelFile = async (category, dataToGenerateExcel, dates) => {

    if (dataToGenerateExcel === null) {
      errors.value = "No hay datos para realizar un reporte";
      excel.value = null;
      nice.value = false;
      return { errors, excel, nice };
    } else if (dates.initDate === "" || dates.finDate === "") {
      errors.value = "Debe ingresar un rango de fechas";
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
          }
        }
      }

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
      errors.value = "Intente nuevamente";
      return { errors, excel, nice };
    }
  };

  const createUsersExcelFile = async (category, pendientes) => {

    if (pendientes === null) {
      usersExcelErrors.value = "No hay datos para realizar un reporte";
      usersExcel.value = null;
      usersExcelOk.value = false;
      return { usersExcelErrors, usersExcel, usersExcelOk };
    } else if (pendientes.length === 0) {
      usersExcelErrors.value = "No hay datos para realizar un reporte";
      usersExcel.value = null;
      usersExcelOk.value = false;
      return { usersExcelErrors, usersExcel, usersExcelOk };
    }

    try {
      const name = category;
      const dataToClean = [];
      
      for(let a of pendientes) {

        let registTime = new Date(a.date_in).toLocaleString();

        dataToClean.push({"Cantidad": a.cantidad, "Cantidad_de_bultos": a.cantidad_bultos, "Código": a.code, "Creado_por_usuario": a.created_by_name + " " + a.created_by_lastname, "Fecha_de_registro": registTime, "id_de_destino": a.destination_id, "destino": a.destination_name, "Número_de_transporte": a.transport_number, "Ubicación": a.ubication});
      }
      
      let objectMaxLength = [];
      const excel = dataToClean;
      
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
          }
        }
      }

      const wscols = objectMaxLength.map((w) => {
        return { width: w };
      });

      const worksheet = utils.json_to_sheet(excel);

      worksheet["!cols"] = wscols;

      const workbook = utils.book_new();

      utils.book_append_sheet(workbook, worksheet, name);

      let fileName = `INFORME_${name}.xlsx`;

      writeFile(workbook, fileName);

      usersExcelErrors.value = false;
      usersExcel.value = fileName;
      usersExcelOk.value = true;

      return { usersExcelErrors, usersExcel, usersExcelOk };
    } catch (error) {
      usersExcelErrors.value = "Intente nuevamente";
      return { usersExcelErrors, usersExcel, usersExcelOk };
    }
  };

  const createUsersCompletedExcelFile = async (category, completas) => {

    if (completas === null) {
      usersExcelErrorsCompleted.value = "No hay datos para realizar un reporte";
      usersExcelCompleted.value = null;
      usersExcelOkCompleted.value = false;
      return { usersExcelErrorsCompleted, usersExcelCompleted, usersExcelOkCompleted };
    } else if (completas.length === 0) {
      usersExcelErrorsCompleted.value = "No hay datos para realizar un reporte";
      usersExcelCompleted.value = null;
      usersExcelOkCompleted.value = false;
      return { usersExcelErrorsCompleted, usersExcelCompleted, usersExcelOkCompleted };
    }

    try {
      const name = category;
      const dataToClean = [];
      
      for(let a of completas) {

        let registTime = new Date(a.date_in).toLocaleString();
        let dispatchTime = new Date(a.date_out).toLocaleString();

        dataToClean.push({"Cantidad": a.cantidad, "Cantidad_de_bultos": a.cantidad_bultos, "Código": a.code, "Creado_por_usuario": a.created_by_name + " " + a.created_by_lastname, "Fecha_de_registro": registTime, "Despachado_por": a.despatched_by_name + " " + a.despatched_by_lastname, "Fecha_de_despacho": dispatchTime, "id_de_destino": a.destination_id, "destino": a.destination_name, "Número_de_transporte": a.transport_number, "Número_de_transporte_despacho": a.transport_number_two, "Ubicación": a.ubication});
      }
      
      let objectMaxLength = [];
      const excel = dataToClean;
      
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
          }
        }
      }

      const wscols = objectMaxLength.map((w) => {
        return { width: w };
      });

      const worksheet = utils.json_to_sheet(excel);

      worksheet["!cols"] = wscols;

      const workbook = utils.book_new();

      utils.book_append_sheet(workbook, worksheet, name);

      let fileName = `INFORME_${name}.xlsx`;

      writeFile(workbook, fileName);

      usersExcelErrorsCompleted.value = false;
      usersExcelCompleted.value = fileName;
      usersExcelOkCompleted.value = true;

      return { usersExcelErrorsCompleted, usersExcelCompleted, usersExcelOkCompleted };
    } catch (error) {
      usersExcelErrorsCompleted.value = "Intente nuevamente";
      return { usersExcelErrorsCompleted, usersExcelCompleted, usersExcelOkCompleted };
    }
  };

  return {
    createExcelFile,
    errors,
    excel,
    nice,

    createUsersExcelFile,
    usersExcelErrors,
    usersExcel,
    usersExcelOk,

    createUsersCompletedExcelFile,
    usersExcelErrorsCompleted,
    usersExcelCompleted,
    usersExcelOkCompleted,
  };
};

export default createFile;
