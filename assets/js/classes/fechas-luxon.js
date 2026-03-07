import { DateTime } from 'luxon'; // Importar la librería Luxon

// Función para formatear una fecha en un formato más legible
export function formatearFecha(fecha) {
  const fechaLuxon = DateTime.fromISO(fecha); // Convierte la fecha a un objeto de Luxon
  return fechaLuxon.toFormat('dd-MM-yyyy'); // Devuelve la fecha en formato 'dd-MM-yyyy'
}

// Función para calcular el tiempo restante hasta una fecha de vencimiento
export function calcularTiempoRestante(fecha) {
  const fechaLuxon = DateTime.fromISO(fecha); // Convierte la fecha a un objeto de Luxon
  const ahora = DateTime.now(); // Obtiene la fecha y hora actuales
  const diferencia = fechaLuxon.diff(ahora, ['days', 'hours', 'minutes']); // Calcula la diferencia
  return diferencia.toObject(); // Devuelve la diferencia en un objeto
}