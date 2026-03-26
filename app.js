// BOTÓN CALCULAR
const calcularBtn = document.getElementById("calcularBtn");
if (calcularBtn) {
    calcularBtn.addEventListener("click", function() {

        // Leer ingresos
        let ingresos = Number(document.getElementById("ingresos").value);
        if (ingresos < 0 || isNaN(ingresos)) ingresos = 0;

    // Leer y validar gastos fijos
    let gastosIds = ["gastoComida", "gastoVivienda", "gastoCoche", "gastoVarios"];
    let totalGastos = 0;
    for (let id of gastosIds) {
        let gasto = Math.max(0, Number(document.getElementById(id).value));
        totalGastos += gasto;
    }

    // Resto disponible
    let disponible = Math.max(0, ingresos - totalGastos);

    // Calcular ahorro y ocio (20% cada uno del disponible)
    let ahorro = disponible * 0.2;
    let ocio = disponible * 0.2;

    // Guardar en localStorage
    localStorage.setItem("totalGastos", totalGastos.toFixed(2));
    localStorage.setItem("ahorro", ahorro.toFixed(2));
    localStorage.setItem("ocio", ocio.toFixed(2));

    // Redirigir a resultado.html
    window.location.href = "resultado.html";
});
}

// Cargar resultados en resultado.html
if (window.location.pathname.includes("resultado.html")) {
    document.getElementById("totalGastos").innerText = localStorage.getItem("totalGastos") + " €";
    document.getElementById("ahorro").innerText = localStorage.getItem("ahorro") + " €";
    document.getElementById("ocio").innerText = localStorage.getItem("ocio") + " €";
}

// GUARDAR META
document.getElementById("guardarMetaBtn").addEventListener("click", function() {

    let nombre = document.getElementById("nombreMeta").value;
    let cantidad = Number(document.getElementById("cantidadMeta").value);

    let ahorroMensual = localStorage.getItem("ahorroMensual");

    if (!ahorroMensual) {
        document.getElementById("infoMeta").innerText = "Primero calcula el ahorro";
        return;
    }

    ahorroMensual = Number(ahorroMensual);

    // Evitar división por cero
    if (ahorroMensual <= 0) {
        document.getElementById("infoMeta").innerText = "No hay ahorro disponible para calcular la meta";
        return;
    }

    // Calcular meses necesarios
    let meses = Math.ceil(cantidad / ahorroMensual);

    // Fecha estimada
    let hoy = new Date();
    hoy.setMonth(hoy.getMonth() + meses);
    let fecha = hoy.toLocaleDateString();

    // Mostrar info
    document.getElementById("infoMeta").innerText =
        "Meta: " + nombre +
        " | Te llevará " + meses + " meses" +
        " | Fecha estimada: " + fecha;
});