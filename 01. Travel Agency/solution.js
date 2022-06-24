window.addEventListener('load', solution);

function solution() {
  let nameEl = document.getElementById('fname')
  let emailEl = document.getElementById('email')
  let numberEl = document.getElementById('phone')
  let addressEl = document.getElementById('address')
  let codeEl = document.getElementById('code')

  let submitBtn = document.getElementById('submitBTN')
  submitBtn.addEventListener('click', submit)

  let previewList = document.getElementById('infoPreview')
  let editBtn = document.getElementById('editBTN')
  let continueBtn = document.getElementById('continueBTN')

  function submit() {
    let name = nameEl.value
    let email = emailEl.value
    let number = numberEl.value
    let address = addressEl.value
    let code = codeEl.value

    if (email == '' || name == '') {
      return
    }

    let li1 = createElement('li', `Full Name: ${name}`)
    let li2 = createElement('li', `Email: ${email}`)
    let li3 = createElement('li', `Phone Number: ${number}`)
    let li4 = createElement('li', `Address: ${address}`)
    let li5 = createElement('li', `Postal Code: ${code}`)

    previewList.appendChild(li1)
    previewList.appendChild(li2)
    previewList.appendChild(li3)
    previewList.appendChild(li4)
    previewList.appendChild(li5)

    editBtn.disabled = false
    continueBtn.disabled = false
    submitBtn.disabled = true

    editBtn.addEventListener('click', edit)
    continueBtn.addEventListener('click', onContinue)

    nameEl.value = ''
    emailEl.value = ''
    numberEl.value = ''
    addressEl.value = ''
    codeEl.value = ''

    function edit() {
      nameEl.value = name
      emailEl.value = email
      numberEl.value = number
      addressEl.value = address
      codeEl.value = code

      previewList.innerHTML = ''

      editBtn.disabled = true
      continueBtn.disabled = true
      submitBtn.disabled = false
    }

    function onContinue() {
      let div = document.getElementById('block')
      div.innerHTML = `<h3>Thank you for your reservation!</h3>`
    }

  }

  function createElement(type, content) {
    const element = document.createElement(type);
    if (content) {
      element.textContent = content;
    }

    return element;
  }
}
