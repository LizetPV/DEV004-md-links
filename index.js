//comando
import { mdLinks } from "./mdlinks.js";

// Función para procesar los resultados de los links
const procesarLinks = (links) => {
    console.log('Links encontrados:');
    links.forEach((link) => {
      console.log(`- ${link}`);
    });
  };
  
  // Llamar a la función mdLinks con la ruta y opciones deseadas
  const ruta = '/ruta/a/validar';
  const opciones = {};
  
  mdLinks(ruta, opciones)
    .then((links) => {
      procesarLinks(links);
    })
    .catch((error) => {
      console.error(error);
    });

mdLinks(ruta, opciones);