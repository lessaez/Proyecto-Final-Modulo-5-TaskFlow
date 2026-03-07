import { Tarea } from './Tarea.js'; // Importamos la clase Tarea

export class GestorTareas {
  constructor() {
    this.tareas = [];  // Inicializamos la lista de tareas vacía
  }

  // Método para agregar una nueva tarea
  agregarTarea(descripcion, prioridad, fechaVencimiento) {
    const id = Date.now();  // Usamos el tiempo actual como ID único
    const nuevaTarea = new Tarea(id, descripcion, prioridad, fechaVencimiento); // Crear una nueva tarea
    this.tareas.push(nuevaTarea);
    this.guardarEnLocalStorage();  // Guardamos la tarea en el almacenamiento local
    this.mostrarTareas();  // Actualizamos la vista de las tareas
    this.mostrarNotificacion('Tarea agregada correctamente.', 'success');
  }

  // Método para eliminar una tarea por ID
  eliminarTarea(id) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);  // Filtrar la tarea a eliminar
    this.guardarEnLocalStorage();  // Actualizamos el almacenamiento local
    this.mostrarTareas();  // Actualizamos la vista de las tareas
    this.mostrarNotificacion('Tarea eliminada.', 'error');
  }

  // Método para cambiar el estado de una tarea
  cambiarEstadoTarea(id) {
    const tarea = this.tareas.find(t => t.id === id);  // Buscar la tarea por ID
    if (tarea) tarea.cambiarEstado();  // Cambiar el estado de la tarea
    this.guardarEnLocalStorage();  // Actualizamos el almacenamiento local
    this.mostrarTareas();  // Actualizamos la vista de las tareas
  }

  // Método para guardar las tareas en el localStorage
  guardarEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));  // Guardar las tareas en el almacenamiento local
  }

  // Método para cargar las tareas desde el localStorage
  cargarDesdeLocalStorage() {
    const datos = JSON.parse(localStorage.getItem('tareas')) || [];  // Cargar las tareas desde el almacenamiento local
    this.tareas = datos.map(t => new Tarea(t.id, t.descripcion, t.prioridad, t.fechaVencimiento));  // Crear las tareas a partir de los datos guardados
    this.mostrarTareas();  // Mostrar las tareas
  }

  // Método para mostrar todas las tareas
  mostrarTareas(filtro = 'todos') {
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = '';  // Limpiamos la lista de tareas antes de volver a mostrarla

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
        <span>${tarea.descripcion} - ${tarea.estado} - ${tarea.fechaVencimiento}</span>
      `;
      
      // Crear botón para eliminar tarea
      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.addEventListener('click', () => this.eliminarTarea(tarea.id));  // Usamos addEventListener para manejar el evento
      li.appendChild(eliminarBtn);

      // Crear botón para cambiar el estado de la tarea
      const cambiarEstadoBtn = document.createElement('button');
      cambiarEstadoBtn.textContent = 'Cambiar Estado';
      cambiarEstadoBtn.addEventListener('click', () => this.cambiarEstadoTarea(tarea.id));  // Usamos addEventListener para manejar el evento
      li.appendChild(cambiarEstadoBtn);

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