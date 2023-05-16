import path from 'path';
import { readFile } from 'fs';
import { statSync } from 'fs';
import { extname } from 'path';
import { readdirSync } from 'fs';
import chalk from 'chalk';

const leerArchivo = (rutaArchivo, callback) => {
  readFile(rutaArchivo, 'utf8', (error, data) => {
    if (error) {
      callback(error);
      return;
    }

    callback(null, data);
  });
};

export default leerArchivo;

export const obtenerExtensionArchivo = (ruta) => {
  try {
    const stats = statSync(ruta);
    if (stats.isFile()) {
      const extension = extname(ruta);
      return extension;
    } else {
      throw new Error('La ruta no corresponde a un archivo');
    }

  } catch (error) {
    throw error;
  }
};
 

export const obtenerContenidoDirectorio = (rutaDirectorio) => {
  try {
    const contenido = readdirSync(rutaDirectorio);
    return contenido;
  } catch (error) {
    throw error;
  }
}; 