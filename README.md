# YandexSHRI-1

## Шаблоны выполнены в соответствии со стилями, кроме круговой диаграммы, она немного отличается от макета, из - за нехватки времени пришлось оставить так, как есть. 

Более того, выбрал я , скорее всего, не тот способ отображения диаграммы, как мне кажется через javascript canvas очень тяжело её стилизовать для соответствия шаблону.

## Небольшие уточнения в шаблоне:

* В 1 и 2 слайде, в макете Figma , у участника на 5 месте над аватаркой расположена иконка "палец вверх" вопреки входным данным, т.к в данных для этих слайдов нет ключа: "selectedUserId". Соответственно в 1 и 2 слайде иконка "палец вверх" отсутствует.
* Кнопки переключения страниц в исходниках были названы не по назначению, button_hover_dark и button_dark переименовал местами, чтобы относительно кнопок светлой темы соблюдалась последовательность.
* В шаблоне Chart, "Строки кода", где максимальное значение 74156 уменьшил шрифт условием "Если больше 10 000, то ...", чтобы отображение не вызывало раздражение)
* Шаблон Diagam, конечно не идеален, за то он универсальный для любой входящей информации :) Хотел добавить поддержку отображения более 4 элементов, но из - за нехватки времени перешел к следующему шаблону. В принципе этот шаблон выведет и 10 элементов диаграммы, просто цвета для них неопределены, была идея сделать сдвиг по HEX, но опять же, время сыграло свою роль.
* В шаблоне Activity немного поменял svg картинки, чтобы они не отображались слишком тусклыми.
* Данные для шаблонов получаю ассинхронным запросом к файлу data.json из index.ejs.

Используемые библиотеки:
=
React 
-
Использование React в верстке меня постоянно вдохновляет, потому что эта библиотека не такая простая, как JQuery, и не такая заковыристая как Angular 11, в то же время очень нравится их концепция внутренних React объектов, так же она крайне гибкая, благодаря хукам, порталам и рефам :)

---

Express.js
-
Express.js выбрал из - за гибкости и простоты создания сервера на Node.js, так же преимуществомм является middleware static, который упрощает процесс инициализации всех статичных файлов веб - приложения, коих достаточно много. Так же преимуществом является простая интеграция интерпретатора EJS, суть которого очень похожа на встроенный интерпретатор PHP, благодаря EJS, я по старым навыкам от PHP запросто передал переменые в шаблон index.js.
Без EJS пришлось бы пользоваться веб - сокетами, или ассинхронными AJAX запросами, опять же, для работы с веб сокетами необходимы дополнительные манипуляции в терминале, так что EJS славно упрощает жизнь в связке с Express.js


## Развертывание приложения

1. Для работы приложения необходимо установить Node.JS с пакетным менеджером NPM.
2. Перейти в папку с приложением.
3. Выполнить команду npm install для установки зависимостей.
4. Команду "npm start" или "node index.js" для запуска.

## Спецификации

* Функция renderTemplate принимает 2 аргумента: alias ('vote', 'leaders','diagram') и data (непосредственно данные объекта data в файле data.json):
``` js
{
      "title": "Самый большой коммит",
      "subtitle": "Спринт № 213",
      "emoji": "😮",
      "users": [
        {"id": 12, "name": "Алексей Ярошевич", "avatar": "12.jpg", "valueText": "4001 строка"},
        {"id": 5, "name": "Александр Николаичев", "avatar": "5.jpg", "valueText": "3845 строк"},
        {"id": 8, "name": "Александр Иванков", "avatar": "8.jpg", "valueText": "3640 строк"},
        {"id": 10, "name": "Яна Берникова", "avatar": "10.jpg", "valueText": "3453 строки"},
        {"id": 4, "name": "Вадим Пацев", "avatar": "4.jpg", "valueText": "2852 строки"}
      ]
}
```
* В файле index.ejs сначала идет ассинхронный запрос на файл data.json, по окончанию запроса инициируется функция render() , которая в свою очередь связывает stories.js и index.ejs. Ожидаемый ответ от stories.js - объект React, помещенный в контейнер #root.
* Шаблон Diagram принимает сколько угодно входных данных, сдвиг цвета реализован по нарастающему ключу.


### Спасибо за внимание.
 

