import { ref } from "vue";
import { read, utils, writeFile } from "xlsx";

const createFiles = () => {

  const ok = ref(false);

  const excelTemplateUsers = () => {
    let workbook = utils.book_new();

    let name = "USUARIOS";

    let ExampleDataToUseInExcel = [
      {
        NOMBRES: "OSCAR ROLANDO",
        APELLIDOS: "PALACIOS SERRAT",
        EMAIL: "PENDIENTE",
        RUT: "13674111-k",
        DIVISION: "ANDINA",
        CARGO: "OPERADOR LOGISTICO",
      },
      {
        NOMBRES: "PABLO EMILIO",
        APELLIDOS: "YAEGER LATORRE",
        EMAIL: "PENDIENTE",
        RUT: "17971650-k",
        DIVISION: "ANDINA",
        CARGO: "OPERADOR LOGISTICO",
      },
      {
        NOMBRES: "JUAN MANUEL",
        APELLIDOS: "AGUILERA PORRAS",
        EMAIL: "PENDIENTE",
        RUT: "11517358-8",
        DIVISION: "ANDINA",
        CARGO: "OPERADOR LOGISTICO",
      },
    ];

    let objectMaxLength = [];

    for (let i = 0; i < ExampleDataToUseInExcel.length; i++) {
      let value = Object.values(ExampleDataToUseInExcel[i]);
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

    let worksheet = utils.json_to_sheet(ExampleDataToUseInExcel);

    worksheet["!cols"] = wscols;

    utils.book_append_sheet(workbook, worksheet, name);

    let fileName = "plantilla_carga_usuarios.xlsx";

    writeFile(workbook, fileName);

    ok.value = true;

    return { ok };
  };

  const excelTemplateDestinations = () => {

    let workbook = utils.book_new();

    let name = "DESTINOS";

    

    return { ok };
  }

  return {
    excelTemplateUsers,
    excelTemplateDestinations,
    ok,
  };
};

export default createFiles;
