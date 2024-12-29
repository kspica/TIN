  class Auto {
    constructor(rok, przebieg, cena_wyjsciowa, cena_koncowa) {
      this.rok = rok;
      this.przebieg = przebieg;
      this.cena_wyjsciowa = cena_wyjsciowa;
      this.cena_koncowa = cena_koncowa;
    }
  }

  const autos = [
    new Auto(2015, 120000, 25000, 23000),
    new Auto(2018, 85000, 30000, 28000),
    new Auto(2020, 40000, 35000, 33000),
    new Auto(2017, 105000, 20000, 19000)
  ];

  function createTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const headers = ['Rok', 'Przebieg', 'Cena Wyjściowa', 'Cena Końcowa'];

    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    autos.forEach(auto => {
      const row = document.createElement('tr');

      const rokCell = document.createElement('td');
      rokCell.textContent = auto.rok;
      row.appendChild(rokCell);

      const przebiegCell = document.createElement('td');
      przebiegCell.textContent = auto.przebieg;
      row.appendChild(przebiegCell);

      const cenaWyjsciowaCell = document.createElement('td');
      cenaWyjsciowaCell.textContent = auto.cena_wyjsciowa + ' PLN';
      row.appendChild(cenaWyjsciowaCell);

      const cenaKoncowaCell = document.createElement('td');
      cenaKoncowaCell.textContent = auto.cena_koncowa + ' PLN';
      row.appendChild(cenaKoncowaCell);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const tableContainer = document.getElementById('carTableContainer');
    tableContainer.appendChild(table);
  }

  createTable();