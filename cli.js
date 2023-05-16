import { join } from 'path';
import { readdirSync, statSync } from 'fs';


const ruta1 = '../PRUEBAS/EJEMPLO2.md';
const ruta2 = './ejemplo.md';

const rutaUnida = join(ruta1, ruta2);

console.log(rutaUnida);

const obtenerContenidoDirectorio = (rutaDirectorio) => { // consultar sobre esta funcion de recursividad para que quede mas claro
  try {
    const archivos = readdirSync(rutaDirectorio);
    archivos.forEach((archivo) => {
      const rutaArchivo = join(rutaDirectorio, archivo);
      const stats = statSync(rutaArchivo);
      if (stats.isDirectory()) {
        // Si es un directorio, aplicar recursividad
        obtenerContenidoDirectorio(rutaArchivo);
      } else {
        // Si es un archivo, realizar alguna operación
        console.log(`Archivo encontrado: ${rutaArchivo}`);
      }
    });
  } catch (error) {
    throw error;
  }
};

// Llamada inicial a la función
const rutaDirectorio = './PRUEBAS';
obtenerContenidoDirectorio(rutaDirectorio);