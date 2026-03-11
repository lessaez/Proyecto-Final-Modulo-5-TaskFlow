const getTime = () => {
  const contenedor = document.getElementById("hora-actual");
  if (!contenedor) return;

  const ahora = new Date();

  const actualizarHora = () => {
    const tiempo = new Date().toLocaleTimeString();
    contenedor.innerHTML = `🕒 Hora actual: ${tiempo}`;
  };

  actualizarHora();
  setInterval(actualizarHora, 1000);
};

export default getTime;