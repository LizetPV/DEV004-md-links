//funcion
export const determinarExistencia = (ruta) => {

}

export const mdLinks =  (path, options) => {

    const existeRuta = determinarExistencia(ruta);
    if(existeRuta){
        //algo
        const esAbsoluta = esAbsoluta(ruta);
        if(!esAbsoluta){
            const nuevaRuta = convertorAbsoluta(ruta); 
        }

         const contenido = leerArchivo(nuevaRuta) // es asincrono? 
         extraerLinks(contenido)
    }
    else{
        //haga esto
    }

}