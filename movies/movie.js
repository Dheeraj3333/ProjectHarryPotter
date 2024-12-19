const queryString = new URLSearchParams(window.location.search);
const MovieHead = document.querySelector("h1");
const copyRight = document.querySelector(".copyright");
const moviename = document.querySelectorAll(".moviename");
const aboutMovie = document.querySelector(".about-movie");
const aboutTeam = document.querySelector(".about-team");
const poster = document.querySelector(".poster");

const allContainer = [
  document.querySelector("header"),
  document.querySelector("main"),
  document.querySelector("footer"),
];

allContainer.forEach((container) => {
  container.style.display = "none";
});
const loader = document.querySelector(".loader");

const endPoint = queryString.get("page");
const baseUrl = "https://api.potterdb.com/v1/movies/";

(async function start() {
  const jsonData = await axios.get(baseUrl + endPoint);
  const movieData = jsonData.data.data;
  console.log(movieData);

  const movieTitle = movieData.attributes.slug
    .replaceAll("-", " ")
    .toUpperCase();

  // writing movie name to every moviename span
  moviename.forEach((movie, idx) => {
    movie.innerHTML = movieTitle;
  });

  // h1 in webpage
  MovieHead.innerHTML = movieTitle;

  // title of webpage
  document.querySelector("title").innerHTML = movieTitle;

  // setting up a strinf which has multiple names.
  let producersString = "";
  movieData.attributes.producers.forEach((Name, idx) => {
    if (idx == movieData.attributes.producers.length - 1) {
      producersString = producersString + " and " + Name;
    } else if (Name) {
      producersString = producersString + ", " + Name;
    }
  });

  // setting about para for webpage

  aboutMovie.innerHTML = `${movieTitle} was released on ${movieData.attributes.release_date}. The film has a runtime of ${movieData.attributes.running_time} and received a ${movieData.attributes.rating} rating. It was a major box office success, grossing over ${movieData.attributes.box_office} worldwide against a budget of ${movieData.attributes.budget}. The movie is widely regarded as one of the best science fiction films of its era, praised for its complex plot and stunning visual effects.`;

  aboutTeam.innerHTML = `The film was directed by ${movieData.attributes.directors}. And this movie was produced by ${producersString}. The cinematography was handled by ${movieData.attributes.cinematographers[0]}, while the editing was done by ${movieData.attributes.editors[0]}. The film's music was composed by ${movieData.attributes.music_composers[0]}. It was distributed by Warner Bros. Pictures, contributing to its widespread global success.`;

  // setting poster of movie
  poster.src = movieData.attributes.poster;
  poster.alt = movieTitle;

  // setting copy right info for footer
  copyRight.innerHTML = ` &copy; All right reserved by Team Harry Potter`;

  poster.style.height = "485px";
})().then(() => {
  allContainer.forEach((container) => {
    container.style.display = "block";
  });
  loader.style.display = "none";
});
