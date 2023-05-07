function PublicService () {
    this.service = []

    this.tarifs = {
        hotWater: 7,
        coldWater: 1,
        gas: 0.3,
        electricity: 1.6,
      } 
      
}

PublicService.prototype.addMeterReadings = function (amount, serviceName) {
    if(!Object.keys(this.tarifs).includes(serviceName)){
        throw new Error(`Servise ${serviceName} is unvaibale`)
    }

    if(this.service.some(({key}) => key === serviceName)){
        throw new Error(`Servise ${serviceName} is already includes`)
    }

    this.service.push({key: serviceName, amount: amount})
}

PublicService.prototype.deleteMeterReadings = function (serviceName) {
    this.service = this.service.filter(({key}) => key !== serviceName)
}

PublicService.prototype.getSum = function () {
    let sum = 0 
    this.service.forEach(({key, amount}) => {
        sum += this.tarifs[key] * amount
    })

    return sum
}

const service = new PublicService()

service.addMeterReadings(100, `hotWater`)
service.addMeterReadings(200, `coldWater`)
service.deleteMeterReadings(`coldWater`)
service.addMeterReadings(300, `electricity`)

const res = service.getSum()

const container = document.getElementById(`container`)
const showtariff = (res) => {
    const text = document.createElement(`p`)
    text.innerText = res
    container.append(text)
}

showtariff(res)
