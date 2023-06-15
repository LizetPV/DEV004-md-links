/* import path from 'path'; */
import { readFile } from 'fs';
import { statSync } from 'fs';
import { extname } from 'path';
import { readdirSync } from 'fs';
import fs from 'fs';
import chalk from 'chalk';

// Esta funcion permite leer el contenido de un archivo en una ruta especifica
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

// funcion verifica si una ruta corresponde a un archivo valido, si es asi devuelve la extension del archivo.
export function obtenerExtensionArchivo(ruta){
 
    const stats = statSync(ruta);
    if (stats.isFile()) {
      const extension = extname(ruta);
      return extension;
    } else {
      
      return 'La ruta no corresponde a un archivo'
    }

};
 
// esta funcion valida el contenido del directorio y lo devuelve como resultado 
export function obtenerContenidoDirectorio(rutaDirectorio){
    const contenido = readdirSync(rutaDirectorio);
    return contenido;
  
}; 

