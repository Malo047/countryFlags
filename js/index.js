document.getElementById('srcButton').addEventListener('click', async (event) => {
    event.preventDefault();

    let inputCountryCapital = document.getElementById('countryCapital');
    let inputCurrencyCoin = document.getElementById('currencyCoin');

    inputCountryCapital.classList.remove('hidden');
    inputCurrencyCoin.classList.remove('hidden');
    
    let search = document.querySelector('input.input').value.trim();
    
    if (!search) {
        console.error("Digite um país válido!");
        return;
    }

    async function getCountry(search) {
        try {
            let response = await fetch(`https://restcountries.com/v3.1/name/${search}?fields=name,flags,capital,currencies`);

            if (!response.ok) {
                throw new Error('Erro ao buscar o país');
            }

            let data = await response.json();
            let country = data[0];

            console.log("País encontrado:", country.name.common);

            inputCountryCapital.value = country.capital ? country.capital[0] : "Sem capital disponível";

            if (country.currencies) {
                let currencyKey = Object.keys(country.currencies)[0];
                let currencyName = country.currencies[currencyKey].name;
                let currencySymbol = country.currencies[currencyKey].symbol;
                inputCurrencyCoin.value = `${currencyName} (${currencySymbol})`;
            } else {
                inputCurrencyCoin.value = "Sem moeda disponível";
            }
            
        } catch (error) {
            console.error("Erro ao carregar o país:", error);
        }
    }

    getCountry(search);
});
