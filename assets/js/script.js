import { Tarea } from "./classes/Tarea.js";
import { GestorTareas } from "./classes/GestorTareas.js";
import { formatearFecha, diasRestantes } from "./classes/fechas-luxon.js";

/* ---------- VERSION DE DATOS ---------- */

const VERSION_DATOS = "v3";

const versionGuardada = localStorage.getItem("versionDatos");

if (versionGuardada !== VERSION_DATOS) {
  localStorage.removeItem("tareas");
  localStorage.setItem("versionDatos", VERSION_DATOS);
}

/* ---------- INSTANCIA ---------- */

const gestor = new GestorTareas();

/* ---------- ELEMENTOS DOM ---------- */

const formulario = document.getElementById("formulario");
const inputTarea = document.getElementById("tarea");
const inputFecha = document.getElementById("fecha-vencimiento");
const inputPrioridad = document.getElementById("prioridad-tarea");

const lista = document.getElementById("lista-tareas");
const pendientes = document.getElementById("tareas-pendientes");

const barra = document.getElementById("barra-avance");
const textoProgreso = document.getElementById("texto-progreso");

/* ---------- API ---------- */

async function cargarTareasAPI() {

  try {

    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const data = await res.json();

    const tareasEjemplo = [
      "Estudiar programación",
      "Leer un libro",
      "Escribir ideas",
      "Dibujar",
      "Practicar JavaScript"
    ];

    data.forEach((t, index) => {

      const nueva = new Tarea(
        tareasEjemplo[index],
        new Date().toISOString().split("T")[0],
        "media"
      );

      if (t.completed) {
        nueva.completada = true;
      }

      gestor.agregarTarea(nueva);

    });

    console.log("Tareas cargadas desde API");

    render();

  } catch (error) {

    console.error("Error consumiendo API:", error);

  }

}

/* ---------- INICIALIZAR ---------- */

gestor.cargar();

if (gestor.tareas.length === 0) {
  cargarTareasAPI();
}

render();

/* ---------- EVENTO FORMULARIO ---------- */

formulario.addEventListener("submit", (e) => {

  e.preventDefault();

  const texto = inputTarea.value.trim();
  const fecha = inputFecha.value;
  const prioridad = inputPrioridad.value;

  if (texto === "") {
    alert("Debes escribir una tarea");
    return;
  }

  const nueva = new Tarea(texto, fecha, prioridad);

  gestor.agregarTarea(nueva);

  formulario.reset();

  render();

});

/* ---------- RENDER ---------- */

function render() {

  lista.innerHTML = "";

  let completadas = 0;

  if (gestor.tareas.length === 0) {

    lista.innerHTML = "<p>No hay tareas aún. Agrega una nueva.</p>";

    pendientes.textContent = 0;
    barra.style.width = "0%";
    textoProgreso.textContent = "Progreso: 0%";

    return;

  }

  gestor.tareas.forEach((tarea, index) => {

    const li = document.createElement("li");

    if (tarea.prioridad === "alta") {
      li.classList.add("prioridad-alta");
    }

    if (tarea.prioridad === "media") {
      li.classList.add("prioridad-media");
    }

    if (tarea.prioridad === "baja") {
      li.classList.add("prioridad-baja");
    }

    if (tarea.completada) {
      li.classList.add("tarea-completada");
      completadas++;
    }

    li.innerHTML = `
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

    li.querySelector(".btn-completar").addEventListener("click", () => {

      gestor.completarTarea(index);
      render();

    });

    li.querySelector(".btn-eliminar").addEventListener("click", () => {

      gestor.eliminarTarea(index);
      render();

    });

    lista.appendChild(li);

  });

  pendientes.textContent = gestor.tareas.length - completadas;

  const porcentaje = Math.round((completadas / gestor.tareas.length) * 100);

  barra.style.width = porcentaje + "%";

  textoProgreso.textContent =
    "Progreso: " + porcentaje + "% completado";

}

async function obtenerClima(){

const apiKey = "TU_API_KEY";
const ciudad = "Santiago";

const url =
`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},CL&appid=${apiKey}&units=metric&lang=es`;

try{

const res = await fetch(url);
const data = await res.json();

const temperatura = data.main.temp;
const descripcion = data.weather[0].description;

document.getElementById("clima-info").textContent =
`En ${ciudad} hay ${temperatura}°C con ${descripcion}`;

}
catch(error){

document.getElementById("clima-info").textContent =
"No se pudo cargar el clima";

console.error(error);

}

}

obtenerClima();
