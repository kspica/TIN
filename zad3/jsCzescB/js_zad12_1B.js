export class Ocena {
    constructor(przedmiot, wartosc) {
        this.przedmiot = przedmiot;
        this.wartosc = wartosc;
    }
}

let ocena = new Ocena("matematyka", 5);
console.log(ocena);