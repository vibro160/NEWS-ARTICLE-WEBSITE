const searchinput=document.getElementById("searchInput");
searchinput.addEventListener("keypress",function (e){
    if(e.key ==="Enter"){
         const query = searchinput.value.trim();//trim removes whitespaces form the both starting and ending
          if (query) {
      fetchNews(query);
      }
    }
});


function fetchNews(query){
    const apikey='e2b2fe87b91f441ab0e1df7c45e1c2c2';
    const Query = document.getElementById("searchInput").value.trim();
   const url = `https://newsapi.org/v2/everything?q=${Query}&apiKey=${apikey}`;
    fetch(url)
    .then(response => response.json()) //coverts into readable format 
    .then(data => {
      const articles = data.articles;
      displayNews(articles);
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });

}


const newscontainer=document.getElementById("newscontainer");