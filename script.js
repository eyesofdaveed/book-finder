const searchInput = document.querySelector("#searchInput");
const outputField = document.querySelector(".results");
const titleCheck = document.querySelector("#title");
const authorCheck = document.querySelector("#author");

const APIKey = ":AIzaSyAu_g6de8xQCNXDIJrAB6K0Pd8vrSn9DDA";
var api_url = "https://www.googleapis.com/books/v1/volumes?q=";

searchInput.addEventListener("change", (event) => {
  let searchTerm = event.target.value.trim();
  let searchOption;

  /* Search option: whether by title or author, or by default */
  if (titleCheck.checked) {
    searchOption = "+intitle";
  } else if (authorCheck.checked) {
    searchOption = "+inauthor";
  } else {
    searchOption = "";
  }

  searchTerm = searchTerm.replace(" ", "+");
  var requestUrl = api_url + searchTerm + searchOption;

  axios
    .get(requestUrl)
    .then((response) => {
      let searchResults = response.data.items;
      console.log(searchResults)
      searchResults.forEach(element => {
          bookCard = document.createElement('div');
          bookCard.id = "bookCard";
          bookTitle = element.volumeInfo.title;
          bookAuthor = element.volumeInfo.authors;
          bookDate = element.volumeInfo.publishedDate.split("-")[0];
          bookImage = element.volumeInfo.imageLinks.thumbnail;
          bookLink = element.volumeInfo.infoLink;
          bookHTML = `<a href=${bookLink}>
          <div class="bookTitle"><h3>${element.volumeInfo.title}</h3></div>
          <div class="bookImage"><img src=${bookImage} alt=${bookTitle}></img></div>
          <p>${bookAuthor}</p>
          <p>${bookDate}</p></a>`;
          bookCard.innerHTML = bookHTML;
          outputField.append(bookCard);
      });
    })
    .catch((err) => {
        outputField.innerHTML = "<h3>No result found, try again!</h3>"
        console.log("Couln't fetch any result from the API")
    });
});
