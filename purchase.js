document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);

    const tripType = params.get('tripType');
    const from = params.get('from');
    const to = params.get('to');
    const boardingDate = params.get('boardingDate');
    const returnDate = params.get('returnDate');
    const passengers = parseInt(params.get('passengers'), 10);
    const priceMDL = params.get('priceMDL') ? parseFloat(params.get('priceMDL')) : null;
    const pricePRB = params.get('pricePRB') ? parseFloat(params.get('pricePRB')) : null;
    const priceUAH = params.get('priceUAH') ? parseFloat(params.get('priceUAH')) : null;

    const totalCostMDL = priceMDL ? priceMDL * passengers : null;
    const totalCostPRB = pricePRB ? pricePRB * passengers : null;
    const totalCostUAH = priceUAH ? priceUAH * passengers : null;

    const purchaseFormDiv = document.getElementById('purchaseForm');
    const totalCostDiv = document.getElementById('totalCost');
    const emailInput = document.getElementById('email');

    let totalCostHTML = '<div class="totalCost">Общая стоимость: </div><br><br>';
    if (totalCostMDL !== null) {
        totalCostHTML += `MDL ${totalCostMDL.toFixed(2)}<br>`;
    }
    if (totalCostPRB !== null) {
        totalCostHTML += `PRB ${totalCostPRB.toFixed(2)}<br>`;
    }
    if (totalCostUAH !== null) {
        totalCostHTML += `UAH ${totalCostUAH.toFixed(2)}<br>`;
    }

    totalCostDiv.innerHTML = totalCostHTML;

    for (let i = 1; i <= passengers; i++) {
        const passengerDiv = document.createElement('div');
        passengerDiv.innerHTML = `
            <h2>Пассажир ${i}</h2>
            <label for="name${i}"></label>
            <input type="text" id="name${i}" placeholder="Имя" required>
            <br>
            <label for="surname${i}"></label>
            <input type="text" id="surname${i}" placeholder="Фамилия" required>
            <br>
            <div class="flex-items">
                <div class="custom_input">
                    <label for="baggage${i}">Багаж: </label>
                    <br>
                    <select id="baggage${i}" class="dropdown-scroll" required>
                        <option value="Багаж: Маленький">Маленький</option>
                        <option value="Багаж: Средний">Средний</option>
                        <option value="Багаж: Большой">Большой</option>
                    </select>
                </div>
            </div>
            <br><br>
        `;
        purchaseFormDiv.appendChild(passengerDiv);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function sendMail(passengerDetails) {
        const email = emailInput.value;

        const emailParams = {
            email: email,
            tripType: tripType,
            from: from,
            to: to,
            boardingDate: boardingDate,
            returnDate: returnDate,
            passengers: passengers,
            totalCostMDL: totalCostMDL ? totalCostMDL.toFixed(2) : null,
            totalCostPRB: totalCostPRB ? totalCostPRB.toFixed(2) : null,
            totalCostUAH: totalCostUAH ? totalCostUAH.toFixed(2) : null
        };

        passengerDetails.forEach((passenger, index) => {
            emailParams[`name${index + 1}`] = passenger.name;
            emailParams[`surname${index + 1}`] = passenger.surname;
            emailParams[`baggage${index + 1}`] = passenger.baggage;
        });

        const serviceID = "service_kag3h5d";
        const templateID = "template_vocez7r";

        emailjs.send(serviceID, templateID, emailParams)
            .then(res => {
                document.getElementById("email").value = "";
                console.log(res);
                alert("Ваше подтверждение успешно отправлено на вашу электронную почту!");
                window.location.href = "index.html";
            })
            .catch(err => console.log(err));
    }

    document.getElementById('confirmPurchase').addEventListener('click', function() {
        const passengerDetails = [];

        for (let i = 1; i <= passengers; i++) {
            const name = document.getElementById(`name${i}`).value;
            const surname = document.getElementById(`surname${i}`).value;
            const baggage = document.getElementById(`baggage${i}`).value;

            passengerDetails.push({ name, surname, baggage });
        }

        const email = emailInput.value;
        if (!validateEmail(email)) {
            alert('Неверный адрес электронной почты. Введите, пожалуйста, действительный адрес.');
            return;
        }

        sendMail(passengerDetails);
    });
});
