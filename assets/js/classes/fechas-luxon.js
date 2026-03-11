const { DateTime } = luxon;

export function formatearFecha(fecha){

if(!fecha) return "";

// Validar fecha correcta
const dt = DateTime.fromISO(fecha);

if(!dt.isValid) return "Fecha inválida";

return dt.toFormat("dd/MM/yyyy");

}

export function diasRestantes(fecha){

if(!fecha) return "";

const hoy = DateTime.now().startOf("day");
const limite = DateTime.fromISO(fecha).startOf("day");

// Validar fecha correcta
if(!limite.isValid) return "Fecha inválida";

const diff = limite.diff(hoy,"days").days;

if(diff < 0){
return "Tarea vencida";
}

if(diff === 0){
return "Vence hoy";
}

if(diff === 1){
return "Vence mañana";
}

return Math.ceil(diff) + " días";

}