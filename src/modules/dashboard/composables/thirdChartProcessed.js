import { DateTime } from "luxon";

const thirdChartProcessed = (data) => {
  //ARRAY DONDE SE GUARDA EL TIEMPO QUE TARDÓ EL DESPACHO

  let delaysDays = [];
  let delaysData = [];
  let dispatchChart = [];

  let getMonths = [];
  let getDays = [];
  let getHours = [];
  let getMinutes = [];
  let getSeconds = [];
  let getMilliseconds = [];

  let dataToExcelDelays = [];

  let average = [];

  for (let t of data) {

    let registTime = new Date(t.date_in).toLocaleString();
    let despatchTime = new Date(t.date_out).toLocaleString();

    //FECHA DE DESPACHO.
    let end = DateTime.fromISO(t.date_out);
    //FECHA DE REGISTRO.
    let start = DateTime.fromISO(t.date_in);
    //LA DIFERENCIA ENTRE LAS DOS FECHAS SE SEPARA EN MESES, DÍAS, HORAS, MINUTOS Y SEGUNDOS.
    let diff = end.diff(start, [
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ]);
    
    let diffMillisSeconds = end.diff(start);
    
    //SE PASA A OBJECT PARA PODER EXTRAER LOS VALORES.
    let diffMill = diff.toObject();

    let milliseconds = diffMillisSeconds.values.milliseconds;
    
    // let getDiffMillisSeconds = diffMillisSeconds.toObject();
    
    let hoursDelay = diffMillisSeconds.as('hours');
    
    //EXTRACCIÓN DE VALORES.
    let { months, days, hours, minutes, seconds } = diffMill;

    let formatedMonths = Math.floor(months);
    let formatedDays = Math.floor(days);
    let formatedHours = Math.floor(hours);
    let formatedMinutes = Math.floor(minutes);
    let formatedSeconds = Math.floor(seconds);

        
    let name = t.created_by_name;
    let lastname = t.created_by_lastname;

    //SE REALIZA EL PUSH AL ARRAY SEGÚN LOS VALORES.
    if (
      months === 0 &&
      days === 0 &&
      hours === 0 &&
      minutes === 0 &&
      seconds !== 0
    ) {
      let time = `${formatedSeconds} segundos.`;
      delaysData.push(time);
      delaysDays.push(hoursDelay);

        
    dataToExcelDelays.push({id: t.id, 'Fecha de ingreso': registTime, 'Fecha de despacho': despatchTime, Destino: t.destination_name, 'Tiempo de demora': time, 'Registrado por':  `${name} ${lastname}`, 'Despachado por por':  `${name} ${lastname}`});

    } else if (
      months === 0 &&
      days === 0 &&
      hours === 0 &&
      minutes !== 0 &&
      seconds !== 0
    ) {
      let time = `${formatedMinutes} minutos y ${formatedSeconds} segundos.`;
      delaysData.push(
        time
      );
      delaysDays.push(hoursDelay);

        
    dataToExcelDelays.push({id: t.id, 'Fecha de ingreso': registTime, 'Fecha de despacho': despatchTime, Destino: t.destination_name, 'Tiempo de demora': time, 'Registrado por':  `${name} ${lastname}`, 'Despachado por por':  `${name} ${lastname}`});

    } else if (
      months === 0 &&
      days === 0 &&
      hours !== 0 &&
      minutes !== 0 &&
      seconds !== 0
    ) {
      let time = `${formatedHours} horas, ${formatedMinutes} minutos y ${formatedSeconds} segundos.`;
      delaysData.push(
        time
      );
      delaysDays.push(hoursDelay);

        
    dataToExcelDelays.push({id: t.id, 'Fecha de ingreso': registTime, 'Fecha de despacho': despatchTime, Destino: t.destination_name, 'Tiempo de demora': time, 'Registrado por':  `${name} ${lastname}`, 'Despachado por por':  `${name} ${lastname}`});

    } else if (
      months === 0 &&
      days !== 0 &&
      hours !== 0 &&
      minutes !== 0 &&
      seconds !== 0
    ) {
      let time = `${formatedDays} días, ${formatedHours} horas, ${formatedMinutes} minutos y ${formatedSeconds} segundos.`;
      delaysData.push(
        time
      );
      delaysDays.push(hoursDelay);

        
    dataToExcelDelays.push({id: t.id, 'Fecha de ingreso': registTime, 'Fecha de despacho': despatchTime, Destino: t.destination_name, 'Tiempo de demora': time, 'Registrado por':  `${name} ${lastname}`, 'Despachado por por':  `${name} ${lastname}`});

    } else if (
      months !== 0 &&
      days !== 0 &&
      hours !== 0 &&
      minutes !== 0 &&
      seconds !== 0
    ) {
      let time = `${formatedMonths} meses, ${formatedDays} días, ${formatedHours} horas, ${formatedMinutes} minutos y ${formatedSeconds} segundos.`;
      delaysData.push(
        time
      );
      delaysDays.push(hoursDelay);

        
    dataToExcelDelays.push({id: t.id, 'Fecha de ingreso': registTime, 'Fecha de despacho': despatchTime, Destino: t.destination_name, 'Tiempo de demora': time, 'Registrado por':  `${name} ${lastname}`, 'Despachado por por':  `${name} ${lastname}`});


    } else {
      console.error("data corrupted");
    }

    let secondsFromMilli = Math.floor(milliseconds / 1000);
    let minutesFromSeconds = Math.floor(secondsFromMilli / 60);
    let hoursFromMinutes = Math.floor(minutesFromSeconds / 60);

    getMonths.push(months);
    getDays.push(days);
    getHours.push(hoursFromMinutes);
    getMinutes.push(minutes);
    getSeconds.push(seconds);
    getMilliseconds.push(milliseconds);
  }

  let getAverageMonths = Math.floor(getMonths.reduce((a, b) => a + b, 0) / data.length);
  let getAverageDays = Math.floor(getDays.reduce((a, b) => a + b, 0) / data.length);
  let getAverageHours = Math.floor(getHours.reduce((a, b) => a + b, 0) / data.length);
  let getAverageHoursNotFloor = getHours.reduce((a, b) => a + b, 0) / data.length;
  let getAverageMinutes = Math.floor(getMinutes.reduce((a, b) => a + b, 0) / data.length);
  let getAverageSeconds = Math.floor(getSeconds.reduce((a, b) => a + b, 0) / data.length);
  let getAverageMilliseconds = Math.floor(getMilliseconds.reduce((a, b) => a + b, 0) / data.length);

  if (
    getAverageMonths === 0 &&
    getAverageDays === 0 &&
    getAverageHours === 0 &&
    getAverageMinutes === 0 &&
    getAverageSeconds !== 0
  ) {
    average.push(
      `${getAverageSeconds} segundos es el promedio de demora.`,
    );
  } else if (
    getAverageMonths === 0 &&
    getAverageDays === 0 &&
    getAverageHours === 0 &&
    getAverageMinutes !== 0 &&
    getAverageSeconds !== 0
  ) {
    average.push(
      `${getAverageMinutes} minutos y ${getAverageSeconds} segundos es el promedio de demora.`
    );
  } else if (
    getAverageMonths === 0 &&
    getAverageDays === 0 &&
    getAverageHours !== 0 &&
    getAverageMinutes !== 0 &&
    getAverageSeconds !== 0
  ) {
    average.push(
      `${getAverageHours} horas, ${getAverageMinutes} minutos y ${getAverageSeconds} segundos es el promedio de demora.`
    );
  } else if (
    getAverageMonths === 0 &&
    getAverageDays !== 0 &&
    getAverageHours !== 0 &&
    getAverageMinutes !== 0 &&
    getAverageSeconds !== 0
  ) {
    average.push(
      `${getAverageDays} días, ${getAverageHours} horas, ${getAverageMinutes} minutos y ${getAverageSeconds} segundos es el promedio de demora.`
    );
  } else if (
    getAverageMonths !== 0 &&
    getAverageDays !== 0 &&
    getAverageHours !== 0 &&
    getAverageMinutes !== 0 &&
    getAverageSeconds !== 0
  ) {
    average.push(
      `${getAverageMonths} meses, ${getAverageDays} días, ${getAverageHours} horas, ${getAverageMinutes} minutos y ${getAverageSeconds} segundos es el promedio de demora.`
    );
  } else {
    console.error("data corrupted");
  }

  dispatchChart.push(delaysDays,
    delaysData,
    average,getAverageHoursNotFloor);

  const thirdChartDataProcessed = dispatchChart;

  return {
    thirdChartDataProcessed,
    dataToExcelDelays,
  };
};

export default thirdChartProcessed;
