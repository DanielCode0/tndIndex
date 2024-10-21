document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);

    const tripType = params.get('tripType');
    const from = params.get('from');
    const to = params.get('to');
    const boardingDate = params.get('boardingDate');
    const returnDate = params.get('returnDate');
    const passengers = parseInt(params.get('passengers'), 10);
    const priceMDL = parseFloat(params.get('priceMDL'));
    const pricePRB = parseFloat(params.get('pricePRB'));
    const priceUAH = parseFloat(params.get('priceUAH'));
    const departureTime = params.get('departureTime');
    const arrivalTime = params.get('arrivalTime');
    const endReturnTime = params.get('endReturnTime');
    const startReturnTime = params.get('startReturnTime');

    function calculateTimeInterval(start, end) {
        const [startHours, startMinutes] = start.split(':').map(Number);
        const [endHours, endMinutes] = end.split(':').map(Number);
        
        let hours = endHours - startHours;
        let minutes = endMinutes - startMinutes;

        if (minutes < 0) {
            hours -= 1;
            minutes += 60;
        }
        
        return `${hours}ч ${minutes}мин`;
    }

    const timeInt = calculateTimeInterval(departureTime, arrivalTime);
    const returnTimeInt = calculateTimeInterval(startReturnTime, endReturnTime);
    
    let availableRoutes = [
        {
            route: `${from} to ${to}`,
            boardingDate: boardingDate,
            passengers: passengers,
            priceMDL: priceMDL,
            pricePRB: pricePRB,
            priceUAH: priceUAH,
            startTime: departureTime,
            timeInt: timeInt,
            endTime: arrivalTime,
            endRetTime: endReturnTime,
            startRetTime: startReturnTime,
            returnTimeInt: returnTimeInt,
        },
    ];
    
    if (tripType === 'roundtrip') {
        availableRoutes = availableRoutes.map(route => ({
            ...route,
            returnDate: returnDate,
            priceMDL: priceMDL * 2,
            pricePRB: pricePRB * 2,
            priceUAH: priceUAH * 2,
        }));
    }

    const resultsDiv = document.getElementById('results');
    availableRoutes.forEach((route, index) => {
        const totalCostMDL = route.priceMDL ? route.priceMDL * passengers : null;
        const totalCostPRB = route.pricePRB ? route.pricePRB * passengers : null;
        const totalCostUAH = route.priceUAH ? route.priceUAH * passengers : null;

        let priceDisplay = '';
        if (totalCostMDL !== null) priceDisplay += `MDL ${totalCostMDL}`;
        if (totalCostPRB !== null) priceDisplay += ` PRB ${totalCostPRB}`;
        if (totalCostUAH !== null) priceDisplay += ` UAH ${totalCostUAH}`;

        const routeDiv = document.createElement('div');
        routeDiv.className = 'card';
        routeDiv.innerHTML = `
        <div class="time-details">
            <div class="time">
                <div class="onewayInfo">
                    <h1 class="tripInfoh1">Информация о Поездке</h1>
                    <br>
                    <span class="timeframe1">Время Отправления: ${route.startTime}</span>
                    <br>
                    <span class="timeframe">Время Прибытия: ${route.endTime}</span>
                    <br>
                    <span class="interval1">Время в Пути: ${route.timeInt}</span>
                    <br>
                    <span class="dest"><span>От ${from} до ${to}</span></span>
                    <br>
                    <span class="startDate">Дата Поездки: ${route.boardingDate}</span>
                    <br>
                </div>
                <div class="roundInfo">
                    ${tripType === 'roundtrip' ? `<div><span class="timeframe">Время Отправления: ${route.startRetTime}<br></span>
                    <span class="timeframe1">Время Прибытия: ${route.endRetTime}<br></span></div>` : ''}
                    ${tripType === 'roundtrip' ? `<span class="dest"><span class="interval2">Время Обратного Пути: ${route.returnTimeInt}<br></span>
                    <span>От ${to} до ${from}</span><br>
                    <span class="return-date">Дата возврата: ${route.returnDate}</span><br></span>` : ''}
                </div>
            </div>
            <br>
        </div>
        <div class="bottom-section">
            <div class="price-info">
                <strong><span>${priceDisplay}</span></strong>
                <i class="icon"><img src="./photo/wi-fi.png" alt="wi-fi"></i>
                <i class="icon"><img src="./photo/charge.png" alt="charge"></i>
            </div>
            <button class="continue-btn" onclick="buyTickets(${index}, ${totalCostMDL})"><strong>Продолжать</strong></button>
        </div>
    `;
    
        resultsDiv.appendChild(routeDiv);
    });

    window.buyTickets = function(index) {
        const selectedRoute = availableRoutes[index];
        let queryString = `?tripType=${tripType}&from=${from}&to=${to}&boardingDate=${boardingDate}&passengers=${passengers}&priceMDL=${selectedRoute.priceMDL}&pricePRB=${selectedRoute.pricePRB}&priceUAH=${selectedRoute.priceUAH}`;
        if (tripType === 'roundtrip') {
            queryString += `&returnDate=${returnDate}`;
        }
        window.location.href = `purchase.html${queryString}`;
    };
});
