const { DateTime } = luxon;

export function formatearFecha(fecha){

if(!fecha) return "";

return DateTime.fromISO(fecha).toFormat("dd/MM/yyyy");

}

export function diasRestantes(fecha){

if(!fecha) return "";

const hoy = DateTime.now();
const limite = DateTime.fromISO(fecha);

const diff = limite.diff(hoy,"days").days;

if(diff < 0){

return "Tarea vencida";

}

return Math.ceil(diff) + " días";

}