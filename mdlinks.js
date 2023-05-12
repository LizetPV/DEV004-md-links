import path from 'path';
import fs from 'fs';

import { logSuccess, logWarning, logError, logResultsBox } from './logger.js';
import { AsyncLocalStorage } from 'async_hooks';
import { error } from 'console';
import { setUncaughtExceptionCaptureCallback } from 'process';
import { promises } from 'dns';

export const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    determinarExistencia(ruta)
      .then((existeRuta) => {
        if (existeRuta) {
          const esAbsoluta = esRutaAbsoluta(ruta);

          if (!esAbsoluta) {
            const nuevaRuta = convertirARutaAbsoluta(ruta);
            return leerArchivo(nuevaRuta);
          } else {
            return leerArchivo(ruta);
          }
        } else {
          logError('La ruta especificada no existe.');
        }
      })
      .then((contenido) => {
        console.log("then contenido", contenido);
        const links = extraerLinks(contenido, ruta); // Pasa el nombre del archivo a extraerLinks
        resolve(links);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const determinarExistencia = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.access(ruta, fs.constants.F_OK, (error) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

const esRutaAbsoluta = (ruta) => {
  return path.isAbsolute(ruta);
};

const convertirARutaAbsoluta = (ruta) => {
  return path.resolve(ruta);
};

const leerArchivo = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf8', (error, contenido) => {
      if (error) {
        reject(error);
      } else {
        resolve(contenido);
      }
    });
  });
};

const extraerLinks = (contenido) => {
  console.log("EXTRAERLINKS CONTENIDO",contenido);
  // Lógica para extraer los links del contenido del archivo
  // Retorna un array de objetos con los campos href, text y file
  const links = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      file: "ejemplo.md",
    },
    {
      href: "https://nodejs.org",
      text: "Node.js",
      file: "ejemplo.md",
    },
    {
      href: "https://developers.google.com/v8/",
      text: "motor de JavaScript V8 de Chrome",
      file: "ejemplo.md",
    }
  ];

  const urls = links.map((Obj) => Obj.href);
  console.log(urls);

  const getStatus = (url) => {
    return fetch(url)
  }

  const Promesas = urls.map((url) => getStatus(url))
  console.log(Promesas);
  /*   promise.allSettled(Promesas).then((rptas) =>
      console.log(typeof rptas));
    rptas.forEach((res) => {
      console.log("res:", res.value.status);
  
    });
    .catch ((err) => console.log(err)) */

  fetch("https://developers.google.com/v8/")
    .then((rpta) => console.log(rpta.status))
    .catch((error) => console.log(error))
  return links;
};
