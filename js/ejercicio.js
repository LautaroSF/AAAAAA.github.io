// ================= VARIABLES GLOBALES =================
let totalObras = 0;
let consumoPorLuz = 0;
let costoKWh = 0;
let arrayObras = []; // Aquí guardaremos los objetos con los datos de cada obra

// ================= CAPTURA DE ELEMENTOS DEL DOM =================
// Formularios y botones
const formConfig = document.getElementById('form-config');
const formObras = document.getElementById('form-obras');
const fieldsetObras = document.getElementById('fieldset-obras');
const btnConfig = document.getElementById('btn-config');
const btnCalcular = document.getElementById('btn-calcular');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Inputs Paso 1
const inputCantObras = document.getElementById('cant-obras');
const inputConsumoLuz = document.getElementById('consumo-luz');
const inputCostoKwh = document.getElementById('costo-kwh');

// Inputs Paso 2
const inputNombre = document.getElementById('nombre-obra');
const inputCantLuces = document.getElementById('cant-luces');
const inputTiempoHoras = document.getElementById('tiempo-horas');
const indicadorObras = document.getElementById('indicador-obras');

// Salida de resultados
const areaResultados = document.getElementById('area-resultados');


// ================= EVENTOS =================

// PASO 1: Enviar configuración general
formConfig.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que la página se recargue

    // Convertimos a número y validamos
    totalObras = parseInt(inputCantObras.value);
    consumoPorLuz = parseFloat(inputConsumoLuz.value);
    costoKWh = parseFloat(inputCostoKwh.value);

    // Validación extra de seguridad (los atributos HTML ya filtran, pero lo reforzamos por JS)
    if (totalObras > 0 && consumoPorLuz > 0 && costoKWh > 0) {
        // Deshabilitar el Paso 1
        btnConfig.disabled = true;
        inputCantObras.disabled = true;
        inputConsumoLuz.disabled = true;
        inputCostoKwh.disabled = true;

        // Habilitar el Paso 2
        fieldsetObras.disabled = false;
        indicadorObras.textContent = `Ingrese datos para la obra 1 de ${totalObras}`;
    } else {
        alert("Por favor, ingrese valores mayores a cero.");
    }
});

// PASO 2: Agregar una obra al sistema
formObras.addEventListener('submit', function(evento) {
    evento.preventDefault();

    // Validar nombre vacío y números mayores a cero
    let nombre = inputNombre.value.trim();
    let luces = parseInt(inputCantLuces.value);
    let horas = parseFloat(inputTiempoHoras.value);

    if (nombre !== "" && luces > 0 && horas > 0) {
        // 1. Guardar los datos en un objeto y sumarlo al array
        let obraIngresada = {
            nombre: nombre,
            luces: luces,
            horas: horas
        };
        arrayObras.push(obraIngresada);

        // 2. Limpiar inputs para la siguiente carga
        inputNombre.value = "";
        inputCantLuces.value = "";
        inputTiempoHoras.value = "";
        inputNombre.focus();

        // 3. Evaluar si ya terminamos de cargar o si faltan
        if (arrayObras.length === totalObras) {
            // Ya se cargaron todas
            fieldsetObras.disabled = true; // Bloquear formulario de obras
            indicadorObras.textContent = `Se han ingresado las ${totalObras} obras.`;
            btnCalcular.disabled = false; // Habilitar el cálculo
        } else {
            // Faltan cargar
            let siguienteNumero = arrayObras.length + 1;
            indicadorObras.textContent = `Ingrese datos para la obra ${siguienteNumero} de ${totalObras}`;
        }
    } else {
        alert("Asegúrese de ingresar un nombre válido y valores numéricos mayores a cero.");
    }
});

// PASO 3: Calcular Resultados
btnCalcular.addEventListener('click', function() {
    // Variables acumuladoras para los cálculos
    let consumoTotalDiario = 0;
    
    // Variables para buscar el máximo
    let maxTiempo = 0;
    let obraMaxTiempo = "";
    let consumoObraMaxTiempo = 0;

    // Variables para el porcentaje
    let cantidadObrasMas20Luces = 0;

    // Recorremos el array de objetos con un bucle for tradicional (Visto en clase)
    for (let i = 0; i < arrayObras.length; i++) {
        let obraActual = arrayObras[i];

        // Cálculo 1: Consumo diario de esta obra específica (luces * horas * kW por luz)
        let consumoObra = obraActual.luces * obraActual.horas * consumoPorLuz;
        consumoTotalDiario = consumoTotalDiario + consumoObra;

        // Cálculo 2: Buscar la de mayor tiempo
        if (obraActual.horas > maxTiempo) {
            maxTiempo = obraActual.horas;
            obraMaxTiempo = obraActual.nombre;
            consumoObraMaxTiempo = consumoObra;
        }

        // Cálculo 3: Contar obras con más de 20 luces
        if (obraActual.luces > 20) {
            cantidadObrasMas20Luces++;
        }
    }

    // Procesar los cálculos finales requeridos por la consigna
    let promedioPorObra = consumoTotalDiario / totalObras;
    let costoDiarioObraMax = consumoObraMaxTiempo * costoKWh;
    let porcentajeMas20 = (cantidadObrasMas20Luces * 100) / totalObras;

    // Mostrar los resultados en el DOM insertando HTML
    areaResultados.style.display = "block"; // Lo hacemos visible
    areaResultados.innerHTML = `
        <p><strong>1. Consumos:</strong></p>
        <p>Consumo total diario: ${consumoTotalDiario.toFixed(2)} kWh</p>
        <p>Promedio por obra: ${promedioPorObra.toFixed(2)} kWh</p>
        <hr style="margin: 10px 0;">
        <p><strong>2. Obra con mayor duración:</strong></p>
        <p>Nombre: ${obraMaxTiempo} (${maxTiempo} hrs)</p>
        <p>Costo diario: $${costoDiarioObraMax.toFixed(2)}</p>
        <hr style="margin: 10px 0;">
        <p><strong>3. Estadísticas:</strong></p>
        <p>Obras con más de 20 luces: ${porcentajeMas20.toFixed(2)}%</p>
    `;

    // Deshabilitar botón calcular y habilitar reinicio
    btnCalcular.disabled = true;
    btnReiniciar.disabled = false;
});

// PASO 4: Reiniciar Sistema
btnReiniciar.addEventListener('click', function() {
    // 1. Resetear variables globales
    totalObras = 0;
    consumoPorLuz = 0;
    costoKWh = 0;
    arrayObras = [];

    // 2. Limpiar todos los formularios
    formConfig.reset();
    formObras.reset();

    // 3. Restaurar estados (habilitar Paso 1, deshabilitar Paso 2 y 3)
    btnConfig.disabled = false;
    inputCantObras.disabled = false;
    inputConsumoLuz.disabled = false;
    inputCostoKwh.disabled = false;
    
    fieldsetObras.disabled = true;
    btnCalcular.disabled = true;
    btnReiniciar.disabled = true;

    // 4. Limpiar textos e interfaz
    indicadorObras.textContent = "Esperando parámetros generales...";
    areaResultados.style.display = "none";
    areaResultados.innerHTML = "";
});
