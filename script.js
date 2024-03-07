function getData() {
    const cidade = document.getElementById('cidade').value; // Pega o valor do input com id 'cidade'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=db451273253f5186e2de5387bada40c9`) // Faz a requisição para a API do OpenWeatherMap
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => { 
        const latitude = data.coord.lat; // Pega a latitude da cidade
        const longitude = data.coord.lon; // Pega a longitude da cidade

        fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=TB27XI4PI9BI&format=json&by=position&lat=${latitude}&lng=${longitude}`) 
        .then(response => response.json())
        .then(data => {
            const timezoneDataElement = document.getElementById('timezoneData'); 
            timezoneDataElement.innerHTML = ` 
                <h2>Fuso horário em ${cidade}</h2>
                <p>Timezone: ${data.zoneName}</p>
            `; // Insere o fuso horário no HTML
        })
        .catch(error => {
            console.error('Erro ao obter dados do fuso horário:', error);
        }); // Trata o erro caso a requisição falhe

        const weatherDataElement = document.getElementById('weatherData'); 
        const temperature = data.main.temp - 273.15; // Converte a temperatura de Kelvin para Celsius
        const weatherDescription = traslateWeaterDescription(data.weather[0].description);	// Traduz a descrição do tempo
        weatherDataElement.innerHTML = `
            <h2>Tempo em ${cidade}</h2>
            <p>Temperatura: ${temperature.toFixed(0)}°C</p>
            <p>Condição: ${weatherDescription}</p>
        `;
    })
    .catch(error => {
        console.error('Erro ao obter dados do tempo:', error);
    });
}
    function traslateWeaterDescription(description) { // Função para traduzir a descrição do tempo
        switch (description) {
            case 'clear sky':
            return 'céu limpo';
        case 'few clouds':
            return 'poucas nuvens';
        case 'scattered clouds':
            return 'nuvens dispersas';
        case 'broken clouds':
            return 'nuvens quebradas';
        case 'overcast clouds':
            return 'nuvens encobertas';
        case 'light rain':
            return 'chuva fraca';
        case 'moderate rain':
            return 'chuva moderada';
        case 'heavy intensity rain':
            return 'chuva intensa';
        case 'very heavy rain':
            return 'chuva muito intensa';
        case 'extreme rain':
            return 'chuva extrema';
        case 'freezing rain':
            return 'chuva congelante';
        case 'light intensity shower rain':
            return 'chuva leve';
        case 'shower rain':
            return 'chuva de banho';
        case 'heavy intensity shower rain':
            return 'chuva intensa';
        case 'ragged shower rain':
            return 'chuva irregular';
        case 'light snow':
            return 'neve fraca';
        case 'snow':
            return 'neve';
        case 'heavy snow':
            return 'neve intensa';
        case 'sleet':
            return 'chuva congelada';
        case 'shower sleet':
            return 'chuva de granizo';
        case 'light rain and snow':
            return 'chuva fraca e neve';
        case 'rain and snow':
            return 'chuva e neve';
        case 'light shower snow':
            return 'neve leve';
        case 'shower snow':
            return 'neve de banho';
        case 'heavy shower snow':
            return 'neve intensa';
        case 'mist':
            return 'névoa';
        case 'smoke':
            return 'fumaça';
        case 'haze':
            return 'névoa seca';
        case 'sand/ dust whirls':
            return 'redemoinhos de areia/poeira';
        case 'fog':
            return 'névoa';
        case 'sand':
            return 'areia';
        case 'dust':
            return 'poeira';
        case 'volcanic ash':
            return 'cinzas vulcânicas';
        case 'squalls':
            return 'rajadas';
        case 'tornado':
            return 'tornado';
        default:
            return description;
        };
    }


