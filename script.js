const searchinput = document.getElementById("searchInput");
searchinput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const query = searchinput.value.trim();//trim removes whitespaces form the both starting and ending
    if (query) {
      fetchNews(query);
    }
  }
});


//this below programme can not clear the old news

// function fetchNews(query) {
 
//   const apikey = 'e2b2fe87b91f441ab0e1df7c45e1c2c2';
//   // const Query = document.getElementById("searchInput").value.trim();
//   const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}`;
//   fetch(url)
//     .then(response => response.json()) //coverts into readable format 
//     .then(data => {
   

//   const newscontainer = document.getElementById("newscontainer");
//   data.articles.forEach(articles => {
//     const newscard = document.createElement("div");
//     newscard.classList.add("news-card");
//     newscard.innerHTML = `
//   <h1>${articles.title}</h1>
//   <p>${articles.description || "No Description "}</p>
//    <a href="${articles.url}" >Read more</a> `;// target="_blank" makes the link open in another tab
//     newscontainer.appendChild(newscard);

//   });

// })
//     .catch (error => {
//   console.error('Error fetching news:', error);
// });

// }
function fetchNews(query) {
  newscontainer.innerHTML = "<p style='color:white;'>Loading...</p>"; // clear and show loading
 const apikey = 'e2b2fe87b91f441ab0e1df7c45e1c2c2';
 const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => { //data → is the whole response object.
      if (Array.isArray(data.articles) && data.articles.length > 0) {//data.articles → is an array containing multiple article objects.


        displayArticles(data.articles);
      } else {
        newscontainer.innerHTML = "<p style='color:white;'>No results found.</p>";
      }
    })
    .catch(err => {
      newscontainer.innerHTML = "<p style='color:white;'>Error fetching news.</p>";
      console.error("Error:", err);
    });
}
function displayArticles(articles) {
  newscontainer.innerHTML = ""; // Clear old news
  articles.forEach(article => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    newsCard.innerHTML = `
      <h1>${article.title}</h1>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newscontainer.appendChild(newsCard);
  });
}

