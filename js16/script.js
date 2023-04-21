const VISIT_KEY = `visit`

const renderGriting = (isInital, visitCount = 0) => {
    const greetingElement = document.createElement(`p`)
    const visitElemeent = document.createElement(`p`)
    greetingElement.innerText = `Hello`
    visitElemeent.innerText = `Ви заходили ${visitCount} раз`

    document.body.append(greetingElement)

    if(isInital){
        document.body.append(visitElemeent)
    }

}

if(localStorage.getItem(VISIT_KEY)){
    const visit = JSON.parse(localStorage.getItem(`visit`))
    const updatedVisits = visit + 1;
    localStorage.setItem(`visit`, updatedVisits)

    renderGriting(true, updatedVisits)
}else{
    localStorage.setItem(`visit` , 1)
    renderGriting(false)
}