const btnStart = document.getElementById(`start`)
const btnStop = document.getElementById(`stop`)

const timerText = document.getElementById(`timer`)

let timeout = 10;
let intervalId = null;
let isActive = false;

const formatTime = (timerItem) => {
    return String(timerItem).length < 2 ? `0${timerItem}` : timerItem
}

const renderTimer = ({hours, minutes, seconds}) => {
    const timerString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    timerText.innerText = timerString
}

const getTimerLeft = (secondsLeft) => {
    const hours = Math.floor(secondsLeft/3600);
    const minutes = Math.floor((secondsLeft - hours * 3600)/60);
    const seconds = secondsLeft - hours * 3600 - minutes * 60;

    return{hours, minutes, seconds,}
}

const startTimer = () => {
    isActive = true;
    const time = getTimerLeft(timeout);
    renderTimer(time)

    return new Promise((resolve) => {
        intervalId = setInterval(() => {
            timeout--

            if(timeout <= 0){
                isActive = false
                clearInterval(intervalId)
                intervalId = null;
                resolve()
            }

            const time = getTimerLeft(timeout)
            renderTimer(time)
        },1000)
    })
}

const stopTimer = () => {
    isActive = false;
    clearInterval(intervalId);
    intervalId = null
}


btnStart.addEventListener(`click`, () => {
    if(isActive || !timeout){
        return
    }

    startTimer().then(() => {
        alert(`Timer end!`)
    })
})

btnStop.addEventListener(`click`, stopTimer)