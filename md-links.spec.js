import { mdLinks, obtenerTipoContenido } from "./mdlinks.js";
import { leerArchivo, validarURL } from "./index.js";
import axios from "axios";
jest.mock("axios");

describe('obtenerTipoContenido', () => {
  test('debe retornar los tipos de contenido correctamente', () => {
    const resultados = obtenerTipoContenido('./PRUEBAS/ejemplo.md');
    expect(resultados).toEqual([
      { tipo: 'href', texto: 'Markdown', enlace: 'https://es.wikipedia.org/wiki/Markdown' },
      { tipo: 'href', texto: 'Node.js', enlace: 'https://nodejs.org/' },
      {
        tipo: 'href',
        texto: 'motor de JavaScript V8 de Chrome',
        enlace: 'https://developers.google.com/v8/',
      },
    ]);
  });

  test('debe lanzar un error si el archivo no existe', () => {
    expect(() => obtenerTipoContenido('./ruta/inexistente.md')).toThrow('El archivo no existe');
  });
});


