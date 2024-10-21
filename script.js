document.addEventListener('DOMContentLoaded', function() {
    const tripTypeSelect = document.getElementById('tripType');
    const returnDateInput = document.getElementById('returnDate');
    const boardingDateInput = document.getElementById('boardingDate');
    const errorMessageDiv = document.getElementById('errorMessage');
    
    const today = new Date().toISOString().split('T')[0];
    boardingDateInput.value = today;
    returnDateInput.value = today;

    tripTypeSelect.addEventListener('change', function() {
        if (tripTypeSelect.value === 'roundtrip') {
            returnDateInput.style.display = 'inline-block';
            returnDateInput.setAttribute('required', 'required');
        } else {
            returnDateInput.style.display = 'none';
            returnDateInput.removeAttribute('required');
        }
    });

    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const tripType = tripTypeSelect.value;
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const boardingDate = boardingDateInput.value;
        const returnDate = returnDateInput.value;
        const passengers = document.getElementById('passengers').value;

        const route = checkRouteAvailability(tripType, from, to, boardingDate, returnDate, passengers);
        
        if (route) {
            let queryString = `?tripType=${tripType}&from=${from}&to=${to}&boardingDate=${boardingDate}&passengers=${passengers}&priceMDL=${route.priceMDL}&pricePRB=${route.pricePRB}&priceUAH=${route.priceUAH}&departureTime=${route.departureTime}&arrivalTime=${route.arrivalTime}&startReturnTime=${route.startReturnTime}&endReturnTime=${route.endReturnTime}`;
            if (tripType === 'roundtrip') {
                queryString += `&returnDate=${returnDate}`;
            }
            window.location.href = `results.html${queryString}`;
        } else {
            alert('Маршрут недоступен. Пожалуйста, попробуйте другой маршрут.')
            errorMessageDiv.style.display = 'block';
        }
    });
    
    function checkRouteAvailability(tripType, from, to, boardingDate, returnDate, passengers) {
        const availableRoutes = [



            // RUTELE FISA 1 ( lei / grivne )

            //  -------------------------------------------------------->
            { from: 'Кишинев', to: 'Там. Староказачье', priceMDL: 250, priceUAH: 600, departureTime: '12:20', arrivalTime: '16:00', startReturnTime: '11:30', endReturnTime: '15:15' },
            { from: 'Кишинев', to: 'Белгород Днестровский', priceMDL: 400, priceUAH: 850, departureTime: '12:20', arrivalTime: '17:00', startReturnTime: '11:00', endReturnTime: '15:15' },
            { from: 'Кишинев', to: 'Сергеевка', priceMDL: 400, priceUAH: 850, departureTime: '12:20', arrivalTime: '17:40', startReturnTime: '10:30', endReturnTime: '15:15' },

            //  <--------------------------------------------------------
            { from: 'Там. Староказачье', to: 'Кишинев', priceMDL: 250, priceUAH: 600, departureTime: '11:30', arrivalTime: '15:15', startReturnTime: '12:20', endReturnTime: '16:00' },
            { from: 'Белгород Днестровский', to: 'Кишинев', priceMDL: 400, priceUAH: 850, departureTime: '11:00', arrivalTime: '15:15', startReturnTime: '12:20', endReturnTime: '17:00' },
            { from: 'Сергеевка', to: 'Кишинев', priceMDL: 400, priceUAH: 850, departureTime: '10:30', arrivalTime: '15:15', startReturnTime: '12:20', endReturnTime: '17:40' },

            //  -------------------------------------------------------->
            { from: 'Новые Анены', to: 'Там. Староказачье', priceMDL: 230, priceUAH: 550, departureTime: '13:10', arrivalTime: '16:00', startReturnTime: '11:30', endReturnTime: '14:20' },
            { from: 'Новые Анены', to: 'Белгород Днестровский', priceMDL: 370, priceUAH: 800, departureTime: '13:10', arrivalTime: '17:00', startReturnTime: '11:00', endReturnTime: '14:20' },
            { from: 'Новые Анены', to: 'Сергеевка', priceMDL: 370, priceUAH: 800, departureTime: '13:10', arrivalTime: '17:40', startReturnTime: '10:30', endReturnTime: '14:20' },

            //  <--------------------------------------------------------
            { from: 'Там. Староказачье', to: 'Новые Анены', priceMDL: 230, priceUAH: 550, departureTime: '11:30', arrivalTime: '14:20', startReturnTime: '13:10', endReturnTime: '16:00' },
            { from: 'Белгород Днестровский', to: 'Новые Анены', priceMDL: 370, priceUAH: 800, departureTime: '11:00', arrivalTime: '14:20', startReturnTime: '13:10', endReturnTime: '17:00' },
            { from: 'Сергеевка', to: 'Новые Анены', priceMDL: 370, priceUAH: 800, departureTime: '10:30', arrivalTime: '14:20', startReturnTime: '13:10', endReturnTime: '17:40' },

            //  -------------------------------------------------------->
            { from: 'Каушаны', to: 'Там. Староказачье', priceMDL: 200, priceUAH: 500, departureTime: '14:05', arrivalTime: '16:00', startReturnTime: '11:30', endReturnTime: '13:30' },
            { from: 'Каушаны', to: 'Белгород Днестровский', priceMDL: 300, priceUAH: 700, departureTime: '14:05', arrivalTime: '17:00', startReturnTime: '11:00', endReturnTime: '13:30' },
            { from: 'Каушаны', to: 'Сергеевка', priceMDL: 300, priceUAH: 700, departureTime: '14:05', arrivalTime: '17:40', startReturnTime: '10:30', endReturnTime: '13:30' },
            
            //  <--------------------------------------------------------
            { from: 'Там. Староказачье', to: 'Каушаны', priceMDL: 200, priceUAH: 500, departureTime: '11:30', arrivalTime: '13:30', startReturnTime: '14:05', endReturnTime: '16:00' },
            { from: 'Белгород Днестровский', to: 'Каушаны', priceMDL: 300, priceUAH: 700, departureTime: '11:00', arrivalTime: '13:30', startReturnTime: '14:05', endReturnTime: '17:00' },
            { from: 'Сергеевка', to: 'Каушаны', priceMDL: 300, priceUAH: 700, departureTime: '10:30', arrivalTime: '13:30', startReturnTime: '14:05', endReturnTime: '17:40' },

            //  -------------------------------------------------------->
            { from: 'Штефан Водэ', to: 'Там. Староказачье', priceMDL: 80, priceUAH: 200, departureTime: '14:45', arrivalTime: '16:00', startReturnTime: '11:30', endReturnTime: '12:55' },
            { from: 'Штефан Водэ', to: 'Белгород Днестровский', priceMDL: 200, priceUAH: 400, departureTime: '14:45', arrivalTime: '17:00', startReturnTime: '11:00', endReturnTime: '12:55' },
            { from: 'Штефан Водэ', to: 'Сергеевка', priceMDL: 200, priceUAH: 400, departureTime: '14:45', arrivalTime: '17:40', startReturnTime: '10:30', endReturnTime: '12:55' },

            //  <--------------------------------------------------------
            { from: 'Там. Староказачье', to: 'Штефан Водэ', priceMDL: 80, priceUAH: 200, departureTime: '11:30', arrivalTime: '12:55', startReturnTime: '14:45', endReturnTime: '16:00' },
            { from: 'Белгород Днестровский', to: 'Штефан Водэ', priceMDL: 200, priceUAH: 400, departureTime: '11:00', arrivalTime: '12:55', startReturnTime: '14:45', endReturnTime: '17:00' },
            { from: 'Сергеевка', to: 'Штефан Водэ', priceMDL: 200, priceUAH: 400, departureTime: '10:30', arrivalTime: '12:55', startReturnTime: '14:45', endReturnTime: '17:40' },



            // RUTELE FISA 2 ( ruble transnistrene / grivne )

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Маяки', pricePRB: 150, priceUAH: 500, departureTime: '08:00', arrivalTime: '12:44', startReturnTime: '12:09', endReturnTime: '16:20' },
            { from: 'Тирасполь', to: 'Маяки', pricePRB: 140, priceUAH: 500, departureTime: '09:00', arrivalTime: '12:44', startReturnTime: '12:09', endReturnTime: '15:50' },
            { from: 'Григориополь', to: 'Маяки', pricePRB: 220, priceUAH: 700, departureTime: '07:15', arrivalTime: '12:44', startReturnTime: '12:09', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Маяки', pricePRB: 220, priceUAH: 700, departureTime: '06:45', arrivalTime: '12:44', startReturnTime: '12:09', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Маяки', pricePRB: 250, priceUAH: 750, departureTime: '05:40', arrivalTime: '12:44', startReturnTime: '12:09', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Маяки', to: 'Бендеры', pricePRB: 150, priceUAH: 500, departureTime: '12:09', arrivalTime: '16:20', startReturnTime: '08:00', endReturnTime: '12:44' },
            { from: 'Маяки', to: 'Тирасполь', pricePRB: 140, priceUAH: 500, departureTime: '12:09', arrivalTime: '15:50', startReturnTime: '09:00', endReturnTime: '12:44' },
            { from: 'Маяки', to: 'Григориополь', pricePRB: 220, priceUAH: 700, departureTime: '12:09', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '12:44' },
            { from: 'Маяки', to: 'Дубоссары', pricePRB: 220, priceUAH: 700, departureTime: '12:09', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '12:44' },
            { from: 'Маяки', to: 'Рыбница', pricePRB: 250, priceUAH: 750, departureTime: '12:09', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '12:44' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Беляевка', pricePRB: 160, priceUAH: 550, departureTime: '08:00', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '16:20' },
            { from: 'Тирасполь', to: 'Беляевка', pricePRB: 150, priceUAH: 550, departureTime: '09:00', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '15:50' },
            { from: 'Григориополь', to: 'Беляевка', pricePRB: 220, priceUAH: 700, departureTime: '07:15', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Беляевка', pricePRB: 220, priceUAH: 700, departureTime: '06:45', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Беляевка', pricePRB: 250, priceUAH: 750, departureTime: '05:40', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Беляевка', to: 'Бендеры', pricePRB: 160, priceUAH: 550, departureTime: '11:55', arrivalTime: '16:20', startReturnTime: '08:00', endReturnTime: '12:55' },
            { from: 'Беляевка', to: 'Тирасполь', pricePRB: 150, priceUAH: 550, departureTime: '11:55', arrivalTime: '15:50', startReturnTime: '09:00', endReturnTime: '12:55' },
            { from: 'Беляевка', to: 'Григориополь', pricePRB: 220, priceUAH: 700, departureTime: '11:55', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '12:55' },
            { from: 'Беляевка', to: 'Дубоссары', pricePRB: 220, priceUAH: 700, departureTime: '11:55', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '12:55' },
            { from: 'Беляевка', to: 'Рыбница', pricePRB: 250, priceUAH: 700, departureTime: '11:55', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '12:55' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Яськи', pricePRB: 180, priceUAH: 600, departureTime: '08:00', arrivalTime: '13:19', startReturnTime: '11:49', endReturnTime: '16:20' },
            { from: 'Тирасполь', to: 'Яськи', pricePRB: 170, priceUAH: 600, departureTime: '09:00', arrivalTime: '13:19', startReturnTime: '11:49', endReturnTime: '15:50' },
            { from: 'Григориополь', to: 'Яськи', pricePRB: 240, priceUAH: 730, departureTime: '07:15', arrivalTime: '13:19', startReturnTime: '11:49', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Яськи', pricePRB: 240, priceUAH: 730, departureTime: '06:45', arrivalTime: '13:19', startReturnTime: '11:49', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Яськи', pricePRB: 270, priceUAH: 780, departureTime: '05:40', arrivalTime: '13:19', startReturnTime: '11:49', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Яськи', to: 'Бендеры', pricePRB: 180, priceUAH: 600, departureTime: '11:49', arrivalTime: '16:20', startReturnTime: '08:00', endReturnTime: '13:19' },
            { from: 'Яськи', to: 'Тирасполь', pricePRB: 170, priceUAH: 600, departureTime: '11:49', arrivalTime: '15:50', startReturnTime: '09:00', endReturnTime: '13:19' },
            { from: 'Яськи', to: 'Григориополь', pricePRB: 240, priceUAH: 730, departureTime: '11:49', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '13:19' },
            { from: 'Яськи', to: 'Дубоссары', pricePRB: 240, priceUAH: 730, departureTime: '11:49', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '13:19' },
            { from: 'Яськи', to: 'Рыбница', pricePRB: 270, priceUAH: 780, departureTime: '11:49', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '13:19' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Троицкое', pricePRB: 200, priceUAH: 600, departureTime: '08:00', arrivalTime: '13:29', startReturnTime: '11:39', endReturnTime: '16:20' },
            { from: 'Тирасполь', to: 'Троицкое', pricePRB: 190, priceUAH: 600, departureTime: '09:00', arrivalTime: '13:29', startReturnTime: '11:39', endReturnTime: '15:50' },
            { from: 'Григориополь', to: 'Троицкое', pricePRB: 260, priceUAH: 760, departureTime: '07:15', arrivalTime: '13:29', startReturnTime: '11:39', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Троицкое', pricePRB: 260, priceUAH: 760, departureTime: '06:45', arrivalTime: '13:29', startReturnTime: '11:39', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Троицкое', pricePRB: 290, priceUAH: 810, departureTime: '05:40', arrivalTime: '13:29', startReturnTime: '11:39', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Троицкое', to: 'Бендеры', pricePRB: 200, priceUAH: 600, departureTime: '11:39', arrivalTime: '16:20', startReturnTime: '08:00', endReturnTime: '13:29' },
            { from: 'Троицкое', to: 'Тирасполь', pricePRB: 190, priceUAH: 600, departureTime: '11:39', arrivalTime: '15:50', startReturnTime: '09:00', endReturnTime: '13:29' },
            { from: 'Троицкое', to: 'Григориополь', pricePRB: 260, priceUAH: 760, departureTime: '11:39', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '13:29' },
            { from: 'Троицкое', to: 'Дубоссары', pricePRB: 260, priceUAH: 760, departureTime: '11:39', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '13:29' },
            { from: 'Троицкое', to: 'Рыбница', pricePRB: 290, priceUAH: 810, departureTime: '11:39', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '13:29' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Градиницы', pricePRB: 220, priceUAH: 650, departureTime: '08:00', arrivalTime: '13:39', startReturnTime: '11:29', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Градиницы', pricePRB: 210, priceUAH: 650, departureTime: '09:00', arrivalTime: '13:39', startReturnTime: '11:29', endReturnTime: '15:50' },
            { from: 'Григориополь', to: 'Градиницы', pricePRB: 280, priceUAH: 790, departureTime: '07:15', arrivalTime: '13:39', startReturnTime: '11:29', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Градиницы', pricePRB: 280, priceUAH: 790, departureTime: '06:45', arrivalTime: '13:39', startReturnTime: '11:29', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Градиницы', pricePRB: 310, priceUAH: 840, departureTime: '05:40', arrivalTime: '13:39', startReturnTime: '11:29', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Градиницы', to: 'Бендеры', pricePRB: 220, priceUAH: 650, departureTime: '11:29', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '13:39' },
            { from: 'Градиницы', to: 'Тирасполь', pricePRB: 210, priceUAH: 650, departureTime: '11:29', arrivalTime: '15:50', startReturnTime: '09:00', endReturnTime: '13:39' },
            { from: 'Градиницы', to: 'Григориополь', pricePRB: 280, priceUAH: 790, departureTime: '11:29', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '13:39' },
            { from: 'Градиницы', to: 'Дубоссары', pricePRB: 280, priceUAH: 790, departureTime: '11:29', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '13:39' },
            { from: 'Градиницы', to: 'Рыбница', pricePRB: 310, priceUAH: 840, departureTime: '11:29', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '13:39' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Лиманское', pricePRB: 240, priceUAH: 650, departureTime: '08:00', arrivalTime: '13:49', startReturnTime: '11:14', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Лиманское', pricePRB: 230, priceUAH: 650, departureTime: '09:00', arrivalTime: '13:49', startReturnTime: '11:14', endReturnTime: '15:50' },
            { from: 'Григориополь', to: 'Лиманское', pricePRB: 300, priceUAH: 820, departureTime: '07:15', arrivalTime: '13:49', startReturnTime: '11:14', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Лиманское', pricePRB: 300, priceUAH: 820, departureTime: '06:45', arrivalTime: '13:49', startReturnTime: '11:14', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Лиманское', pricePRB: 330, priceUAH: 870, departureTime: '05:40', arrivalTime: '13:49', startReturnTime: '11:14', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Лиманское', to: 'Бендеры', pricePRB: 240, priceUAH: 650, departureTime: '11:14', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '13:49' },
            { from: 'Лиманское', to: 'Тирасполь', pricePRB: 230, priceUAH: 650, departureTime: '11:14', arrivalTime: '15:50', startReturnTime: '09:00', endReturnTime: '13:49' },
            { from: 'Лиманское', to: 'Григориополь', pricePRB: 300, priceUAH: 820, departureTime: '11:14', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '13:49' },
            { from: 'Лиманское', to: 'Дубоссары', pricePRB: 300, priceUAH: 820, departureTime: '11:14', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '13:49' },
            { from: 'Лиманское', to: 'Рыбница', pricePRB: 330, priceUAH: 870, departureTime: '11:14', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '13:49' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Кучурган', pricePRB: 250, priceUAH: 700, departureTime: '08:00', arrivalTime: '14:09', startReturnTime: '10:49', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Кучурган', pricePRB: 240, priceUAH: 700, departureTime: '09:00', arrivalTime: '14:09', startReturnTime: '10:49', endReturnTime: '15:50' },
            { from: 'Григориополь', to: 'Кучурган', pricePRB: 330, priceUAH: 860, departureTime: '07:15', arrivalTime: '14:09', startReturnTime: '10:49', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Кучурган', pricePRB: 330, priceUAH: 860, departureTime: '06:45', arrivalTime: '14:09', startReturnTime: '10:49', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Кучурган', pricePRB: 360, priceUAH: 910, departureTime: '05:40', arrivalTime: '14:09', startReturnTime: '10:49', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Кучурган', to: 'Бендеры', pricePRB: 250, priceUAH: 700, departureTime: '10:49', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '14:09' },
            { from: 'Кучурган', to: 'Тирасполь', pricePRB: 240, priceUAH: 700, departureTime: '10:49', arrivalTime: '15:50', startReturnTime: '09:00', endReturnTime: '14:09' },
            { from: 'Кучурган', to: 'Григориополь', pricePRB: 330, priceUAH: 860, departureTime: '10:49', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '14:09' },
            { from: 'Кучурган', to: 'Дубоссары', pricePRB: 330, priceUAH: 860, departureTime: '10:49', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '14:09' },
            { from: 'Кучурган', to: 'Рыбница', pricePRB: 360, priceUAH: 910, departureTime: '10:49', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '14:09' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Яковлевка', pricePRB: 280, priceUAH: 750, departureTime: '08:00', arrivalTime: '14:34', startReturnTime: '10:24', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Яковлевка', pricePRB: 270, priceUAH: 750, departureTime: '09:00', arrivalTime: '14:34', startReturnTime: '10:24', endReturnTime: '15:50' },
            { from: 'Григориополь', to: 'Яковлевка', pricePRB: 360, priceUAH: 890, departureTime: '07:15', arrivalTime: '14:34', startReturnTime: '10:24', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Яковлевка', pricePRB: 360, priceUAH: 890, departureTime: '06:45', arrivalTime: '14:34', startReturnTime: '10:24', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Яковлевка', pricePRB: 390, priceUAH: 940, departureTime: '05:40', arrivalTime: '14:34', startReturnTime: '10:24', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Яковлевка', to: 'Бендеры', pricePRB: 280, priceUAH: 750, departureTime: '10:24', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '14:34' },
            { from: 'Яковлевка', to: 'Тирасполь', pricePRB: 270, priceUAH: 750, departureTime: '10:24', arrivalTime: '15:50', startReturnTime: '09:00', endReturnTime: '14:34' },
            { from: 'Яковлевка', to: 'Григориополь', pricePRB: 360, priceUAH: 890, departureTime: '10:24', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '14:34' },
            { from: 'Яковлевка', to: 'Дубоссары', pricePRB: 360, priceUAH: 890, departureTime: '10:24', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '14:34' },
            { from: 'Яковлевка', to: 'Рыбница', pricePRB: 390, priceUAH: 940, departureTime: '10:24', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '14:34' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Великая Михайловка', pricePRB: 350, priceUAH: 800, departureTime: '08:00', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Великая Михайловка', pricePRB: 340, priceUAH: 800, departureTime: '09:00', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '15:55' },
            { from: 'Григориополь', to: 'Великая Михайловка', pricePRB: 410, priceUAH: 960, departureTime: '07:15', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Великая Михайловка', pricePRB: 410, priceUAH: 960, departureTime: '06:45', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Великая Михайловка', pricePRB: 440, priceUAH: 1000, departureTime: '04:40', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Великая Михайловка', to: 'Бендеры', pricePRB: 350, priceUAH: 800, departureTime: '10:05', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '14:50' },
            { from: 'Великая Михайловка', to: 'Тирасполь', pricePRB: 340, priceUAH: 800, departureTime: '10:05', arrivalTime: '15:55', startReturnTime: '09:00', endReturnTime: '14:50' },
            { from: 'Великая Михайловка', to: 'Григориополь', pricePRB: 410, priceUAH: 960, departureTime: '10:05', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '14:50' },
            { from: 'Великая Михайловка', to: 'Дубоссары', pricePRB: 410, priceUAH: 960, departureTime: '10:05', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '14:50' },
            { from: 'Великая Михайловка', to: 'Рыбница', pricePRB: 440, priceUAH: 1000, departureTime: '10:05', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '14:50' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Захаровка', pricePRB: 380, priceUAH: 850, departureTime: '08:00', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Захаровка', pricePRB: 370, priceUAH: 850, departureTime: '09:00', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '15:55' },
            { from: 'Григориополь', to: 'Захаровка', pricePRB: 430, priceUAH: 1000, departureTime: '07:20', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Захаровка', pricePRB: 430, priceUAH: 1000, departureTime: '06:45', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Захаровка', pricePRB: 460, priceUAH: 1100, departureTime: '05:40', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Захаровка', to: 'Бендеры', pricePRB: 380, priceUAH: 850, departureTime: '09:25', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '15:30' },
            { from: 'Захаровка', to: 'Тирасполь', pricePRB: 370, priceUAH: 850, departureTime: '09:25', arrivalTime: '15:55', startReturnTime: '09:00', endReturnTime: '15:30' },
            { from: 'Захаровка', to: 'Григориополь', pricePRB: 430, priceUAH: 1000, departureTime: '09:25', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '15:30' },
            { from: 'Захаровка', to: 'Дубоссары', pricePRB: 430, priceUAH: 1000, departureTime: '09:25', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '15:30' },
            { from: 'Захаровка', to: 'Рыбница', pricePRB: 460, priceUAH: 1100, departureTime: '09:25', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '15:30' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Окны', pricePRB: 420, priceUAH: 950, departureTime: '08:00', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Окны', pricePRB: 410, priceUAH: 950, departureTime: '09:00', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '15:55' },
            { from: 'Григориополь', to: 'Окны', pricePRB: 450, priceUAH: 1100, departureTime: '07:15', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Окны', pricePRB: 450, priceUAH: 1100, departureTime: '06:45', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Окны', pricePRB: 500, priceUAH: 1200, departureTime: '05:40', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Окны', to: 'Бендеры', pricePRB: 420, priceUAH: 950, departureTime: '08:55', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '16:20' },
            { from: 'Окны', to: 'Тирасполь', pricePRB: 410, priceUAH: 950, departureTime: '08:55', arrivalTime: '15:55', startReturnTime: '09:00', endReturnTime: '16:20' },
            { from: 'Окны', to: 'Григориополь', pricePRB: 450, priceUAH: 1100, departureTime: '08:55', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '16:20' },
            { from: 'Окны', to: 'Дубоссары', pricePRB: 450, priceUAH: 1100, departureTime: '08:55', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '16:20' },
            { from: 'Окны', to: 'Рыбница', pricePRB: 500, priceUAH: 1200, departureTime: '08:55', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '16:20' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Подольск', pricePRB: 420, priceUAH: 950, departureTime: '08:00', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Подольск', pricePRB: 410, priceUAH: 950, departureTime: '09:00', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '15:55' },
            { from: 'Григориополь', to: 'Подольск', pricePRB: 450, priceUAH: 1100, departureTime: '07:15', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Подольск', pricePRB: 450, priceUAH: 1100, departureTime: '06:45', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Подольск', pricePRB: 500, priceUAH: 1200, departureTime: '05:40', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Подольск', to: 'Бендеры', pricePRB: 420, priceUAH: 950, departureTime: '07:40', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '16:50' },
            { from: 'Подольск', to: 'Тирасполь', pricePRB: 410, priceUAH: 950, departureTime: '07:40', arrivalTime: '15:55', startReturnTime: '09:00', endReturnTime: '16:50' },
            { from: 'Подольск', to: 'Григориополь', pricePRB: 450, priceUAH: 1100, departureTime: '07:40', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '16:50' },
            { from: 'Подольск', to: 'Дубоссары', pricePRB: 450, priceUAH: 1100, departureTime: '07:40', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '16:50' },
            { from: 'Подольск', to: 'Рыбница', pricePRB: 500, priceUAH: 1200, departureTime: '07:40', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '16:50' },

            //  -------------------------------------------------------->
            { from: 'Бендеры', to: 'Ананьев', pricePRB: 450, priceUAH: 1000, departureTime: '08:00', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '16:25' },
            { from: 'Тирасполь', to: 'Ананьев', pricePRB: 440, priceUAH: 1000, departureTime: '09:00', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '15:55' },
            { from: 'Григориополь', to: 'Ананьев', pricePRB: 500, priceUAH: 1150, departureTime: '07:40', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '17:20' },
            { from: 'Дубоссары', to: 'Ананьев', pricePRB: 500, priceUAH: 1150, departureTime: '06:45', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '17:50' },
            { from: 'Рыбница', to: 'Ананьев', pricePRB: 550, priceUAH: 1300, departureTime: '05:40', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '19:00' },

            //  <--------------------------------------------------------
            { from: 'Ананьев', to: 'Бендеры', pricePRB: 450, priceUAH: 1000, departureTime: '06:45', arrivalTime: '16:25', startReturnTime: '08:00', endReturnTime: '17:30' },
            { from: 'Ананьев', to: 'Тирасполь', pricePRB: 440, priceUAH: 1000, departureTime: '06:45', arrivalTime: '15:55', startReturnTime: '09:00', endReturnTime: '17:30' },
            { from: 'Ананьев', to: 'Григориополь', pricePRB: 500, priceUAH: 1150, departureTime: '06:45', arrivalTime: '17:20', startReturnTime: '07:15', endReturnTime: '17:30' },
            { from: 'Ананьев', to: 'Дубоссары', pricePRB: 500, priceUAH: 1150, departureTime: '06:45', arrivalTime: '17:50', startReturnTime: '06:45', endReturnTime: '17:30' },
            { from: 'Ананьев', to: 'Рыбница', pricePRB: 550, priceUAH: 1300, departureTime: '06:45', arrivalTime: '19:00', startReturnTime: '05:40', endReturnTime: '17:30' },



            // RUTELE FISA 3 ( lei / grivne )

            //  -------------------------------------------------------->
            { from: 'Кишинев', to: 'Беляевка', priceMDL: 250, priceUAH: 660, departureTime: '08:00', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '16:55' },
            { from: 'Новые Анены', to: 'Беляевка', priceMDL: 230, priceUAH: 500, departureTime: '08:50', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '16:00' },
            { from: 'Каушаны', to: 'Беляевка', priceMDL: 200, priceUAH: 450, departureTime: '09:45', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '15:05' },
            { from: 'Штефан Водэ', to: 'Беляевка', priceMDL: 180, priceUAH: 400, departureTime: '10:25', arrivalTime: '12:55', startReturnTime: '11:55', endReturnTime: '14:25' }, 

            //  <--------------------------------------------------------
            { from: 'Беляевка', to: 'Кишинев', priceMDL: 250, priceUAH: 660, departureTime: '11:55', arrivalTime: '16:55', startReturnTime: '08:00', endReturnTime: '12:55' },
            { from: 'Беляевка', to: 'Новые Анены', priceMDL: 230, priceUAH: 500, departureTime: '11:55', arrivalTime: '16:00', startReturnTime: '08:50', endReturnTime: '12:55' },
            { from: 'Беляевка', to: 'Каушаны', priceMDL: 200, priceUAH: 450, departureTime: '11:55', arrivalTime: '15:05', startReturnTime: '09:45', endReturnTime: '12:55' },
            { from: 'Беляевка', to: 'Штефан Водэ', priceMDL: 180, priceUAH: 400, departureTime: '11:55', arrivalTime: '14:25', startReturnTime: '10:25', endReturnTime: '12:55' },

            //  -------------------------------------------------------->
            { from: 'Кишинев', to: 'Великая Михайловка', priceMDL: 400, priceUAH: 900, departureTime: '08:00', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '16:55' },
            { from: 'Новые Анены', to: 'Великая Михайловка', priceMDL: 350, priceUAH: 800, departureTime: '08:50', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '16:00' },
            { from: 'Каушаны', to: 'Великая Михайловка', priceMDL: 300, priceUAH: 700, departureTime: '09:45', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '15:05' },
            { from: 'Штефан Водэ', to: 'Великая Михайловка', priceMDL: 280, priceUAH: 650, departureTime: '10:25', arrivalTime: '14:50', startReturnTime: '10:05', endReturnTime: '14:25' },

            //  <--------------------------------------------------------
            { from: 'Великая Михайловка', to: 'Кишинев', priceMDL: 400, priceUAH: 900, departureTime: '10:05', arrivalTime: '16:55', startReturnTime: '08:00', endReturnTime: '14:50' },
            { from: 'Великая Михайловка', to: 'Новые Анены', priceMDL: 350, priceUAH: 800, departureTime: '10:05', arrivalTime: '16:00', startReturnTime: '08:50', endReturnTime: '14:50' },
            { from: 'Великая Михайловка', to: 'Каушаны', priceMDL: 300, priceUAH: 700, departureTime: '10:05', arrivalTime: '15:05', startReturnTime: '09:45', endReturnTime: '14:50' },
            { from: 'Великая Михайловка', to: 'Штефан Водэ', priceMDL: 280, priceUAH: 650, departureTime: '10:05', arrivalTime: '14:25', startReturnTime: '10:25', endReturnTime: '14:50' },

            //  -------------------------------------------------------->
            { from: 'Кишинев', to: 'Захаровка', priceMDL: 430, priceUAH: 900, departureTime: '08:00', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '16:55' },
            { from: 'Новые Анены', to: 'Захаровка', priceMDL: 370, priceUAH: 850, departureTime: '08:50', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '16:00' },
            { from: 'Каушаны', to: 'Захаровка', priceMDL: 320, priceUAH: 750, departureTime: '09:45', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '15:05' },
            { from: 'Штефан Водэ', to: 'Захаровка', priceMDL: 300, priceUAH: 700, departureTime: '10:25', arrivalTime: '15:30', startReturnTime: '09:25', endReturnTime: '14:25' },

            //  <--------------------------------------------------------
            { from: 'Захаровка', to: 'Кишинев', priceMDL: 430, priceUAH: 900, departureTime: '09:25', arrivalTime: '16:55', startReturnTime: '08:00', endReturnTime: '15:30' },
            { from: 'Захаровка', to: 'Новые Анены', priceMDL: 370, priceUAH: 850, departureTime: '09:25', arrivalTime: '16:00', startReturnTime: '08:50', endReturnTime: '15:30' },
            { from: 'Захаровка', to: 'Каушаны', priceMDL: 320, priceUAH: 750, departureTime: '09:25', arrivalTime: '15:05', startReturnTime: '09:45', endReturnTime: '15:30' },
            { from: 'Захаровка', to: 'Штефан Водэ', priceMDL: 300, priceUAH: 700, departureTime: '09:25', arrivalTime: '14:25', startReturnTime: '10:25', endReturnTime: '15:30' },

            //  -------------------------------------------------------->
            { from: 'Кишинев', to: 'Окны', priceMDL: 460, priceUAH: 950, departureTime: '08:00', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '16:55' },
            { from: 'Новые Анены', to: 'Окны', priceMDL: 430, priceUAH: 900, departureTime: '08:50', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '16:00' },
            { from: 'Каушаны', to: 'Окны', priceMDL: 400, priceUAH: 850, departureTime: '09:45', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '15:05' },
            { from: 'Штефан Водэ', to: 'Окны', priceMDL: 370, priceUAH: 800, departureTime: '10:25', arrivalTime: '16:20', startReturnTime: '08:55', endReturnTime: '14:25' },

            //  <--------------------------------------------------------
            { from: 'Окны', to: 'Кишинев', priceMDL: 460, priceUAH: 950, departureTime: '08:55', arrivalTime: '16:55', startReturnTime: '08:00', endReturnTime: '16:20' },
            { from: 'Окны', to: 'Новые Анены', priceMDL: 430, priceUAH: 900, departureTime: '08:55', arrivalTime: '16:00', startReturnTime: '08:50', endReturnTime: '16:20' },
            { from: 'Окны', to: 'Каушаны', priceMDL: 400, priceUAH: 850, departureTime: '08:55', arrivalTime: '15:05', startReturnTime: '09:45', endReturnTime: '16:20' },
            { from: 'Окны', to: 'Штефан Водэ', priceMDL: 370, priceUAH: 800, departureTime: '08:55', arrivalTime: '14:25', startReturnTime: '10:25', endReturnTime: '16:20' },

            //  -------------------------------------------------------->
            { from: 'Кишинев', to: 'Подольск', priceMDL: 460, priceUAH: 950, departureTime: '08:00', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '16:55' },
            { from: 'Новые Анены', to: 'Подольск', priceMDL: 430, priceUAH: 900, departureTime: '08:50', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '16:00' },
            { from: 'Каушаны', to: 'Подольск', priceMDL: 400, priceUAH: 850, departureTime: '09:45', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '15:05' },
            { from: 'Штефан Водэ', to: 'Подольск', priceMDL: 370, priceUAH: 800, departureTime: '10:25', arrivalTime: '16:50', startReturnTime: '07:40', endReturnTime: '14:25' },

            //  <--------------------------------------------------------
            { from: 'Подольск', to: 'Кишинев', priceMDL: 460, priceUAH: 950, departureTime: '08:20', arrivalTime: '16:55', startReturnTime: '08:00', endReturnTime: '16:50' },
            { from: 'Подольск', to: 'Новые Анены', priceMDL: 430, priceUAH: 900, departureTime: '08:20', arrivalTime: '16:00', startReturnTime: '08:50', endReturnTime: '16:50' },
            { from: 'Подольск', to: 'Каушаны', priceMDL: 400, priceUAH: 850, departureTime: '08:20', arrivalTime: '15:05', startReturnTime: '09:45', endReturnTime: '16:50' },
            { from: 'Подольск', to: 'Штефан Водэ', priceMDL: 370, priceUAH: 800, departureTime: '08:20', arrivalTime: '14:25', startReturnTime: '10:25', endReturnTime: '16:50' },
            
            //  -------------------------------------------------------->
            { from: 'Кишинев', to: 'Ананьев', priceMDL: 500, priceUAH: 1100, departureTime: '08:00', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '16:55' },
            { from: 'Новые Анены', to: 'Ананьев', priceMDL: 470, priceUAH: 1050, departureTime: '08:50', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '16:00' },
            { from: 'Каушаны', to: 'Ананьев', priceMDL: 450, priceUAH: 1000, departureTime: '09:45', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '15:05' },
            { from: 'Штефан Водэ', to: 'Ананьев', priceMDL: 400, priceUAH: 900, departureTime: '10:25', arrivalTime: '17:30', startReturnTime: '06:45', endReturnTime: '14:25' },

            //  <--------------------------------------------------------
            { from: 'Ананьев', to: 'Кишинев', priceMDL: 500, priceUAH: 1100, departureTime: '06:45', arrivalTime: '16:55', startReturnTime: '08:00', endReturnTime: '17:30' },
            { from: 'Ананьев', to: 'Новые Анены', priceMDL: 470, priceUAH: 1050, departureTime: '06:45', arrivalTime: '16:00', startReturnTime: '08:50', endReturnTime: '17:30' },
            { from: 'Ананьев', to: 'Каушаны', priceMDL: 450, priceUAH: 1000, departureTime: '06:45', arrivalTime: '15:05', startReturnTime: '09:45', endReturnTime: '17:30' },
            { from: 'Ананьев', to: 'Штефан Водэ', priceMDL: 400, priceUAH: 900, departureTime: '06:45', arrivalTime: '14:25', startReturnTime: '10:25', endReturnTime: '17:30' },
       
        ];

        return availableRoutes.find(route => 
            route.from === from &&
            route.to === to &&
            (tripType === 'oneway' || (tripType === 'roundtrip' && returnDate))
        );
    }
});
