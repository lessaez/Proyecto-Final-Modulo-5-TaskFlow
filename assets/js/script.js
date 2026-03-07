/* Importar las clases desde los archivos correspondientes */
import { Tarea } from './classes/Tarea.js'; 
import { GestorTareas } from './classes/GestorTareas.js';
import { formatearFecha, calcularTiempoRestante } from './classes/fechas-luxon.js';

class GestorTareas {
  constructor() {
    this.tareas = [];  // Inicializamos la lista de tareas vacía
  }

  // Método para agregar una nueva tarea
  agregarTarea(descripcion, prioridad, fechaVencimiento) {
    const id = Date.now();  // Usamos el tiempo actual como ID único
    const nuevaTarea = new Tarea(id, descripcion, prioridad, fechaVencimiento); // Crear una nueva tarea
    this.tareas.push(nuevaTarea);
    this.guardarEnLocalStorage();  // Guardar la tarea en el almacenamiento local
    this.mostrarTareas();  // Actualizar la vista de las tareas
    this.mostrarNotificacion('Tarea agregada correctamente.', 'success');
  }

  // Método para eliminar una tarea
  eliminarTarea(id) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);  // Filtrar la tarea a eliminar
    this.guardarEnLocalStorage();  // Actualizar el almacenamiento local
    this.mostrarTareas();  // Actualizar la vista de las tareas
    this.mostrarNotificacion('Tarea eliminada.', 'error');
  }

  // Método para cambiar el estado de una tarea
  cambiarEstadoTarea(id) {
    const tarea = this.tareas.find(t => t.id === id);  // Buscar la tarea por ID
    if (tarea) tarea.cambiarEstado();  // Cambiar el estado de la tarea
    this.guardarEnLocalStorage();  // Actualizar el almacenamiento local
    this.mostrarTareas();  // Actualizar la vista de las tareas
  }

  // Método para guardar las tareas en el almacenamiento local
  guardarEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));  // Guardar las tareas en el almacenamiento local
  }

  // Método para cargar las tareas desde el almacenamiento local
  cargarDesdeLocalStorage() {
    const datos = JSON.parse(localStorage.getItem('tareas')) || [];  // Cargar las tareas desde el almacenamiento local
    this.tareas = datos.map(t => new Tarea(t.id, t.descripcion, t.prioridad, t.fechaVencimiento));  // Crear las tareas a partir de los datos guardados
    this.mostrarTareas();  // Mostrar las tareas
  }

  // Método para mostrar las tareas en la interfaz
  mostrarTareas(filtro = 'todos') {
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = '';  // Limpiar la lista de tareas antes de mostrar las nuevas

    // Filtrar tareas por estado (pendiente o completada)
    let tareasFiltradas = this.tareas;

    if (filtro === 'pendiente') {
      tareasFiltradas = tareasFiltradas.filter(tarea => tarea.estado === 'pendiente');
    } else if (filtro === 'completada') {
      tareasFiltradas = tareasFiltradas.filter(tarea => tarea.estado === 'completada');
    }

    // Mostrar las tareas filtradas en la lista
    tareasFiltradas.forEach(tarea => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${tarea.descripcion} - ${tarea.estado} - ${tarea.fechaVencimiento} - Prioridad: ${tarea.prioridad}</span>
        <button class="delete" onclick="gestor.eliminarTarea(${tarea.id})">Eliminar</button>
        <button onclick="gestor.cambiarEstadoTarea(${tarea.id})">Cambiar Estado</button>
      `;
      listaTareas.appendChild(li);
    });
  }

  // Método para ordenar las tareas por fecha de vencimiento o prioridad
  mostrarTareasOrdenadas(criterio) {
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = '';  // Limpiar la lista de tareas antes de ordenarlas

    let tareasOrdenadas = [...this.tareas];

    // Ordenar las tareas según el criterio (fecha o prioridad)
    if (criterio === 'fecha') {
      tareasOrdenadas.sort((a, b) => new Date(a.fechaVencimiento) - new Date(b.fechaVencimiento));
    } else if (criterio === 'prioridad') {
      tareasOrdenadas.sort((a, b) => a.prioridad.localeCompare(b.prioridad));
    }

    // Mostrar las tareas ordenadas
    tareasOrdenadas.forEach(tarea => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${tarea.descripcion} - ${tarea.estado} - ${tarea.fechaVencimiento} - Prioridad: ${tarea.prioridad}</span>
        <button class="delete" onclick="gestor.eliminarTarea(${tarea.id})">Eliminar</button>
        <button onclick="gestor.cambiarEstadoTarea(${tarea.id})">Cambiar Estado</button>
      `;
      listaTareas.appendChild(li);
    });
  }

  // Método para mostrar notificaciones (de éxito o error)
  mostrarNotificacion(mensaje, tipo) {
    const notification = document.getElementById('notification');
    notification.textContent = mensaje;
    notification.classList.remove('hidden');
    notification.classList.add(tipo === 'success' ? 'success' : 'error');
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3500);  // Mantener la notificación visible por 3.5 segundos
  }
}

// Instanciamos el gestor de tareas
const gestor = new GestorTareas();
gestor.cargarDesdeLocalStorage();

// Filtrar tareas por estado
const filtroTareas = document.getElementById('filtro-tareas');
filtroTareas.addEventListener('change', (e) => {
  const estadoFiltro = e.target.value;
  gestor.mostrarTareas(estadoFiltro);  // Mostrar las tareas según el filtro
});

// Ordenar tareas por fecha o prioridad
const ordenarTareas = document.getElementById('ordenar-tareas');
ordenarTareas.addEventListener('change', (e) => {
  const criterio = e.target.value;
  gestor.mostrarTareasOrdenadas(criterio);  // Ordenar las tareas según el criterio
});

// Evento para agregar tarea
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('tarea');
  const prioridadSelect = document.getElementById('prioridad-tarea');
  const fechaVencimiento = document.getElementById('fecha-vencimiento').value;
  const prioridad = prioridadSelect.value;
  if (input.value.trim()) {
    gestor.agregarTarea(input.value.trim(), prioridad, fechaVencimiento);  // Agregar la tarea
    input.value = '';  // Limpiar el campo de descripción
  }
});