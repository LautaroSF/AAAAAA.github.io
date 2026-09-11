/* =========================================
   FUNCIONALIDAD 1: DATO CURIOSO AL AZAR
========================================= */
const datosCuriosos = [
    "Rafael Lozano-Hemmer es un artista mexicano-canadiense especializado en instalaciones interactivas en espacios públicos.",
    "Su obra combina tecnología avanzada como sensores biométricos, robótica y datos en tiempo real.",
    "En su proyecto Vectorial Elevation, ciudadanos controlaban reflectores gigantes a través de internet.",
    "Pulse Room es una instalación que traduce los latidos cardíacos de los visitantes en pulsos de luz.",
    "Estudió ingeniería antes de dedicarse al arte, lo que influye en su enfoque tecnológico.",
    "Sus instalaciones suelen involucrar la participación activa del público para activar la obra.",
    "Fue ganador del prestigioso premio Ars Electronica por su innovador uso de tecnología en arte.",
    "Utiliza la luz como lenguaje poético para explorar temas de identidad, memoria y presencia."
];

// 1. Array con los datos
const datosCuriosos = [
    "Rafael Lozano-Hemmer es un artista mexicano-canadiense...",
    "Su obra combina tecnología avanzada como sensores...",
    // ... resto de los datos ...
];

// 2. Captura de los elementos del HTML
const btnDatoCurioso = document.getElementById('btn-dato-curioso');
const displayDatoCurioso = document.getElementById('display-dato-curioso');

// 3. Evento al hacer clic en el botón
btnDatoCurioso.addEventListener('click', function() {
    let indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length);
    
    // 4. Se reemplaza el contenido del <div> en el HTML con el nuevo dato
    displayDatoCurioso.textContent = datosCuriosos[indiceAleatorio];
});

/* =========================================
   FUNCIONALIDAD 2: EJERCICIO RESOLUCIÓN
========================================= */

// Variables globales para el estado de la aplicación
let cantidadTotalObras = 0;
let consumoPorLuz = 0;
let costoKwh = 0;

let obrasCargadas = 0;
let arrayObras = [];

// Elementos del DOM - Fase 1
const inputCantidadObras = document.getElementById('input-cantidad-obras');
const inputConsumoLuz = document.getElementById('input-consumo-luz');
const inputCostoKwh = document.getElementById('input-costo-kwh');
const btnIniciarCarga = document.getElementById('btn-iniciar-carga');
const divFormConfig = document.getElementById('form-configuracion');

// Elementos del DOM - Fase 2
const divFormObras = document.getElementById('form-obras');
const tituloObraActual = document.getElementById('titulo-obra-actual');
const inputNombreObra = document.getElementById('input-nombre-obra');
const inputCantLuces = document.getElementById('input-cant-luces');
const inputHoras = document.getElementById('input-horas');
const btnAgregarObra = document.getElementById('btn-agregar-obra');

// Elementos del DOM - Fase 3
const divResultados = document.getElementById('resultados-ejercicio');
const btnReiniciar = document.getElementById('btn-reiniciar');


// Evento para Iniciar Carga (Valida Fase 1)
btnIniciarCarga.addEventListener('click', function() {
    let cantObras = parseInt(inputCantidadObras.value);
    let consumo = parseFloat(inputConsumoLuz.value);
    let costo = parseFloat(inputCostoKwh.value);

    // Validación de datos Fase 1
    if (isNaN(cantObras) || cantObras <= 0 || isNaN(consumo) || consumo <= 0 || isNaN(costo) || costo <= 0) {
        alert("Por favor, ingrese valores numéricos válidos y mayores a 0 en la configuración.");
        return;
    }

    // Guardar variables globales
    cantidadTotalObras = cantObras;
    consumoPorLuz = consumo;
    costoKwh = costo;

    // Deshabilitar Fase 1 y Habilitar Fase 2
    divFormConfig.style.opacity = "0.5";
    divFormConfig.style.pointerEvents = "none";
    
    divFormObras.style.opacity = "1";
    divFormObras.style.pointerEvents = "auto";
    
    actualizarTituloObra();
});


