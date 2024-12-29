let previousStockData = {};
let newsHistory = [];
let currentNewsIndex = 0;

  function updateNewsRotator() {
    const newsRotator = document.getElementById('newsRotator');
    newsRotator.innerHTML = '';

    newsHistory.forEach((news, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = news;
      newsRotator.appendChild(listItem);
    });
  }

  async function fetchData() {
    try {
      const response = await fetch('https://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php');
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      const data = await response.json();

      const stockTable = document.getElementById('stockData');
      stockTable.innerHTML = '';

      for (const [firma, wartosc] of Object.entries(data.stock)) {
        const row = document.createElement('tr');

        let arrow = '';
        if (previousStockData[firma] !== undefined) {
          if (wartosc > previousStockData[firma]) {
            arrow = '<span class="arrow arrow-up">▲</span>';
          } else if (wartosc == previousStockData[firma]) {
            arrow = '<span class="const">-</span>';
          } else if (wartosc < previousStockData[firma]) {
            arrow = '<span class="arrow arrow-down">▼</span>';
          }
        }

        row.innerHTML = `<td>${firma}</td><td>${wartosc}${arrow}</td>`;
        stockTable.appendChild(row);
      }

      previousStockData = { ...data.stock };

      if (!newsHistory.includes(data.news)) {
        newsHistory.push(data.news);
        if (newsHistory.length > 3) {
          newsHistory.shift();
        }
      }

      updateNewsRotator();
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania danych:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    setInterval(fetchData, 10000);
    setInterval(updateNewsRotator, 10000);
  });