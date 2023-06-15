import fs from 'fs';
import { obtenerContenidoDirectorio, leerArchivo, obtenerExtensionArchivo} from './mdlinks.js';
import { error } from 'console';


describe('leerArchivo', () => {
  test('debe leer correctamente el archivo y llamar al callback con los datos', (done) => {
    const rutaArchivo = './PRUEBAS/PRUEBATEST.MD';
    const contenidoEsperado = '[Markdown](https://es.wikipedia.org/wiki/Markdown)';

    leerArchivo(rutaArchivo, (error, data) => {
      expect(error).toBeNull();
      expect(data).toBe(contenidoEsperado);
      done();
    });
  });

  test('debe llamar al callback con un error si hay un error al leer el archivo', (done) => {
    const rutaArchivo = './PRUEBAS/ejemplo.md';

    leerArchivo(rutaArchivo, (error, data) => {
      expect(error).toBeDefined();
      done();
    });
  });

  test('debe llamar al callback con un error si hay un error al leer el archivo', (done) => {
    const rutaArchivo = 'ruta/al/archivo_inexistente.txt';

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

    const extensionObtenida = obtenerExtensionArchivo(rutaArchivo);

    expect(extensionObtenida).toBe(extensionEsperada);
  });

  test('debe retornar un mensaje de error si la ruta no corresponde a un archivo', () => {
    const rutaDirectorio = './PRUEBAS';

    expect(
      obtenerExtensionArchivo(rutaDirectorio)
    ).toBe('La ruta no corresponde a un archivo')
  });

  test('debe lanzar un error si la ruta no existe', () => {
    const rutaDirectorio = './aaa';
    
    const mensajeEsperado  =  `ENOENT: no such file or directory, stat '${rutaDirectorio}'`

    expect( () => obtenerExtensionArchivo(rutaDirectorio)
    ).toThrow(mensajeEsperado)
  });
  
});


describe('obtenerContenidoDirectorio', () => {
  test('debe retornar el contenido del directorio correctamente', () => {
    const rutaDirectorio = './PRUEBAS';
    const contenidoEsperado = ['ejemplo.md', 'EJEMPLO2.md', 'PRUEBATEST.MD'];
    const contenidoObtenido = obtenerContenidoDirectorio(rutaDirectorio);

    expect(contenidoObtenido).toEqual(contenidoEsperado);
  });

  test('debe lanzar un error si ocurre un error al obtener el contenido del directorio', () => {
    const rutaDirectorio = './PRUEBAS';
    obtenerContenidoDirectorio(rutaDirectorio)
    
  });
});
