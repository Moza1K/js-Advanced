const formConfig = [
    {
      element: "text",
      name: "login",
      label: "Логин",
    },
    {
      element: "text",
      name: "age",
      label: "Возраст",
    },
    {
      element: "select",
      name: "language",
      label: "Выберите язык программирования",
      options: [
        {
          text: "JavaScript",
          value: "js",
        },
        {
          text: "Java",
          value: "java",
        },
        {
          text: "Python",
          value: "python",
        },
      ],
    },
  ];

  const handleForm = (event) =>{
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = {}

    for(let pair of formData.entries()){
        data[pair[0]] = pair[1]
    }

    console.log(data)
  }

  const createInput = (inputData) =>{
    const input = document.createElement(`input`)
    input.setAttribute(`type`, `text`)
    input.setAttribute(`id`, inputData.name)
    input.setAttribute(`name`, inputData.name)


    return input
  }

  const createSelect = (selectData) =>{
    const select = document.createElement(`select`)
    select.setAttribute(`id`, selectData.name)
    select.setAttribute(`name`, selectData.name)

    selectData.options.forEach((opt) =>{
        const option = document.createElement(`option`)
        option.innerText = opt.text
        option.setAttribute(`value`, opt.value)

        select.append(option)
    })


    return select
  }

  const createForm = (arrFormData) => {
    const form = document.createElement(`form`)

    const buttonSubmit = document.createElement(`button`)
    buttonSubmit.setAttribute(`type`, `submit`)
    buttonSubmit.innerText = `submit`

    arrFormData.forEach((formElement) => {

        const divWrapp = document.createElement(`div`)
        const label = document.createElement(`label`)
        label.setAttribute(`for`, formElement.label)
        label.innerText = formElement.label

        if(formElement.element === `text`){
            const input = createInput(formElement)
            divWrapp.append(label, input)
        }else if(formElement.element === `select`){
            const select = createSelect(formElement)
            divWrapp.append(label, select)
        }

        form.append(divWrapp)
    })

    form.append(buttonSubmit)
    document.body.append(form)

    return form
  }

  let form = createForm(formConfig)
  form.addEventListener(`submit`, handleForm)