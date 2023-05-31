import { obtenerContenidoDirectorio } from './mdlinks.js';
import leerArchivo from './mdlinks.js';
import { obtenerExtensionArchivo } from './mdlinks.js';

describe('leerArchivo', () => {
  test('debe leer correctamente el archivo y llamar al callback con los datos', (done) => {
    const rutaArchivo = './PRUEBAS/PRUEBATEST.MD';
    const contenidoEsperado = '[Markdown](https://es.wikipedia.org/wiki/Markdown)';

    leerArchivo(rutaArchivo, (error, data) => {
      expect(error).toBeNull();
      expect(data).toBe(contenidoEsperado);
      done();
    }, 10000); // Aumenta el tiempo de espera a 10000 ms (10 segundos)
  });

  test('debe llamar al callback con un error si hay un error al leer el archivo', (done) => {
    const rutaArchivo = './PRUEBAS/ejemplo.md';

    leerArchivo(rutaArchivo, (error, data) => {
      expect(error).toBeDefined();
      done();
    });
  });
});

describe('obtenerExtensionArchivo', () => {
  test('debe retornar la extensión del archivo correctamente', () => {
    const rutaArchivo = './PRUEBAS/ejemplo.md';
    const extensionEsperada = '.md';

    const extension = obtenerExtensionArchivo(rutaArchivo);

    expect(extension).toBe(extensionEsperada);
  });

  test('debe lanzar un error si la ruta no corresponde a un archivo', () => {
    const rutaDirectorio = './PRUEBAS/ejemplo123.md';

    expect(obtenerExtensionArchivo(rutaDirectorio)).toThrow('La ruta no corresponde a un archivo');
  });
});

describe('obtenerContenidoDirectorio', () => {
  test('debe retornar el contenido del directorio correctamente', () => {
    const rutaDirectorio = './PRUEBAS/ejemplo.md';
    const contenidoEsperado = ['ejemplo.md', 'EJEMPLO2.md'];
    const contenido = obtenerContenidoDirectorio(rutaDirectorio);

    expect(contenido).toEqual(contenidoEsperado);
  });

  test('debe lanzar un error si hay un error al obtener el contenido del directorio', () => {
    const rutaDirectorio = './PRUEBAS/ejemplo123.md';

  expect(obtenerContenidoDirectorio(rutaDirectorio)).toThrow()
  });
});
