//promesa: objeto que representa el eventual resultado de una operacion asincrona
// Referencias a los elementos del DOM
const btnIniciar = document.getElementById("btnIniciar"); //botón que inicia todo el proceso.
const estadoContainer = document.getElementById("estado-container");
const mensajeEstado = document.getElementById("mensaje-estado");
const listaOrden = document.getElementById("lista-orden");//Guarda la lista (<ul>) donde se irán agregando los resultados visuales


// Función que simula la preparación y entrega de cada platillo
function prepararPlatillo(platillo, tiempo) { //Declara una función que recibe el nombre del platillo y los milisegundos que tardará.
    return new Promise((resolve, reject) => { //Retorna una Promesa, herramienta clave de JavaScript para manejar operaciones asíncronas
        // Mostramos en consola y actualizamos la interfaz visual con el estado actual
        //  //muestran visualmente en pantalla que el platillo ha empezado a prepararse
    
        console.log(`⏳ Preparando: ${platillo}...`); //muestran visualmente en pantalla que el platillo ha empezado a prepararse
        mensajeEstado.textContent = `⏳ Preparando: ${platillo}...`;

        setTimeout(() => { //Simula una demora de red o tiempo de cocina
            // Simulamos que todo sale bien si el platillo existe
            if (platillo) {
                console.log(`✔️ ¡${platillo} está listo y ha sido entregado!`);
                resolve(platillo); //indicar que la promesa se cumplió con éxito.
            } else {
                reject(`❌ Error: El platillo no está disponible.`); //Si el platillo no existe, ejecuta reject para rechazar la promesa con un mensaje de error.
            }
        }, tiempo);
    });
}

function verificarEstatusPedido() {
    // Math.random() genera un número entre 0 y 1. 
    // Si es menor a 0.2, representa el 20% de probabilidad de fallo.
    if (Math.random() < 0.5) {
throw new Error("Intentelo de nuevo.");
    }
    
    return "Éxito: sigue con el proceso";
}

async function procesarOrdenRestaurante() {
    // Deshabilitamos el botón y limpiamos la lista anterior
    btnIniciar.disabled = true; 
    listaOrden.innerHTML = ""; 
    estadoContainer.classList.remove("hidden"); // Mostramos el spinner

    try { 
        console.log("=== INICIO DE LA ORDEN ===");
        
        // Ejecutamos la validación. Si cae en el 20% de error, lanzará una excepción
        // y el código saltará automáticamente al catch, bloqueando el resto de los platillos.
        const mensajeEstatus = verificarEstatusPedido();
        console.log(mensajeEstatus);

        // Si pasa la validación, continúan los tiempos de preparación
        await prepararPlatillo("Bebida", 4000);
        agregarItemLista("✔️ ¡Bebida está lista!🥤", "success");

        await prepararPlatillo("Pizza", 4000);
        agregarItemLista("✔️ ¡Pizza está lista!🍕", "success");

        await prepararPlatillo("Postre", 4000);
        agregarItemLista("✔️ ¡Postre está listo!🍰", "success");

        // Ocultamos el spinner y mostramos mensaje de éxito final
        estadoContainer.classList.add("hidden");
        console.log("\n🎉 ¡La orden completa ha sido entregada con éxito al cliente!");
        agregarItemLista("🎉 ¡La orden completa ha sido entregada con éxito!", "success");

    } catch (error) { 
        // Captura el error lanzado  u otro error en las promesas
        estadoContainer.classList.add("hidden");
        console.log("Hubo un inconveniente con el pedido:", error.message);
        agregarItemLista(`❌ Hubo un inconveniente: ${error.message}`, "error");
    } finally { 
        // Reactivamos el botón al finalizar (ya sea con éxito o error)
        btnIniciar.disabled = false;
    }
}

// Función auxiliar para agregar elementos visuales al historial de la orden
function agregarItemLista(texto, clase) { //Función reutilizable para insertar elementos de forma limpia en el DOM.
    const li = document.createElement("li");//Crea dinámicamente un elemento de lista (<li>) en memoria.
    li.textContent = texto; //Le asigna el texto recibido como parámetro al elemento <li>.
    li.className = clase; //Le asigna una clase CSS (como "success" o "error") para darle estilos visuales específicos.
    listaOrden.appendChild(li); //Inserta finalmente el nuevo elemento dentro de la lista principal (<ul>) para que aparezca en pantalla.
}

