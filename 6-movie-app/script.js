const TOP_250 = 'https://imdb-api.com/en/API/Top250Movies/k_d8el0rjq'
const MOST_POPULAR = 'https://imdb-api.com/en/API/MostPopularMovies/k_d8el0rjq'
const COMMING_SOON = 'https://imdb-api.com/en/API/ComingSoon/k_d8el0rjq'
const BOX_OFFICE = 'https://imdb-api.com/en/API/BoxOffice/k_d8el0rjq'
const BOX_OFFICE_ALL_TIME = 'https://imdb-api.com/en/API/BoxOfficeAllTime/k_d8el0rjq'
const SEARCH_API = 'https://imdb-api.com/API/AdvancedSearch/k_d8el0rjq/?title='

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const button0 = document.querySelectorAll('nav button')[0];
const button1 = document.querySelectorAll('nav button')[1];
const button2 = document.querySelectorAll('nav button')[2];
const button3 = document.querySelectorAll('nav button')[3];
const button4 = document.querySelectorAll('nav button')[4];
const select = document.querySelector('nav select');

async function getMovies(url) {

    const resp = await fetch(url);
    const respData = await resp.json();

    // console.log(respData);

    let options = '';

    for (let i = 1; i <= respData.length; i++) {
        options = options + `<option value='${i * 10}'>${i * 10}</option>`
    }

    select.innerHTML = options

    showMovies(respData.items.slice(0, 10));
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <div class='inner'>
                <img src="${movie.image}" alt="${movie.title}" />
                <div class="movie-info">
                    <div>
                        <h5>Rank : ${movie.rank}</h5>
                        <span class="${getClassByRate(movie.imDbRating)}">${movie.imDbRating}</span>
                    </div>
                    <h4>${movie.title}</h4>
                </div>
                <div class="overview">
                    <h3>Year : ${movie.year}</h3>
                    <h3>Crew :</h3>
                    <p>${movie.crew}</p>
                </div>
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getSearched(SEARCH_API + searchTerm);

        search.value = "";
    }
});

async function getSearched(url) {

    const resp = await fetch(url);
    const respData = await resp.json();

    // console.log(respData);

    showSearched(respData.results.slice(0,10));
}

function showSearched(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <div class='inner'>
                <img src="${movie.image}" alt="${movie.title}" />
                <div class="movie-info">
                    <h4>${movie.title}</h4>
                    <span class="${getClassByRate(movie.imDbRating)}">${movie.imDbRating}</span>
                </div>
                <div class="overview">
                    <h3>Rating :</h3>
                    ${movie.imDbRating}
                    <h3>Stars :</h3>
                    ${movie.stars}
                    <h3>Plot :</h3>
                    ${movie.plot}
                </div>
            </div>
        `;

        main.appendChild(movieEl);
    });
}

button0.addEventListener('click', () => {
    getMovies(TOP_250)
})

button1.addEventListener('click', () => {
    getMovies(MOST_POPULAR)
})

button2.addEventListener('click', () => {
    getMovies(COMMING_SOON)
})

button3.addEventListener('click', () => {
    getMovies(BOX_OFFICE)
})

button4.addEventListener('click', () => {
    getMovies(BOX_OFFICE_ALL_TIME)
})