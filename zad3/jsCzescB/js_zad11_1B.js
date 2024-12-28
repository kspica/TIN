const auto = {
    rok: 2000,
    przebieg: 150000,
    cena_wyjsciowa: 20000,
    cena_koncowa: 20000,

    powiekszCeneWyjsciowa: function() {
        this.cena_wyjsciowa += 1000;
    },

    obnizCenaZaWiek: function() {
        const wiek = new Date().getFullYear() - this.rok;
        if(this.cena_koncowa < wiek * 1000) {
            console.log('Cena nie może być ujemna');
        } else {
            this.cena_koncowa -= wiek * 1000;
            }
    },

    obnizCenaZaPrzebieg: function() {
        const km = this.przebieg;
        const obnizka = Math.floor(km / 100000) * 10000;
        if(this.cena_koncowa < obnizka) {
            console.log('Cena nie może być ujemna');
        } else {
            this.cena_koncowa -= obnizka;
        }
    },

    aktualizujPrzebiegIRok: function(nowyRok, nowyPrzebieg) {
        this.rok = nowyRok;
        this.przebieg = nowyPrzebieg;
        this.updateCenaKoncowa();
    },

    updateCenaKoncowa: function() {
        this.cena_koncowa = this.cena_wyjsciowa;
        this.obnizCenaZaWiek();
        this.obnizCenaZaPrzebieg();
    }
};



console.log("Cena początkowa:", auto.cena_koncowa);

auto.powiekszCeneWyjsciowa();
console.log("Cena wyjściowa po powiększeniu o 1000:", auto.cena_wyjsciowa);

auto.obnizCenaZaWiek();
console.log("Cena końcowa po obniżeniu za wiek auta:", auto.cena_koncowa);

auto.obnizCenaZaPrzebieg();
console.log("Cena końcowa po obniżeniu za przebieg auta:", auto.cena_koncowa);

auto.aktualizujPrzebiegIRok(2020, 180000);
console.log("Cena po zaktualizowaniu roku i przebiegu:", auto.cena_koncowa);
