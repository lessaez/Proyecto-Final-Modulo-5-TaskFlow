import { Tarea } from "./classes/Tarea.js";
import { GestorTareas } from "./classes/GestorTareas.js";
import { formatearFecha, diasRestantes } from "./classes/fechas-luxon.js";

const gestor = new GestorTareas();

const formulario = document.getElementById("formulario");
const inputTarea = document.getElementById("tarea");
const inputFecha = document.getElementById("fecha-vencimiento");
const inputPrioridad = document.getElementById("prioridad-tarea");

const lista = document.getElementById("lista-tareas");
const pendientes = document.getElementById("tareas-pendientes");
const progreso = document.getElementById("progreso");

gestor.cargar();
render();

formulario.addEventListener("submit",(e)=>{

e.preventDefault();

const texto = inputTarea.value;
const fecha = inputFecha.value;
const prioridad = inputPrioridad.value;

const nueva = new Tarea(texto,fecha,prioridad);

gestor.agregarTarea(nueva);

formulario.reset();

render();

});

function render(){

lista.innerHTML="";

let completadas=0;

gestor.tareas.forEach((tarea,index)=>{

const li=document.createElement("li");

/* prioridad colores */

if(tarea.prioridad==="alta"){
li.classList.add("prioridad-alta");
}

if(tarea.prioridad==="media"){
li.classList.add("prioridad-media");
}

if(tarea.prioridad==="baja"){
li.classList.add("prioridad-baja");
}

/* tarea completada */

if(tarea.completada){
li.classList.add("tarea-completada");
completadas++;
}

li.innerHTML=`

<strong>${tarea.texto}</strong>
<br>
Fecha: ${formatearFecha(tarea.fecha)}
<br>
Restante: ${diasRestantes(tarea.fecha)}
<br>
Prioridad: ${tarea.prioridad}
<br>

<button class="btn-completar">✔ Completar</button>
<button class="btn-eliminar">🗑 Eliminar</button>

`;

li.querySelector(".btn-completar").addEventListener("click",()=>{

gestor.completarTarea(index);
render();

});

li.querySelector(".btn-eliminar").addEventListener("click",()=>{

gestor.eliminarTarea(index);
render();

});

lista.appendChild(li);

});

pendientes.textContent = gestor.tareas.length - completadas;

const porcentaje = gestor.tareas.length === 0
? 0
: (completadas / gestor.tareas.length) * 100;

progreso.value = porcentaje;

}