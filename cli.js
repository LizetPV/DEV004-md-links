import { join } from 'path';

const ruta1 = '../PRUEBAS/EJEMPLO2.md';
const ruta2 = './ejemplo.md';

const rutaUnida = join(ruta1, ruta2);

console.log(rutaUnida);