import fs from 'fs';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';

const rutaArchivo = './PRUEBAS/ejemplo.md'; // Ruta de un archivo markdown

const mdlinks = (ruta, options) => {
  const validate = options.includes('--validate');
  const stats = options.includes('--stats');
  const links = [];

  if (fs.existsSync(ruta)) {
    const contenido = fs.readFileSync(ruta, 'utf-8');
    const regex = /\[(.*?)\]\((.*?)\)/g;
    let match;

    while ((match = regex.exec(contenido)) !== null) {
      const texto = match[1];
      const enlace = match[2];
      const rutaAbsoluta = path.resolve(ruta);
      const link = {
        archivo: rutaAbsoluta,
        enlace: enlace.slice(0, 50),
        texto: texto.slice(0, 50),
      };
      links.push(link);
    }

    if (validate) {
      const requests = links.map((link) => {
        return axios
          .get(link.enlace)
          .then((response) => {
            const statusCode = response.status;
            const statusText = response.statusText;
            link.estado = 'ok';
            link.codigo = statusCode;
            link.mensaje = statusText;
            return link;
          })
          .catch((error) => {
            if (error.response) {
              const statusCode = error.response.status;
              const statusText = error.response.statusText;
              link.estado = 'fail';
              link.codigo = statusCode;
              link.mensaje = statusText;
            } else {
              link.estado = 'fail';
              link.mensaje = error.message;
            }
            return link;
          });
      });

      Promise.all(requests).then(() => {
        imprimirLinks(links, stats);
      });
    } else {
      imprimirLinks(links, stats);
    }
  } else {
    console.log(chalk.red('El archivo no existe'));
  }
};

const imprimirLinks = (links, stats) => {
  console.log({ links, stats })
  links.forEach((link) => {
    console.log(chalk.white(`Archivo: ${link.archivo}`));
    console.log(chalk.cyan(`Enlace: ${link.enlace}`));
    console.log(chalk.yellow(`Texto: ${link.texto}`));
    if (link.estado) {
      if (link.estado === 'ok') {
        console.log(chalk.bgGreen(`Estado: ${link.estado}`));
      } else {
        console.log(chalk.bgRed(`Estado: ${link.estado}`));
      }
      console.log(chalk.blue(`Código: ${link.codigo}`));
      console.log(chalk.magenta(`Mensaje: ${link.mensaje}`));
    }
    console.log('---');
  });

  if (stats) {
    const total = links.length;
    const unicos = obtenerLinksUnicos(links);
    const rotos = obtenerLinksRotos(links);

    console.log(chalk.bold(`Total: ${total}`));
    console.log(chalk.bold(`Únicos: ${unicos}`));
    console.log(chalk.bold(`Rotos: ${rotos}`));
  }
};

const obtenerLinksUnicos = (links) => {
  const enlacesUnicos = new Set();
  links.forEach((link) => {
    enlacesUnicos.add(link.enlace);
  });
  return enlacesUnicos.size;
};

const obtenerLinksRotos = (links) => {
  let rotos = 0;
  links.forEach((link) => {
    if (link.estado && link.estado === 'fail') {
      rotos++;
    }
  });
  return rotos;
};

mdlinks(rutaArchivo, ['--validate', '--stats']);
