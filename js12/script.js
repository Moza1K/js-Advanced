const creatTooltip = (button, text) => {
    

    const tooltip = document.createElement(`div`)
    tooltip.setAttribute(`id`, `tooltipe`)
    tooltip.classList.add(`tooltip`)
    tooltip.innerText = text

    document.body.append(tooltip);

    

    console.dir(button.style.position)
    const anohorElemCoords = button.getBoundingClientRect()
    console.log(button.getBoundingClientRect())
    const tooltipTop = anohorElemCoords.top - 10 - tooltip.clientHeight;
    const tooltipLeft = anohorElemCoords.left / 2 + anohorElemCoords.width / 2 - tooltip.clientHeight ;

    tooltip.style.position = `absolute`
    tooltip.style.top = `${tooltipTop}px`
    tooltip.style.left = `${tooltipLeft}px`
    tooltip.style.backgroundColor = `black`
    tooltip.style.color = `white`

}
const button = document.getElementById('example');
button.style.position = `relative`
button.style.top = `50px`
button.style.left = `50px`

button.addEventListener(`mouseover`, (event) => {
    creatTooltip(button, `типу підказка`)
})
button.addEventListener(`mouseout`, (event) => {
    document.getElementById(`tooltipe`).remove()
})