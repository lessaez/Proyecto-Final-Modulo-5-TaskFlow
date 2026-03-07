import { DateTime } from 'luxon';  // Importamos Luxon para formatear la fecha

export class Tarea {
  constructor(id, descripcion, prioridad, fechaVencimiento) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = 'pendiente';
    this.prioridad = prioridad || 'baja';  // Prioridad predeterminada
    this.fechaVencimiento = this.validarFecha(fechaVencimiento) || 'No hay una fecha límite';
    this.fechaCreacion = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'); // Fecha con Luxon
  }

  // Método para cambiar el estado de la tarea
  cambiarEstado() {
    this.estado = this.estado === 'pendiente' ? 'completada' : 'pendiente';
  }

  // Método para validar la fecha
  validarFecha(fecha) {
    if (Date.parse(fecha)) {
      return fecha;
    }
    return null;  // Devuelve null si la fecha no es válida
  }

  // Método para mostrar la tarea en un formato legible
  mostrarTarea() {
    return `${this.descripcion} (${this.estado}) - Vencimiento: ${this.fechaVencimiento} - Creada: ${this.fechaCreacion}`;
  }
}