import { mdLinks } from "../mdlinks.js";
import { determinarExistencia } from "../mdlinks.js";

describe("determinarExistencia",() => {
  it("deberia retornar que no existe", () => {
    determinarExistencia(...)
  })
})

  describe("determinarExistencia",() => {
    it("deberia retornar que si existe", () => {
      determinarExistencia(...)
    })
})

describe('mdLinks', () => {

  it('mdLinks procesa  un solo archivo con 3 links', () => {
    const ruta = "ejemplo.md";

    return mdLinks(ruta, { validate: false })
      .then(
        (Array) => {
          expect(Array).toEqual([
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
          ])
        }
      )
  });

});
