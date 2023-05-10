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
import path from 'path';
import fs from 'fs';

import { logSuccess, logWarning, logError, logResultsBox} from './logger.js';


export const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
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
          logError('La ruta especificada no existe.');
        }
      })
      .then((contenido) => {
        const links = extraerLinks(contenido,ruta); // Pasa el nombre del archivo a extraerLinks
        logResultsBox(links); // Muestra los resultados en la consola usando logResultsBox
        resolve(links);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const determinarExistencia = (ruta) => {
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

const esRutaAbsoluta = (ruta) => {
  return path.isAbsolute(ruta);
};

const convertirARutaAbsoluta = (ruta) => {
  return path.resolve(ruta);
};

const leerArchivo = (ruta) => {
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

const extraerLinks = (contenido, archivo) => {
  // Lógica para extraer los links del contenido del archivo
  // Retorna un array de objetos con los campos href, text y file
  const links = [
    { href: 'https://example.com', text: 'Link de ejemplo', file: archivo },
    { href: 'https://google.com', text: 'Google', file: archivo },
    { href: 'https://openai.com', text: 'OpenAI', file: archivo }
  ];
  return links;
};

// Ejemplo de uso
mdLinks('/ruta/a/validar', {});