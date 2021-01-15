const headerButton = document.querySelector('.header__button')
const popup = document.querySelector('.popup')
const cancel = document.querySelector('.button_type_cancel') 
const movieCLick = document.querySelector('.movie__comments-link')
const movies = document.querySelector('.movies')
const template = document.querySelector('.template')
const addTitle = document.querySelector('.popup__input_add_title')
const addYear = document.querySelector('.popup__input_add_year')
const addCountry = document.querySelector('.popup__input_add_country')
const addGenre = document.querySelector('.popup__input_add_genre')
const addPoster = document.querySelector('.popup__input_add_poster')
const addDescription = document.querySelector('.popup__textarea_description')
const addActors = document.querySelector('.popup__textarea_actors')
const form = document.querySelector('.form')
const initialCards = [
  {
    title: 'Martian',
    year: '2016',
    country: 'USA',
    genre: 'Fantasy',
    poster: 'https://horrorzone.ru/uploads/_gallery/48145/the-martian00.jpg',
    description: `Mars mission Ares-2 in the process was forced to urgently leave the planet because of the impending sandstorm. Engineer and Biolog mark Watney suffered an injury suit during a sand storm. The mission,considering him dead...`,
    actors: `Aksel Hennie, Chiwetel Ejiofor, Jeff Daniels, Jessica Chastain, Kate Mara, Kristen Wiig, Matt Damon, Michael Peña, Sean Bean, Sebastian Stan`
  },
  {
    title: 'Martian',
    year: '2016',
    country: 'USA',
    genre: 'Fantasy',
    poster: 'https://horrorzone.ru/uploads/_gallery/48145/the-martian00.jpg',
    description: `Mars mission Ares-2 in the process was forced to urgently leave the planet because of the impending sandstorm. Engineer and Biolog mark Watney suffered an injury suit during a sand storm. The mission,considering him dead...`,
    actors: `Aksel Hennie, Chiwetel Ejiofor, Jeff Daniels, Jessica Chastain, Kate Mara, Kristen Wiig, Matt Damon, Michael Peña, Sean Bean, Sebastian Stan`
  }
];

function popupToggle (popup) {
  enableValidation (validationConfig)
  popup.classList.toggle('popup_active')
}

function popupClose (popup) {
  popup.classList.remove('popup_active')
}

function popupOpen (popup) {
  popup.classList.add('popup_active')
}

headerButton.addEventListener('click', ()=> {
  headerButton.classList.toggle('header__button_active')
  popupToggle (popup)
})

cancel.addEventListener('click', ()=> {
  popupClose (popup)
  headerButton.classList.remove('header__button_active')
})

form.addEventListener('submit', addNewItem)

function renderList () {
  const listItems = initialCards.map(composeItem)
  movies.append(...listItems)
}

function composeItem (item) {
  const newItem = template.content.cloneNode(true)
  const titleElement = newItem.querySelector('.movie__title')
  const yearElement = newItem.querySelector('.movie__items_year')
  const countryElement = newItem.querySelector('.movie__items_country')
  const genreElement = newItem.querySelector('.movie__items_genre')
  const posterElement = newItem.querySelector('.movie__img')
  const descriptionElement = newItem.querySelector('.movie__about')
  const actorsElement = newItem.querySelector('.movie__items_actors')
  const moviePopup = newItem.querySelector('.movie__popup')
  const movieCLick = newItem.querySelector('.movie__comments-link')
  const cancleButton = newItem.querySelector('.button_type_cancel')
  const popupFormInput = newItem.querySelector('.movie__input')
  const movieForm = newItem.querySelector('.movie__form')
  const span = newItem.querySelector('.movie__span')
  const newComment = newItem.querySelectorAll('.movie__comment')
  const edit = newItem.querySelector('.edit')
  const popup = newItem.querySelector('.popup')
  const form = newItem.querySelector('.form')
  const addTitle = newItem.querySelector('.popup__input_add_title')
  const addYear = newItem.querySelector('.popup__input_add_year')
  const addCountry = newItem.querySelector('.popup__input_add_country')
  const addGenre = newItem.querySelector('.popup__input_add_genre')
  const addPoster = newItem.querySelector('.popup__input_add_poster')
  const addDescription = newItem.querySelector('.popup__textarea_description')
  const addActors = newItem.querySelector('.popup__textarea_actors')
  const cancel = newItem.querySelector('.cancel')
  
  span.textContent = newComment.length
  titleElement.textContent = item.title
  yearElement.textContent = item.year
  countryElement.textContent = item.country
  genreElement.textContent = item.genre
  posterElement.src = item.poster
  descriptionElement.textContent = item.description
  actorsElement.textContent = item.actors
  
  movieCLick.addEventListener('click', ()=> {
    moviePopup.classList.toggle('movie__popup_active')
    movieCLick.classList.toggle('movie__comments-link_active')
  })

  movieForm.addEventListener('submit', (evt)=> {
    evt.preventDefault()
    const comment = document.createElement('p')
    comment.classList.add('movie__comment')
    comment.textContent = popupFormInput.value
    moviePopup.prepend(comment)
    let num = Number(span.textContent)
    span.textContent = num + 1
    movieForm.reset()
  })

  edit.addEventListener('click', ()=> {
    enableValidation (validationConfig)
    popupOpen (popup)
    addTitle.value = titleElement.textContent
    addYear.value = yearElement.textContent
    addCountry.value = countryElement.textContent
    addGenre.value = genreElement.textContent
    addDescription.value = descriptionElement.textContent
    addActors.value = actorsElement.textContent
    addPoster.value = posterElement.src
  })

  form.addEventListener('submit', (evt)=> {
    evt.preventDefault()
    titleElement.textContent = addTitle.value
    yearElement.textContent = addYear.value
    countryElement.textContent = addCountry.value
    genreElement.textContent = addGenre.value
    descriptionElement.textContent = addDescription.value
    actorsElement.textContent = addActors.value
    posterElement.src = addPoster.value
    popupClose (popup)
  })

  cancel.addEventListener('click', ()=> {
    popupClose (popup)
  })

  cancleButton.addEventListener('click', removeItem)

  return newItem
}

function addNewItem(evt) {
  evt.preventDefault()
  const inputTitle = addTitle.value
  const inputYear = addYear.value
  const inputCountry = addCountry.value
  const inputGenre = addGenre.value
  const inputPoster = addPoster.value
  const inputDescription = addDescription.value
  const inputActors = addActors.value
  const newItem = composeItem({ title: inputTitle, year: inputYear, country: inputCountry, genre: inputGenre, poster: inputPoster, description: inputDescription, actors: inputActors})
  movies.prepend(newItem)
  popup.classList.remove('popup_active')
  form.reset()
}

function removeItem(evt) {
  evt.target.closest('.movie').remove()
}

renderList ()

let itemsArray = []
localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))