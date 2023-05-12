//comando
import { mdLinks } from "./mdlinks.js";
import { logResultsBox } from "./logger.js";

// Función para procesar los resultados de los links
const procesarLinks = (links) => {
  logResultsBox(links); // Muestra los resultados en la consola usando logResultsBox
  
};
  
// Llamar a la función mdLinks con la ruta y opciones deseadas
const ruta = './PRUEBAS';
const opciones = {};

mdLinks(ruta, opciones)
  .then((links) => {
    procesarLinks(links);
  })
  .catch((error) => {
    console.error(error);
  });