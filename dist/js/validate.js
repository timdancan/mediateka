const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.confirm',
  buttonInvalidClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`)
  error.textContent = input.validationMessage
  input.classList.add(config.inputErrorClass)
}

function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`)
  error.textContent = ''
  input.classList.remove(config.inputErrorClass)
}

function checkInputValidity(form, input, config) {
  if(input.validity.valid) {
    hideError(form, input, config)
  } else {
    showError(form, input, config)
  }
}

function setButtonState(button, isActive, config) {
  if(isActive) {
    button.classList.remove(config.buttonInvalidClass)
    button.disabled = false
  } else {
    button.classList.add(config.buttonInvalidClass)
    button.disabled = true
  }
}

function setEventListener (form, config) {
  const popupInput = form.querySelectorAll(config.inputSelector)
  const submitButton = form.querySelector(config.submitButtonSelector)

  popupInput.forEach(input => {
    input.addEventListener('input', ()=> {
      checkInputValidity(form, input, config)
      setButtonState(submitButton, form.checkValidity(), config)
    })
  })
}

function enableValidation (config) {
  const forms = document.querySelectorAll(config.formSelector)
  forms.forEach(form => {
    setEventListener(form, config)
  })

  const submitButton = form.querySelector(config.submitButtonSelector)
  setButtonState(submitButton, form.checkValidity(), config)
}

enableValidation (validationConfig)