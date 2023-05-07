const form = document.getElementById(`form`)
const input = document.getElementById(`input`)
const select = document.getElementById(`select`)


class Card{
    constructor({name}){
        this.card = document.createElement(`div`)
        this.name = name
        // this.render()
    }

    render(){
        const btnClose = document.createElement(`button`)
        const cardName = document.createElement(`h4`)
        const cardContainer = document.createElement(`div`)

        btnClose.innerText = `x`
        btnClose.classList.add(`button`)

        cardName.innerText = this.name

        btnClose.addEventListener(`click`, () => {
            this.card.remove()
        })

        cardContainer.append(cardName, btnClose)
        this.card.append(cardContainer)
        cardContainer.classList.add(`flex`,)
        this.card.classList.add(`cardContainer`)
    }

    show(){
        const container = document.body
        container.append(this.card)

    }

    remove(){
        this.card.remove()
    }
}

class StarSipCard extends Card{
    constructor({model, manufacturer, max_atmosphering_speed, ...rest}){
        super(rest)
        // this.name = name
        this.model = model
        this.manufacturer = manufacturer
        this.max_atmosphering_speed = max_atmosphering_speed

        this.render()
    }

    render(){
        super.render()

        // const textName = document.createElement(`h4`)
        const textModel = document.createElement(`p`)
        const textManufacturer = document.createElement(`p`)
        const textMaxSpeed = document.createElement(`p`)

        // textName.innerText = this.name
        textModel.innerText = this.model
        textManufacturer.innerText = this.manufacturer
        textMaxSpeed.innerText = this.max_atmosphering_speed 

        this.card.append( textModel, textManufacturer, textMaxSpeed)

    }
}

class PlanetCard extends Card{
    constructor({climate, terrain, population, ...rest}){
        super(rest)
        // this.name = name
        this.climate = climate
        this.terrain = terrain
        this.population = population

        this.render()
    }

    render(){
        super.render()

        // const textName = document.createElement(`p`)
        const textClimate = document.createElement(`p`)
        const textTerrain = document.createElement(`p`)
        const textPopulation = document.createElement(`p`)

        // textName.innerText = this.name
        textClimate.innerText = this.climate
        textTerrain.innerText = this.terrain
        textPopulation.innerText = this.population

        this.card.append(textClimate, textTerrain, textPopulation)
    }

}

class VehicleCard extends Card{
    constructor({cost_in_credits, crew, passengers, ...rest}){
        super(rest)

        this.cost_in_credits = cost_in_credits
        this.crew = crew
        this.passengers = passengers

        this.render()
    }

    render(){
        super.render()

        const textCost_in_credits = document.createElement(`p`)
        const textCrew = document.createElement(`p`)
        const textPassengers = document.createElement(`p`)

        textCost_in_credits.innerText = `Ціна: ${this.cost_in_credits}`
        textCrew.innerText = `Команда: ${this.crew}`
        textPassengers.innerText = `Пасажири: ${this.passengers}`

        this.card.append(textCost_in_credits, textCrew, textPassengers)
    }
    
}

class API {
    constructor(){
        this.BASE_URL = `https://swapi.dev/api`
    }

    findErrors = async (response) => {
        if(!response.ok){
            const {detail} = await response.json()
            throw new Error(detail)
        }

        return response

    }

    getStarship = async(id) => {
        const starship = await this.sendRequest(`${this.BASE_URL}/starships/${id}`)
        return starship
    }

    getPlanet = async(id) => {
        const planet = await this.sendRequest(`${this.BASE_URL}/planets/${id}`)
        return planet
    }

    getVehicle = async(id) => {
        const vehicle = await this.sendRequest(`${this.BASE_URL}/vehicles/${id}`)
        return vehicle
    }

    sendRequest = async(url) => {
        const response = await this.findErrors(await fetch(url))
        const result = response.json()
        return result
    }
}

const api = new API()

const CARD_MAP = {
    starship: StarSipCard,
    planet: PlanetCard,
    vehicle: VehicleCard,
}

const API_MAP = {
    starship: api.getStarship,
    planet: api.getPlanet,
    vehicle: api.getVehicle,
}

const handleSubmit = async (event) => {
    event.preventDefault()

    const type = select.value;
    const id = input.value;
    

    try{
        const item = await API_MAP[type](id);
        const card = new CARD_MAP[type](item);

        card.show()
    }catch(error){
        alert(error.message)
    }
    
}

form.addEventListener(`submit`, handleSubmit)