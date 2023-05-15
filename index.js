//comando
import leerArchivo from './mdlinks.js';
import { obtenerExtensionArchivo } from './mdlinks.js';

const rutaArchivo = './ejemplo.md';

leerArchivo(rutaArchivo, (error, data) => {
  if (error) {
    console.error(error);
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
