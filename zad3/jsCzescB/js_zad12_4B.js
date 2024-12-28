import { Ocena } from './Ocena.js';
import { Student } from './Student.js';

let s = new Student('Jan', 'Kowalski');

const ocenaWPR = new Ocena('WPR', 4);
const ocenaTIN = new Ocena('TIN', 3);
const ocenaPOJ = new Ocena('POJ', 2);

s.dodajOcene(ocenaWPR);
s.dodajOcene(ocenaTIN);
s.dodajOcene(ocenaPOJ);

console.log(s.oceny);