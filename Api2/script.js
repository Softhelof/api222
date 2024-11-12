const apiKey = 'e195d0248d68ebe9893faddecae896b8'; 
const baseAPI = 'https://api.themoviedb.org';


document.querySelectorAll('nav button').forEach((menuOption) => {
  menuOption.addEventListener('click', function() {
      const category = this.getAttribute('data-category'); 
      //console.log(category);
      
      fetchMovies(category);
      const selectedMenuOption = document.querySelector('nav button.selected');
      if (selectedMenuOption !== null) {
          selectedMenuOption.classList.remove('selected');
      }
      this.classList.add('selected');
  });
});


async function fetchMovies(category) {
  try {
    console.log(`Fetching category: ${category}`); 
    const response = await fetch(`${baseAPI}/3/movie/${category}?api_key=${apiKey}`);
    console.log(response);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    
    await displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Failed to fetch movie data. Please try again.");
  }
}


async function displayMovies(movies) {
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = ''; 

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieImage = document.createElement('img');
    movieImage.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    movieImage.alt = movie.title;

    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.title;

    const movieOverview = document.createElement('p');
    movieOverview.textContent = movie.overview;

    const movieReleaseDate = document.createElement('p');
    movieReleaseDate.classList.add('release-date');
    movieReleaseDate.textContent = `Release date: ${movie.release_date}`;

    movieDetails.appendChild(movieTitle);
    movieDetails.appendChild(movieOverview);
    movieDetails.appendChild(movieReleaseDate);
    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieDetails);

    movieList.appendChild(movieCard);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetchMovies('now_playing');
});