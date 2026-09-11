// Array de objetos con las obras elegidas
const obras = [
    { nombre: "Vicious Circular Breathing", anio: 2013, img: "../img/lozano-hemmer-1.jpg" },
    { nombre: "Sphere Packing Bach", anio: 2014, img: "../img/lozano-hemmer-2.jpg" },
    { nombre: "Pulse Topology", anio: 2021, img: "../img/lozano-hemmer-3.jpg" },
    { nombre: "Vectorial Elevation", anio: 1999, img: "../img/lozano-hemmer-4.jpg" },
    { nombre: "33 Questions per Minute", anio: 2000, img: "../img/lozano-hemmer-5.jpg" },
    { nombre: "Body Movies", anio: 2001, img: "../img/lozano-hemmer-6.jpg" }
];

const contenedorGaleria = document.getElementById('contenedor-galeria');
const btnCambiarDiseno = document.getElementById('btn-cambiar-diseno');

// Función para generar la galería en el DOM
function generarGaleria() {
    // Vaciamos por si acaso
    contenedorGaleria.innerHTML = "";
    
    // Recorremos el array y creamos el HTML
    for (let i = 0; i < obras.length; i++) {
        let obra = obras[i];
        
        let cardHTML = `
            <div class="obra-card">
                <img src="${obra.img}" alt="Obra ${obra.nombre}">
                <h3 class="destacado">${obra.nombre}</h3>
                <p>Año: ${obra.anio}</p>
            </div>
        `;
        // Insertamos en el contenedor
        contenedorGaleria.innerHTML += cardHTML;
    }
}

// Evento para cambiar el diseño aplicando una clase CSS al contenedor
btnCambiarDiseno.addEventListener('click', function() {
    contenedorGaleria.classList.toggle('galeria-alternativa');
});

// Llamada a la función al cargar el script
generarGaleria();
