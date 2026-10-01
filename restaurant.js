// Referencias a los elementos del DOM
const btnIniciar = document.getElementById("btnIniciar");
const estadoContainer = document.getElementById("estado-container");
const mensajeEstado = document.getElementById("mensaje-estado");
const listaOrden = document.getElementById("lista-orden");

// Función que simula la preparación y entrega de cada platillo
function prepararPlatillo(platillo, tiempo) {
    return new Promise((resolve, reject) => {
        // Mostramos en consola y actualizamos la interfaz visual con el estado actual
        console.log(`⏳ Preparando: ${platillo}...`);
        mensajeEstado.textContent = `⏳ Preparando: ${platillo}...`;

        setTimeout(() => {
            // Simulamos que todo sale bien si el platillo existe
            if (platillo) {
                console.log(`✔️ ¡${platillo} está listo y ha sido entregado!`);
                resolve(platillo);
            } else {
                reject(`❌ Error: El platillo no está disponible.`);
            }
        }, tiempo);
    });
}

// Función principal asíncrona para manejar la secuencia estricta con interfaz visual
async function procesarOrdenRestaurante() {
    // Deshabilitamos el botón y limpiamos la lista anterior
    btnIniciar.disabled = true;
    listaOrden.innerHTML = "";
    estadoContainer.classList.remove("hidden"); // Mostramos el spinner

    try {
        console.log("=== INICIO DE LA ORDEN ===");

        await prepararPlatillo("Bebida", 4000);
        agregarItemLista("✔️ ¡Bebida está lista!", "success");

        await prepararPlatillo("Pizza", 4000);
        agregarItemLista("✔️ ¡Pizza está lista!", "success");

        await prepararPlatillo("Postre", 4000);
        agregarItemLista("✔️ ¡Postre está listo!", "success");

        // Ocultamos el spinner y mostramos mensaje de éxito final
        estadoContainer.classList.add("hidden");
        console.log("\n🎉 ¡La orden completa ha sido entregada con éxito al cliente!");
        agregarItemLista("🎉 ¡La orden completa ha sido entregada con éxito!", "success");

    } catch (error) {
        estadoContainer.classList.add("hidden");
        console.log("Hubo un inconveniente con el pedido:", error);
        agregarItemLista(`Hubo un inconveniente: ${error}`, "error");
    } finally {
        // Reactivamos el botón al finalizar (ya sea con éxito o error)
        btnIniciar.disabled = false;
    }
}

// Función auxiliar para agregar elementos visuales al historial de la orden
function agregarItemLista(texto, clase) {
    const li = document.createElement("li");
    li.textContent = texto;
    li.className = clase;
    listaOrden.appendChild(li);
}