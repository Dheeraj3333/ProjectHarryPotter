const url = "https://api.potterdb.com/v1/potions/";

const allContainer = [
  document.querySelector("header"),
  document.querySelector("main"),
  document.querySelector("footer"),
];

allContainer.forEach((container) => {
  container.style.display = "none";
});
const loader = document.querySelector(".loader");

(async function start() {
  const jsonData = await axios.get(url);

  // retrieving data array
  const books = jsonData.data.data;
  //   console.log(books);

  // looping over data array
  books.forEach((book, idx) => {
    console.log(book);
  });
})().then(() => {
  allContainer.forEach((container) => {
    container.style.display = "block";
  });
  loader.style.display = "none";
});
