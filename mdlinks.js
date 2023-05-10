//funcion
/* 
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
leerArchivo(nuevaRuta) */

const path = require('path');
const fs = require('fs');

 export const mdLinks = (ruta, options) => {
  determinarExistencia(ruta)
    .then((existeRuta) => {
      if (existeRuta) {
        const esAbsoluta = esRutaAbsoluta(ruta);
  
        if (!esAbsoluta) {
          const nuevaRuta = convertirARutaAbsoluta(ruta);
          return leerArchivo(nuevaRuta);
        } else {
          return leerArchivo(ruta);
        }
      } else {
        throw new Error('La ruta especificada no existe.');
      }
    })
    .then((contenido) => {
      extraerLinks(contenido);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const determinarExistencia = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.access(ruta, fs.constants.F_OK, (error) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const esRutaAbsoluta = (ruta) => {
  return path.isAbsolute(ruta);
};

export const convertirARutaAbsoluta = (ruta) => {
  return path.resolve(ruta);
};

export const leerArchivo = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf8', (error, contenido) => {
      if (error) {
        reject(error);
      } else {
        resolve(contenido);
      }
    });
  });
};

export const extraerLinks = (contenido) => {
  // Lógica para extraer los links del contenido del archivo
  console.log('Extrayendo links...');
};

// Ejemplo de uso
mdLinks('/ruta/a/validar', {});