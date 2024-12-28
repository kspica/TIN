class Student {
    constructor(imie, nazwisko) {
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.oceny = [];
        this.srednia = 0;
    }

    dodajOcene(ocena) {
        this.oceny.push(ocena);
        this.obliczSrednia();
    }

    obliczSrednia() {
        if (this.oceny.length > 0) {
            this.srednia = this.oceny.reduce((suma, ocena) => suma + ocena, 0) / this.oceny.length;
        } else {
            this.srednia = 0;
        }
    }

    hello() {
        return `Witaj ${this.imie} ${this.nazwisko}, Twoja średnia ocen to: ${this.srednia.toFixed(2)}.`;
    }
}

let s = new Student('Jan', 'Kowalski');
console.log(s.hello());

s.dodajOcene(5);
s.dodajOcene(4);
s.dodajOcene(3);
console.log(s.hello());
