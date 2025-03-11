document.getElementById('srcButton').addEventListener('click', async (event) => {
    event.preventDefault();

    let inputCountryCapital = document.getElementById('countryCapital');
    let inputCurrencyCoin = document.getElementById('currencyCoin');    
    let search = document.querySelector('input.input').value.trim();
    let preenchimentoObrigatorioBorder = document.getElementById('inputSearch');
    let preenchimentoObrigatorio = document.getElementById('preenchimentoObrigatorio');
    let flags = document.getElementById('flag');
    
    if (!search) {
        console.error("Digite um país válido!");
        preenchimentoObrigatorioBorder.classList.add('vazio')
        preenchimentoObrigatorio.classList.remove('hidden')
        inputCountryCapital.classList.add('hidden');
        inputCurrencyCoin.classList.add('hidden');
        flags.style.backgroundImage = 'none';
        return;
    }

    inputCountryCapital.classList.remove('hidden');
    inputCurrencyCoin.classList.remove('hidden');
    preenchimentoObrigatorioBorder.classList.remove('vazio')
    preenchimentoObrigatorio.classList.add('hidden')

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
            flags.style.backgroundImage = `url(${country.flags.png})`;
            flags.style.backgroundSize = "cover";
            flags.style.backgroundPosition = "center";
                
        } catch (error) {
            console.error("Erro ao carregar o país:", error);
            preenchimentoObrigatorioBorder.classList.add('vazio')
            preenchimentoObrigatorio.classList.remove('hidden')
            inputCountryCapital.classList.add('hidden');
            inputCurrencyCoin.classList.add('hidden');
            flags.style.backgroundImage = 'none';
        }
    }

    getCountry(search);
});
