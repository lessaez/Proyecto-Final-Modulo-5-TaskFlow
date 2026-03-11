// OpenWeather API - Api de terceros para el clima
const API_KEY = '507f8e723c2a17752833b6392789c181'; 

const getWeather = async (lat, lon) => {

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;

  try {

    const response = await fetch(url);

    if (!response.ok)
      throw new Error(`Error API clima: ${response.status}`);

    const data = await response.json();

    const nombreLocalidad = data.name || "Ubicación desconocida";
    const icono = data.weather?.[0]?.icon || "01d";
    const descripcion = data.weather?.[0]?.description || "Sin descripción";
    const temp = data.main?.temp ?? "--";
    const humedad = data.main?.humidity ?? "--";

    const topBar = document.getElementById('clima');

    if (!topBar) return;

    topBar.innerHTML = `
      <div>
        <p>
          Clima actual en ${nombreLocalidad}
          <img src="https://openweathermap.org/img/wn/${icono}.png" width="40">
          ${descripcion} |
          🌡️ ${temp}°C |
          💧 ${humedad}%
        </p>
      </div>
    `;

  } catch (error) {

    console.error("Error obteniendo clima:", error);

    const topBar = document.getElementById('clima');
    if (topBar) {
      topBar.innerHTML = `<p>No se pudo cargar el clima</p>`;
    }

  }
};

export default getWeather;