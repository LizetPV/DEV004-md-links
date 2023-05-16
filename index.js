//comando
import leerArchivo from './mdlinks.js';
import { obtenerExtensionArchivo } from './mdlinks.js';
import { obtenerContenidoDirectorio } from './mdlinks.js';
import chalk from 'chalk';

import axios from 'axios';

const rutaArchivo = './PRUEBAS/ejemplo.md';

leerArchivo(rutaArchivo, (error, data) => {
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
  axios.head(url)
    .then(response => {
      if (response.status === 200) {
        console.log(chalk.bold.white.bgGreen`${url} está en buen estado`);
      } else {
        console.log(chalk.bgRed`${url} está rota`);
      }
    })
    .catch(error => {
      console.error(chalk.bgRed`Error al validar ${url}: ${error.message}`);
    });
}

const ruta = './PRUEBAS/ejemplos.md';
try {
  const extension = obtenerExtensionArchivo(ruta);
  console.log(chalk.bgMagenta`La extensión del archivo es: ${extension}`);

} catch (error) {
  console.error(error);
}


const rutaDirectorio = './PRUEBAS';

try {
  const contenido = obtenerContenidoDirectorio(rutaDirectorio);
  console.log(chalk.bgYellowBright`Contenido del directorio: ${contenido}`);
} catch (error) {
  console.error(error);
}