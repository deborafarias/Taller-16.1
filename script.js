const fetchButton = document.getElementById('fetchButton');
const resultados = document.getElementById('resultados');
const buscarButton = document.getElementById('buscarPais');
const nombrePais = document.getElementById('nombrePais');

async function obtenerPaises() {
    try {
        // Llamada a la API
        const respuesta = await fetch('https://restcountries.com/v3.1/all');
        if (!respuesta.ok) throw new Error('Error en la solicitud');

        const data = await respuesta.json();

        // Limpiar resultados anteriores
        resultados.innerHTML = '';
        // Mostrar los datos en la página
        data.slice(0, 20).forEach((pais) => {
            const paisElemento = document.createElement('div');
            paisElemento.innerHTML = `
          <strong>${pais.name.common}</strong><br>
          Región: ${pais.region}<br>
          Población: ${pais.population.toLocaleString()}<br>
          <hr>
        `;
            resultados.appendChild(paisElemento);
        });
    } catch (error) {
        console.error('Error:', error);
        resultados.innerHTML = `<p style="color: red;">Error al obtener los datos. Intenta nuevamente.</p>`;
    }
}

async function mostrarPaisBuscado() {
    const pais = nombrePais.value.trim();
    if (!pais) {
        resultados.innerHTML = `<p style="color: red;">Por favor, ingresa un nombre de país.</p>`;
        return;
    }

    try {
        const respuestaBuscador = await fetch(`https://restcountries.com/v3.1/name/${pais}`);
        if (!respuestaBuscador.ok) throw new Error('No se encontró el pais.');


        const data = await respuestaBuscador.json();

        resultados.innerHTML = '';

        data.forEach((resultado) => {
            const paisElemento = document.createElement('div');
            paisElemento.innerHTML = `
          <strong>${resultado.name.common}</strong><br>
          Región: ${resultado.region}<br>
          Subregión: ${resultado.subregion}<br>
          Población: ${resultado.population.toLocaleString()}<br>
          <img src="${resultado.flags.svg}" alt="Bandera de ${resultado.name.common}" style="width: 100px;"><br>
          <hr>
        `;
            resultados.appendChild(paisElemento);
        });
    } catch (error) {
        console.error('Error:', error);
        resultados.innerHTML = `<p style="color: red;">No se encontró el país. Intenta con otro nombre.</p>`;
    }
}
// Asociar el botón con la función
fetchButton.addEventListener('click', obtenerPaises);
buscarButton.addEventListener('click', mostrarPaisBuscado);