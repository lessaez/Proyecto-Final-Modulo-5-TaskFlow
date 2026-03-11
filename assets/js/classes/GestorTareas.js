export class GestorTareas {

constructor(){

this.tareas = [];

}

// Agrega una nueva tarea al arreglo
agregarTarea(tarea){

// Validación básica para evitar errores
if (!tarea) return;

this.tareas.push(tarea);
this.guardar();

}

// Elimina tarea según su posición en el arreglo
eliminarTarea(index){

// Validar índice válido
if (index < 0 || index >= this.tareas.length) return;

this.tareas.splice(index,1);
this.guardar();

}

// Marca tarea como completada o pendiente
completarTarea(index){

// Validar índice válido
if (index < 0 || index >= this.tareas.length) return;

this.tareas[index].completada = !this.tareas[index].completada;
this.guardar();

}

// Guarda tareas en localStorage
guardar(){

try {

localStorage.setItem("tareas", JSON.stringify(this.tareas));

} catch (error) {

console.error("Error guardando tareas:", error);

}

}

// Carga tareas desde localStorage
cargar(){

try {

const datos = JSON.parse(localStorage.getItem("tareas")) || [];
this.tareas = datos;

} catch (error) {

// Si hay datos corruptos, evita que la app muera
console.error("Error cargando tareas:", error);
this.tareas = [];

}

}

}