export class GestorTareas {

constructor(){

this.tareas = [];

}

agregarTarea(tarea){

this.tareas.push(tarea);
this.guardar();

}

eliminarTarea(index){

this.tareas.splice(index,1);
this.guardar();

}

completarTarea(index){

this.tareas[index].completada = !this.tareas[index].completada;
this.guardar();

}

guardar(){

localStorage.setItem("tareas", JSON.stringify(this.tareas));

}

cargar(){

const datos = JSON.parse(localStorage.getItem("tareas")) || [];

this.tareas = datos;

}

}