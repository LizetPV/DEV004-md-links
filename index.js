//comando
import leerArchivo from './mdlinks.js';
import { obtenerExtensionArchivo } from './mdlinks.js';
import { obtenerContenidoDirectorio } from './mdlinks.js';


const rutaArchivo = './ejemplo.md';

leerArchivo(rutaArchivo, (error, data) => {
  if (error) {
    console.error(error, "ruta no existe");
    return;
  }
  
  console.log(data);
});

const ruta = './ejemplo.md';
try {
  const extension = obtenerExtensionArchivo(ruta);
  console.log(`La extensión del archivo es: ${extension}`);
} catch (error) {
  console.error(error);
}


const rutaDirectorio = '../dev004-md-links';

try {
  const contenido = obtenerContenidoDirectorio(rutaDirectorio);
  console.log(`Contenido del directorio: ${contenido}`);
} catch (error) {
  console.error(error);
}