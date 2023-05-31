/* import path from 'path'; */
import { readFile } from 'fs';
import { statSync } from 'fs';
import { extname } from 'path';
import { readdirSync } from 'fs';
import fs from 'fs';
import chalk from 'chalk';

export function obtenerTipoContenido(rutaArchivo) {
  if (fs.existsSync(rutaArchivo)) {
    const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
    const regex = /\[(.*?)\]\((.*?)\)/g;
    let match;
    const resultados = [];

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

      resultados.push({
        tipo: tipoContenido,
        texto,
        enlace,
      });
    }

    return resultados;
  } else {
    throw new Error('El archivo no existe');
  }
}

export function leerArchivo(rutaArchivo, callback) {
  readFile(rutaArchivo, 'utf8', (error, data) => {
    if (error) {
      callback(error);
      return;
    }

    callback(null, data);
  });
};

export default leerArchivo;

export function obtenerExtensionArchivo(ruta){
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
 

export function obtenerContenidoDirectorio(rutaDirectorio){
  try {
    const contenido = readdirSync(rutaDirectorio);
    return contenido;
  } catch (error) {
    throw error;
  }
}; 

