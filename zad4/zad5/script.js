// Pobieramy wszystkie nagłówki akordeonu
const headers = document.querySelectorAll('.accordion-header');

// Dodajemy nasłuchiwanie kliknięcia na każdy nagłówek
headers.forEach(header => {
    header.addEventListener('click', function() {
        // Pobieramy zawartość sekcji
        const content = this.nextElementSibling;

        // Sprawdzamy, czy zawartość jest już widoczna
        const isVisible = content.classList.contains('show');

        // Zwinięcie wszystkich sekcji
        const allContents = document.querySelectorAll('.accordion-content');
        allContents.forEach(content => {
            content.classList.remove('show');
        });

        // Jeśli zawartość nie była widoczna, rozwijamy ją
        if (!isVisible) {
            content.classList.add('show');
        }
    });
});
