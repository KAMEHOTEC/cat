function hide(a) {//функция скрытия всех блоков и показа нужного
    pfoto = document.getElementById('urlfoto')
    pname = document.getElementById('catname')
    pday = document.getElementById('birthday')
    pcolor = document.getElementById('color')
    psex = document.getElementById('sex')
    pdop = document.getElementById('dopinfa')
    document.querySelectorAll('img.ubrdoba').forEach(img => img.style.display = 'none'); // убрать добавленные фотки котят


    for (let i = 0; i < document.getElementsByClassName('cat').length; i++) { document.getElementsByClassName('cat')[i].style.display = 'none' }// очистка страницы
    if (a !== "history") { document.getElementById('kot').style.display = 'block' }
    else { document.getElementById('history').style.display = 'block' }
    if (a === 'kitties-0225') {// если выбрали раздел котят февраля 2025 (0225)
        pfoto.style.display = 'none'
        pname.textContent = "Котята 02-25"
        pday.style.display = "none"
        pcolor.style.display = "none"
        psex.style.display = "none"
        pdop.style.display = "none"

        const blocksWithKitties = document.querySelectorAll('.blok img.kitties-0225');

        // Создаем массив URL-адресов изображений
        const kittiesUrls = Array.from(blocksWithKitties).map(img => img.src);

        // Создаем новый div для фотографий если у них класс .kits
        const kitsContainer = document.createElement('div');
        kitsContainer.className = 'kits';

        // Добавляем каждое изображение в новый контейнер
        kittiesUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Котёнок';
            img.className = 'ubrdoba';
            img.className = 'ubrdoba zoomable-image '; // Добавляем классы
            img.setAttribute('onclick', 'toggleZoom(this)'); // Добавляем атрибут onclick
            kitsContainer.appendChild(img);

        });

        // Вставляем контейнер в DOM (например, в конец body)
        document.body.appendChild(kitsContainer);

    } else {
        pfoto.style.display = 'block'
        // pname.textContent = "Котята 02-25"
        pday.style.display = "block"
        pcolor.style.display = "block"
        psex.style.display = "block"
        pdop.style.display = "block"
        // Данные о крупных котах для подгрузки
        const z = [['mario', kittiesPhotos['mario'], 'Марио', '2008 год', 'Голубой', 'Мужской', 'Отсуствует'],
        ['saimon', kittiesPhotos['saimon'], 'Саймон', '2019 год', 'Снежный барс', 'Мужской', 'Отсутствует'],
        ['nensi', kittiesPhotos['nensi'], 'Ненси', '2020 год', 'Черепаха', 'Женский', 'Отсутствует'],
        ['margo', kittiesPhotos['margo'], 'Марго', '2024 год', 'Черепаха', 'Женский', 'Отсуствует']]

        for (i = 0; i < z.length; i++) {
            if (a === z[i][0]) {
                pfoto.src = z[i][1];
                pfoto.alt = z[i][2];
                pname.textContent = z[i][2];
                pday.innerHTML = 'Дата рождения: <span style="color: red; font-size: 2.5rem";>' + z[i][3] + '</span>';
                // document.getElementById('birthday').textContent='Дата рождения: '+z[i][3];
                pcolor.textContent = 'Окрас: ' + z[i][4];
                psex.textContent = 'Пол: ' + z[i][5];
                pdop.textContent = 'Дополнительная информация: ' + z[i][6];
                break;
            }
        }
    }
}

document.querySelectorAll('date').forEach(el => el.title = 'Дата публикации');//делаем всем датам title

function toggleZoom(img) {// функция зума фотки
    img.classList.toggle('zoomed');
}
// Словарь с фотками котят и котов через  спецслово для .image-tooltip и не только
const kittiesPhotos = {
    'g-0225': 'https://i.ibb.co/gHmWc86/image.jpg',
    'chb-0225': 'https://i.ibb.co/ZpKt8r1g/1-2024.jpg',
    'chch-0225': 'https://i.ibb.co/673qqmP0/0225.jpg',
    'rr-0225': 'https://i.ibb.co/gFHbRNj2/2025.jpg',
    'rb-0225': 'https://i.ibb.co/qLDLNVcT/2024-2.jpg',
    'mario': 'https://i.ibb.co/b5H5vywC/2025.jpg',
    'margo': 'https://i.ibb.co/RkxWTV0B/2025.jpg',
    'nensi': 'https://i.ibb.co/QvQYkvGy/2025.jpg',
    'saimon': 'https://i.ibb.co/fVRk1CgM/2025.jpg',
};
document.addEventListener('DOMContentLoaded', function () {// СОздаём подсказку при наведении на имя(название) кота, для вывода фото
    tippy('.image-tooltip', {
        content: (element) => {
            const imageKey = element.getAttribute('data-image');
            const imageUrl = kittiesPhotos[imageKey];
            return `<img src="${imageUrl}" style="max-width: 300px; max-height: 25rem;" alt="Фото-подсказка" class="zoomable-image" >`;
        },
        allowHTML: true, // Разрешить HTML-контент
        placement: 'auto', // Автоматически корректировать позицию у краёв
        interactive: true, // Чтобы подсказку можно было навести курсором
        arrow: true, // Показать стрелку
    });
})