// Evento para cargar individualmente cada obra
btnAgregarObra.addEventListener('click', function() {
    let nombre = inputNombreObra.value.trim();
    let luces = parseInt(inputCantLuces.value);
    let horas = parseFloat(inputHoras.value);

    // Validación Fase 2
    if (nombre === "" || isNaN(luces) || luces <= 0 || isNaN(horas) || horas <= 0) {
        alert("Todos los campos de la obra son obligatorios y los valores deben ser mayores a cero.");
        return;
    }

    // Guardar datos en el array
    arrayObras.push({
        nombre: nombre,
        luces: luces,
        horas: horas
    });

    obrasCargadas++;

    // Limpiar inputs de Fase 2
    inputNombreObra.value = "";
    inputCantLuces.value = "";
    inputHoras.value = "";

    // Lógica de estado: ¿Terminó de cargar?
    if (obrasCargadas >= cantidadTotalObras) {
        divFormObras.style.opacity = "0.5";
        divFormObras.style.pointerEvents = "none";
        tituloObraActual.innerText = "Carga finalizada.";
        calcularResultados();
    } else {
        actualizarTituloObra();
    }
});


// Función auxiliar
function actualizarTituloObra() {
    tituloObraActual.innerText = `Cargando Obra ${obrasCargadas + 1} de ${cantidadTotalObras}`;
}


// Función que procesa los cálculos matemáticos exigidos
function calcularResultados() {
    let consumoTotalDiario = 0;
    
    let obraMayorTiempo = "";
    let maxHoras = 0;
    let lucesObraMayor = 0;

    let obrasConMasDe20Luces = 0;

    // Bucle para procesar todas las obras cargadas
    for (let i = 0; i < arrayObras.length; i++) {
        let obra = arrayObras[i];

        // 1. Consumo = luces * horas * consumoPorLuz
        let consumoObraDiario = obra.luces * obra.horas * consumoPorLuz;
        consumoTotalDiario += consumoObraDiario;

        // 2. Obra con mayor tiempo de funcionamiento
        if (obra.horas > maxHoras) {
            maxHoras = obra.horas;
            obraMayorTiempo = obra.nombre;
            lucesObraMayor = obra.luces;
        }

        // 3. Conteo de >20 luces
        if (obra.luces > 20) {
            obrasConMasDe20Luces++;
        }
    }

    // Cálculos finales requeridos
    let promedioDiario = consumoTotalDiario / cantidadTotalObras;
    let costoDiarioMayorObra = (lucesObraMayor * maxHoras * consumoPorLuz) * costoKwh;
    let porcentajeMas20 = (obrasConMasDe20Luces * 100) / cantidadTotalObras;

    // Renderizar resultados
    document.getElementById('res-consumo').innerHTML = `<strong>Consumo Total Diario:</strong> ${consumoTotalDiario.toFixed(2)} kWh | <strong>Promedio por Obra:</strong> ${promedioDiario.toFixed(2)} kWh`;
    
    document.getElementById('res-mayor-tiempo').innerHTML = `<strong>Obra con más horas/día:</strong> "${obraMayorTiempo}" (${maxHoras} hs) | <strong>Costo Diario:</strong> $${costoDiarioMayorObra.toFixed(2)}`;
    
    document.getElementById('res-porcentaje').innerHTML = `<strong>Obras con >20 luces:</strong> ${porcentajeMas20.toFixed(2)}%`;

    // Mostrar sección de resultados
    divResultados.style.display = "block";
}


// Evento para reiniciar todo el proceso (Fase 3)
btnReiniciar.addEventListener('click', function() {
    // Resetear variables
    cantidadTotalObras = 0;
    consumoPorLuz = 0;
    costoKwh = 0;
    obrasCargadas = 0;
    arrayObras = [];

    // Limpiar inputs Fase 1
    inputCantidadObras.value = "";
    inputConsumoLuz.value = "";
    inputCostoKwh.value = "";

    // Resetear UI
    divResultados.style.display = "none";
    
    divFormConfig.style.opacity = "1";
    divFormConfig.style.pointerEvents = "auto";
});
