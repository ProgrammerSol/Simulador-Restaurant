//const estatusPedido = () => {
    //return Math.random() < 0.8;
//};

//const miPedidodePizza = new Promise ((resolve, reject) => {
    //setTimeout(() => { //nos permite incluir unretraso 
        //if (estatusPedido()) {
            //resolve(`Pedido Exitoso, Su pizza esta en camino.`);
        //} else {
            //reject(`Ocurrio un erro. Por favor intente nuevamente`);
        //}
    //}, 5000);
//});
 //const manejarPedido = (mensajeDeConfirmacion) => {
   // console.log(mensajeDeConfirmacion);
 //};

 //const rechazarPedido = (mensajeError) => {
    //console.log(mensajeError);
 //};

 //miPedidodePizza.then(manejarPedido, rechazarPedido);

 //miPedidodePizza
 //.then((mensajeDeConfirmacion) =>{
   // console.log(mensajeDeConfirmacion);
 //})
 //.catch((mensajeDeError) => {
    //console.log(mensajeDeError);
 //});
 //encadenamiento de metodos

 //function ordenarProducto(producto) {
   // return new Promise((resolve, reject) =>{
     //   console.log(`Ordenando: ${producto}`);
       // setTimeout(() => {
         //   if (producto === `taza`) {
           //     resolve(`Ordenando una taza...`);
            //} else {
              //  reject(`Este Producto no esta disponible actualmente.`)
            //}
        //}, 5000); //funcion que nos permite ingresar un retrazo
    //});
 //}

 //function procesarPedido(respuesta) {
   // return new Promise (resolve => {
    //    console.log(`Procesando respuesta...`);
      //  console.log(`la respuesta fue:${respuesta}`);
        //setTimeout(() => {
          //  resolve(`Gracias por su compra.`)
        //}, 4000);
 //   });
 //}

 //async function realizarPedido(producto) {
   // try {
    //const respuesta = await ordenarProducto(producto);
    //console.log(`Respuesta recibida`);
    //console.log(respuesta);
    //const respuestaProcesada = await procesarPedido(respuesta);
    //console.log(respuestaProcesada);
    //} catch (error) {
      //  console.log(error);
    //}
 //}

 //realizarPedido(`taza`);


 Función que simula la preparación y entrega de cada platillo
function prepararPlatillo(platillo, tiempo) {
    return new Promise((resolve, reject) => {
        console.log(`⏳ Preparando: ${platillo}...`);
        
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

// Función principal asíncrona para manejar la secuencia estricta
async function procesarOrdenRestaurante() {
    try {
        console.log("=== INICIO DE LA ORDEN ===");
        
        // 1. Primero la bebida
        await prepararPlatillo("Bebida", 2000);
        
        // 2. Seguido por la pizza
        await prepararPlatillo("Pizza", 4000);
        
        // 3. Finalmente el postre
        await prepararPlatillo("Postre", 3000);
        
        // Mensaje final al completar el último platillo
        console.log("\n🎉 ¡La orden completa ha sido entregada con éxito al cliente!");
        
    } catch (error) {
        console.log("Hubo un inconveniente con el pedido:", error);
    }
}

// Ejecutamos la simulación
procesarOrdenRestaurante();