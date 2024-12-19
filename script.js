const url = "https://api.potterdb.com/v1/movies/";

const movieImage = document.querySelectorAll(".movie-card img");
const movieLinks = document.querySelectorAll(".moviesLink");
const linkToMovies = document.querySelectorAll(".link-to-movie-page");

const booksPageLink = document.querySelector("#books");
const spellsPageLink = document.querySelector("#spells");
const charactersPageLink = document.querySelector("#characters");
const potionsPageLink = document.querySelector("#potions");

const allContainer = [
  document.querySelector("header"),
  document.querySelector("main"),
  document.querySelector("footer"),
];

allContainer.forEach((container) => {
  container.style.display = "none";
});
const loader = document.querySelector(".loader");

(async function Start() {
  const jsonData = await axios.get(url);

  const datas = jsonData.data.data;
  console.log(datas);

  //    console.log(movieImage);

  datas.forEach((data, idx) => {
    // console.log(data.attributes.poster);

    movieImage[idx].src = data.attributes.poster;
    console.log(data.id);

    movieLinks[idx].href = `movies/movie.html?page=${data.id}`;
    linkToMovies[idx].href = `movies/movie.html?page=${data.id}`;
    // movieLinks[idx].target = "_blank";
    // linkToMovies[idx].target = "_blank";
  });
})().then(() => {
  allContainer.forEach((container) => {
    container.style.display = "block";
  });
  loader.style.display = "none";
});
