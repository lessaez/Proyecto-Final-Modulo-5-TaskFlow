const frases = [
  "El progreso es mejor que la perfección.",
  "Pequeños avances diarios generan grandes resultados.",
  "Organizar tu tiempo es organizar tu vida.",
  "Cada tarea completada es un paso al éxito.",
  "La disciplina supera a la motivación.",
  "Hoy es un buen día para avanzar.",
  "Tu yo del futuro agradecerá tu esfuerzo de hoy."
];

const getQuote = () => {
  const contenedor = document.getElementById("frase-motivacional");
  if (!contenedor) return;

  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

  contenedor.innerHTML = `💡 "${fraseAleatoria}"`;
};

export default getQuote;