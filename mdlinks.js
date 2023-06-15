/* import path from 'path'; */
import { readFile } from 'fs';
import { statSync } from 'fs';
import { extname } from 'path';
import { readdirSync } from 'fs';
import fs from 'fs';
import chalk from 'chalk';


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
 
    const stats = statSync(ruta);
    if (stats.isFile()) {
      const extension = extname(ruta);
      return extension;
    } else {
      // throw new TypeError('La ruta no corresponde a un archivo');
      return 'La ruta no corresponde a un archivo'
    }

};
 

export function obtenerContenidoDirectorio(rutaDirectorio){
    const contenido = readdirSync(rutaDirectorio);
    return contenido;
  
}; 

