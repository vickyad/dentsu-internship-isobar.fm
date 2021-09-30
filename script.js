const artistsList = [{ name: 'Pink Floyd', points: 41.1 }, { name: 'Beyoncé', points: 150.1 }, { name: 'Cardi B', points: 197.8 }, { name: 'Pink', points: 48.4 }, { name: 'Billie Eilish', points: 82.4 }]

const artistsListWrapper = document.querySelector('.artists-list')
const bottomHeader = document.querySelector('.bottom-header')
const orderByButton = document.getElementById('order-by-button')
const orderByOptionsDialog = document.querySelector('.order-by-options')
const searchResultsDisplayer = document.getElementById('results-obtained')
const alphabeticalOrderButton = document.getElementById('alphabetical-order-button')
const popularityOrderButton = document.getElementById('popularity-order-button')

let currentListOnDisplay = [...artistsList]

const displayArtists = () => {
    artistsListWrapper.innerHTML = ''
    currentListOnDisplay.forEach((artistObject) => {
        artistsListWrapper.innerHTML += `
        <a href="artist_profile/index.html" class="artist-card">
        <img alt="" src="assets/artists/pink-floyd.jpg">
        <div class="text-wrapper">
        <p class="artist-name">${artistObject.name}</p>
        <span class="artist-plays">${artistObject.points} pontos</span>
        </div>
        </a>
        <hr class="item-divider">
        `
    })
    searchResultsDisplayer.innerText = `${currentListOnDisplay.length} resultado(s) obtido(s)`
}

const handleOrderByButton = () => {
    bottomHeader.classList.toggle('opened-dialog')
    orderByButton.classList.toggle('opened-dialog')
    artistsListWrapper.classList.toggle('opened-dialog')
    orderByOptionsDialog.classList.toggle('opened-dialog')
}

const readMoreButton = document.querySelector('.read-more-button')
const artistDescriptionWrapper = document.querySelector('.artist-description .text-wrapper')
const readMoreSymbol = document.getElementById('button-symbol')
const handleReadMore = () => {
    readMoreButton.classList.toggle('read-more-opened')
    artistDescriptionWrapper.classList.toggle('read-more-opened')
    readMoreSymbol.innerText === '+' ? readMoreSymbol.innerText = '-' : readMoreSymbol.innerText = '+'
}

const searchBar = document.getElementById('search-bar-input')
searchBar.addEventListener('keyup', (event) => {
    const stringToSearch = event.target.value.toLowerCase()
    currentListOnDisplay = artists.filter((name) => {
        return name.toLowerCase().includes(stringToSearch)
    })
    bottomHeader.classList.add('show-search-results')
    artistsListWrapper.classList.add('show-search-results')
    currentListOnDisplay.length > 0 ? displayArtists() : displayNoResultsFound()
})

const displayNoResultsFound = () => {
    bottomHeader.classList.remove('show-search-results')
    artistsListWrapper.classList.remove('show-search-results')
    artistsListWrapper.innerHTML = '<div class="no-results-search"><span>Sem resultados...</span><img src="assets/no_results.png"></div>'
    searchResultsDisplayer.innerText = `${currentListOnDisplay.length} resultado(s) obtido(s)`
}

document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('search-bar-input')) {
        bottomHeader.classList.remove('show-search-results')
        artistsListWrapper.classList.remove('show-search-results')
    } else {
        bottomHeader.classList.add('show-search-results')
        artistsListWrapper.classList.add('show-search-results')
    }
})

const orderByAlphabeticalOrder = () => {
    alphabeticalOrderButton.classList.add('selected')
    popularityOrderButton.classList.remove('selected')
    currentListOnDisplay.sort((a, b) => {
        const textA = a.name.toLowerCase()
        const textB = b.name.toLowerCase()

        if (textA > textB) {
            return 1
        } else if (textA < textB) {
            return -1
        } else {
            return 0
        }
    })
    displayArtists()
}

const orderByPopularity = () => {
    alphabeticalOrderButton.classList.remove('selected')
    popularityOrderButton.classList.add('selected')
    currentListOnDisplay.sort((a, b) => {
        if (a.points < b.points) {
            return 1
        } else if (a.points > b.points) {
            return -1
        } else {
            return 0
        }
    })
    displayArtists()
}

orderByPopularity()
displayArtists()