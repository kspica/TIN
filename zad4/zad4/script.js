    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('visible');
        navList.classList.toggle('hidden');
    });
