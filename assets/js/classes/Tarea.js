export class Tarea {

constructor(texto, fecha, prioridad){

// Validaciones suaves para evitar datos vacíos
this.texto = texto || "Sin descripción";
this.fecha = fecha || null;
this.prioridad = prioridad || "media";

this.completada = false;

}

}