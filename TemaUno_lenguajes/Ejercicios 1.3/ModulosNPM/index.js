import generateName from 'sillyname';
import superheroes, { randomSuperhero } from 'superheroes';

//Sillyname
const sillyName = generateName();
console.log(`nombre generado: ${sillyName}`);

//Desafio 2 SuperHero
const hero = randomSuperhero();
console.log(`Hola soy ${hero} el caballero de la noche`);
