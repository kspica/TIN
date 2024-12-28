import { Ocena } from './Ocena.js';
import { Student } from './Student.js';

let s = new Student('Jan', 'Kowalski');
console.log(s.hello());

const ocenaMatematyka = new Ocena('Matematyka', 5);
const ocenaInformatyka = new Ocena('Informatyka', 4);

s.dodajOcene(ocenaMatematyka);
s.dodajOcene(ocenaInformatyka);

console.log(s.hello());
