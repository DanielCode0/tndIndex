document.addEventListener('DOMContentLoaded', function() {
    const routes = [
        // L Fisa 1
        "Кишинев - " , "Новые Анены - " , "Каушаны - ","Штефан Водэ - ",
        " - Там. Староказачье" , " - " , " - ", " - ",
        " - Белгород Днестровский" , " - " , " - ", " - ",
        " - Сергеевка" , " - " , " - ", " - ",

        "Там. Староказачье - " , "Белгород Днестровский - " , "Сергеевка - ",
        " - Кишинев" , " - " , " - ", " - ",
        " - Новые Анены" , " - " , " - ", " - ",
        " - Каушаны" , " - " , " - ", " - ",
        " - Штефан Водэ" , " - " , " - ", " - ",

        // L Fisa 2
        "Бендеры - " , "Тирасполь - ",
        " - Маяки", " - " , " - ",
        " - Беляевка", " - " , " - ",
        " - Яськи", " - " , " - ",
        " - Троицкое", " - " , " - ",
        " - Градиницы", " - " , " - ",
        " - Лиманское", " - " , " - ",
        " - Кучурган", " - " , " - ",
        " - Яковлевка", " - " , " - ",
        " - Великая Михайловка", " - " , " - ",
        " - Захаровка", " - " , " - ",
        " - Окны", " - " , " - ",
        " - Подольск", " - " , " - ",
        " - Ананьев", " - " , " - ",

        "Маяки - " , "Беляевка - " ,"Яськи - " ,"Троицкое - " ,"Градиницы - " ,"Лиманское - " ,"Кучурган - " ,
        "Яковлевка - " ,"Великая Михайловка - " ,"Захаровка - " ,"Окны - " ,"Подольск - " ,"Ананьев - " ,
        " - Бендеры", " - " , " - ",
        " - Тирасполь", " - " , " - ",

        // L Fisa 3
        " - ", " - " , " - ", " - ",
        " - ", " - " , " - ", " - ",
        " - ", " - " , " - ", " - ",
        " - ", " - " , " - ", " - ",
        " - ", " - " , " - ", " - ",
        " - ", " - " , " - ", " - ",
    ];

    const fromRoutesList = document.getElementById('fromRoutes');
    const toRoutesList = document.getElementById('toRoutes');

    routes.forEach(route => {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');
        const cities = route.split(' - ');

        optionFrom.value = cities[0];
        optionTo.value = cities[1];

        fromRoutesList.appendChild(optionFrom);
        toRoutesList.appendChild(optionTo);
    });
});
