const slides = [...document.querySelectorAll(`.slide`)]
const btnPrev = document.getElementById(`Prev`)
const btnNext = document.getElementById(`Next`)

let slideIndex = 0;

const hideSlidesOnLoad = () =>{
    const slidesToHide = slides.slice(1)

    slidesToHide.forEach((slide) => {
        slide.classList.add(`hidden`)
    })
}

window.addEventListener(`DOMContentLoaded`, hideSlidesOnLoad)

const nextSlide = () => {
    slides[slideIndex].classList.add(`hidden`)

    if(slideIndex === slides.length - 1){
        slides[0].classList.remove(`hidden`)
        slideIndex = 0
    }else{
        slides[slideIndex + 1].classList.remove(`hidden`)
        slideIndex++
    }
}

const prevSlide = () => {
    slides[slideIndex].classList.add(`hidden`)

    if(slideIndex === 0){
        slides[slides.length - 1].classList.remove(`hidden`)
        slideIndex = slides.length - 1
    }else{
        slides[slideIndex - 1].classList.remove(`hidden`)
        slideIndex--
    }
}

btnNext.addEventListener(`click`, nextSlide)
btnPrev.addEventListener(`click`, prevSlide)