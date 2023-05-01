const BASE_URL = `https://ipapi.co/json`
const BASE_URL_FLAG = `https://restcountries.com/v2/name`

const container = document.getElementById(`card-container`)

const renderFlag = (flag) => {
    let div = document.createElement(`div`)

    let imgFlag = document.createElement(`img`)
    imgFlag.setAttribute(`src`, flag)

    div.append(imgFlag)
    console.log(1)
    return div
    
}

const getCountriFlag = async (place, url) => {
    let {country_name: country} = place

    try{
        let response = await fetch(`${url}/${country}`)
        if(response.status === 200){
            let flag = await response.json()
            let flagSrc = renderFlag(flag[0].flag)
        
            showCountri(place, flagSrc)
        }else{
            throw new Error(`Помилка: ${response.status}`)
        }
    }catch (error){
        let errorText = error.message
        alert(errorText)
    }
    console.log(2)
}

const showCountri = ({country_name: country, country_capital: capital, currency}, flag) =>{
    let card = document.createElement(`div`)


    let countryText = document.createElement(`h1`)
    countryText.innerText = country

    let capitalText = document.createElement(`h2`)
    capitalText.innerText = capital

    let currencyText = document.createElement(`p`)
    currencyText.innerText = currency

    card.append(countryText, capitalText, currencyText, flag)
    container.append(card)
    console.log(3)
}

const getUserIpAddres = async (url) => {
    try{
        let response = await fetch(url)
        if(response.status === 200){
            let place = await response.json()
            getCountriFlag(place, BASE_URL_FLAG)
        }else{
            throw new Error(`Помилка: ${response.status}`)
        }
    }catch (error){
        let errorText = error.message
        alert(errorText)
    }
    console.log(4)
} 


// getUserIpAddres(BASE_URL)

//Завдання 2

const tackTwo_URL = `https://swapi.dev/api/people`
const idForm = document.getElementById(`form`)
const input = document.getElementById(`input`)
const containerTaskTwo = document.getElementById(`container`)

const handleEreors = async(response) => {
    if(!response.ok){
        let{error} = await response.json()
        throw new Error(response.status)
    }

    return response
}

const renderFilmList = (arrFilms) => {
    let nameFilms = arrFilms.map(film => film.title)

    const filmNameCount = document.createElement(`div`)

    for( let name of nameFilms){

        const filmName = document.createElement(`p`)
        filmName.innerText = name
        filmNameCount.append( filmName)
    }
    containerTaskTwo.firstElementChild.append(filmNameCount)
}

const handleButtonFilms = async({films}) => {
    const fetchFilms = films.map((film) => fetch(film))

    try{
        const response = await Promise.all(fetchFilms)
        const jsonResponse = response.map((response) => response.json())
        const result = await Promise.all(jsonResponse)

        await renderFilmList(result)
    }catch{
        alert(`Error`)
    }
}

const renderCharaccterCard = (char) => {
    const {name} = char
    const divChar = document.createElement(`div`)

    const nameChar = document.createElement(`p`)
    nameChar.style.marginBottom = `20px`
    nameChar.innerText = name

    const btnChar = document.createElement(`button`)
    btnChar.innerText = `Films`

    divChar.append(nameChar, btnChar)
    containerTaskTwo.append(divChar)

    btnChar.addEventListener(`click`, (event) => {
        if(!event.target.hasAttribute(`isActive`)){
            event.target.setAttribute(`isActive`, ``)
            handleButtonFilms(char)
        }else{
            event.target.removeAttribute(`isActive`)
            event.target.nextElementSibLing.remove()
        }
    })
}

const getCharacter = async (id) => {

    try{
        const response = await handleEreors(
            await fetch(`${tackTwo_URL}/${id}`)
        )

        const character = await response.json()
        await renderCharaccterCard(character)
    }catch(error){
        if(+error.message === 404){
            alert(`Немає персонажа з таким id`)
        }else{
            alert(`Error`)
        }
    }
}

const handleIdForm = (event) => {
    event.preventDefault()

    const {value} = input

    if(value === ``){
        alert(`Введіть число!`)
        return
    }else{
        getCharacter(value)
    }


    containerTaskTwo.firstElementChild.remove()
}

idForm.addEventListener(`submit`, handleIdForm)