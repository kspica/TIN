const auto1 = {
    rok: 2015,
    przebieg: 150000,
    cena_wyjsciowa: 30000,
    cena_koncowa: 30000,

};
const auto2 = {
    rok: 2016,
    przebieg: 160000,
    cena_wyjsciowa: 31000,
    cena_koncowa: 31000,

};
const auto3 = {
    rok: 2017,
    przebieg: 170000,
    cena_wyjsciowa: 32000,
    cena_koncowa: 32000,

};

const samochody = [
    auto1,
    auto2,
    auto3
];

function dodajAutoDoTablicy(samochod) {
    if (samochod.cena_wyjsciowa > 10000) {
        samochody.push(samochod);
        console.log("Auto dodane do tablicy!");
    } else {
        console.log("Auto nie spełnia wymagań cenowych.");
    }
}

function zwiekszRokDlaWszystkichAut() {
    samochody.forEach(auto => {
        auto.rok += 1;
    });
    console.log("Rok dla wszystkich aut został zwiększony o 1.");
}

const noweAuto = {
    rok: 2021,
    przebieg: 30000,
    cena_wyjsciowa: 11000,
    cena_koncowa: 12000};

dodajAutoDoTablicy(noweAuto);

console.log("Samochody przed zmianą roku:");
samochody.forEach(auto => {
    console.log(`Rok: ${auto.rok}, Cena końcowa: ${auto.cena_koncowa}`);
});

zwiekszRokDlaWszystkichAut();

console.log("Samochody po zmianie roku:");
samochody.forEach(auto => {
    console.log(`Rok: ${auto.rok}, Cena końcowa: ${auto.cena_koncowa}`);
});
