import {Ocena} from "./Ocena.js";

export class Student {
    constructor(imie, nazwisko) {
        this.imie = imie; // Imię studenta
        this.nazwisko = nazwisko; // Nazwisko studenta
        this._oceny = []; // Tablica ocen
        this.srednia = 0; // Pole na średnią ocen
    }

    dodajOcene(ocena) {
        if (ocena instanceof Ocena) {
            this._oceny.push(ocena);
            this.obliczSrednia();
        } else {
            console.log("Wartość musi być obiektem klasy Ocena!");
        }
    }

    obliczSrednia() {
        if (this._oceny.length > 0) {
            this.srednia = this._oceny.reduce((suma, ocena) => suma + ocena.wartosc, 0) / this._oceny.length;
        } else {
            this.srednia = 0;
        }
    }

    get oceny() {
        return this._oceny.map(ocena => `Przedmiot: ${ocena.przedmiot} - ocena ${ocena.wartosc}`).join(' ');
    }

    hello() {
        return `Witaj ${this.imie} ${this.nazwisko}, Twoja średnia ocen to: ${this.srednia.toFixed(2)}.`;
    }
}
