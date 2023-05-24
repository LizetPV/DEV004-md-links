//comando
import leerArchivo from './mdlinks.js';
import { obtenerExtensionArchivo } from './mdlinks.js';
import { obtenerContenidoDirectorio } from './mdlinks.js';
import chalk from 'chalk';

import axios from 'axios';
import path from 'path';
import fs from 'fs';

const rutaArchivo = './PRUEBAS/ejemplo.md'; // funcion que me muestra las rutas de los archivos

if (fs.existsSync(rutaArchivo)) {
  const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
  const regex = /\[(.*?)\]\((.*?)\)/g;
  let match;

  while ((match = regex.exec(contenido)) !== null) {
    const texto = match[1];
    const enlace = match[2];
    let tipoContenido;

    if (enlace.startsWith('http://') || enlace.startsWith('https://')) {
      tipoContenido = 'href';
    } else if (fs.existsSync(enlace)) {
      tipoContenido = 'file';
    } else {
      tipoContenido = 'text';
    }

    console.log(chalk.bgYellow(`Tipo de contenido: ${tipoContenido}`));
    console.log(chalk.bgWhite(`Texto: ${texto}`));
    console.log(chalk.bgBlue(`Enlace: ${enlace}`));
    console.log('---');
  }
} else {
  console.log(chalk.bgRed('El archivo no existe'));
}

 leerArchivo(rutaArchivo, (error, data) => { // funcion que me muestra unicamente las url de un archivo

  if (error) {
    console.error(error);
    return;
  }

  const regex = /\[(.*?)\]\((.*?)\)/g;
  let match;

  while ((match = regex.exec(data)) !== null) {
    const enlace = match[2];
    validarURL(enlace);
  }
}); 

 function validarURL(url) {
  axios.get(url)
    .then(response => {
      if (response.status === 200) {
        console.log(chalk.bold.white.bgGreen`${url} está en buen estado`);
      } else {
        console.log(chalk.bgRed`${url} está rota`);
        cantidadRotos++;
      }
    })
    .catch(error => {
      console.error(chalk.bgRed`Error al validar ${url}: ${error.message}`);
      cantidadRotos++;
    });
} 

const ruta = './PRUEBAS/ejemplo.md'; // funcion de extension del archivo
try {
  const extension = obtenerExtensionArchivo(ruta);
  console.log(chalk.bgMagenta`La extensión del archivo es: ${extension}`);
  console.log('---');

} catch (error) {
  console.error(error);
}


const rutaDirectorio = './PRUEBAS'; // funcion que me muestra el contenido de un directorio

try {
  const contenido = obtenerContenidoDirectorio(rutaDirectorio);
  console.log(chalk.bgYellowBright`Contenido del directorio: ${contenido}`);
  console.log('---');
} catch (error) {
  console.error(error);
} 

export {
  obtenerExtensionArchivo,
  obtenerContenidoDirectorio,
  validarURL,
  leerArchivo
};