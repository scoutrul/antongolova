## Добавление нового кейса (RU)

1. Медиа: сложи ассеты в `public/assets/cases/<slug>/` (имя папки = id/slug кейса).
2. Контент: создай `src/data/ru/cases/<slug>.json` по примеру существующих файлов и укажи пути к медиа из шага 1.
3. Карточка: добавь элемент в `src/data/ru/cases.json` (slug/title/description/image), `image` — обложка из `public/assets/cases/<slug>/`.
4. Стор: в `src/stores/cases.js` импортируй новый json и добавь его в `casesRu` (и в `casesEn`, если есть перевод).\*\*\*
