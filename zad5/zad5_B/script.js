$(document).ready(function() {
        function loadGalleries() {
            $.get('https://jsonplaceholder.typicode.com/albums', function(data) {
                $('#gallery-container').empty();
                data.forEach(album => {
                    $('#gallery-container').append(`
                    <div class="gallery-item" data-id="${album.id}" data-title="${album.title}">
                        Galeria: ${album.title}
                    </div>
                `);
                });
            });
        }

        $(document).on('click', '.gallery-item', function() {
            const albumId = $(this).data('id');
            const albumTitle = $(this).data('title');

            $('#album-title').text(`Galeria: ${albumTitle}`);
            $('#album-container').show();
            $('#gallery-container').hide();

            $.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`, function(data) {
                $('#photos-container').empty();
                data.slice(0,3).forEach(photo => {
                    $('#photos-container').append(`
                    <a href="${photo.url}" data-lightbox="album" data-title="${photo.title}">
                        <img src="${photo.thumbnailUrl}" alt="${photo.title}" />
                    </a>
                `);
                });
            });

            $('#add-photo-form').off('submit').on('submit', function(e) {
                e.preventDefault();
                const newPhoto = {
                    albumId: albumId,
                    title: $('#photo-title').val(),
                    url: $('#photo-url').val(),
                    thumbnailUrl: $('#photo-url').val()
                };

                $.post('https://jsonplaceholder.typicode.com/photos', newPhoto, function(response) {
                    alert('Zdjęcie zostało dodane!');
                    $('#photos-container').append(`
                    <a href="${response.url}" data-lightbox="album" data-title="${response.title}">
                        <img src="${response.thumbnailUrl}" alt="${response.title}" />
                    </a>
                `);
                    $('#photo-title').val('');
                    $('#photo-url').val('');
                });
            });
        });

        $('#back-to-gallery').click(function() {
            $('#album-container').hide();
            $('#gallery-container').show();
        });

        loadGalleries();
    });