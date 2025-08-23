const searchinput = document.getElementById("searchInput");
const newscontainer = document.getElementById("newscontainer");
// const imageUrl = article.urlToImage || "default.jpg"; // fallback image


searchinput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const query = searchinput.value.trim();
    if (query) {
      fetchNews(query);
    }
  }
});

function fetchNews(query) {
  newscontainer.innerHTML = "<p style='color:white;'>Loading...</p>";
  const apikey = 'e2b2fe87b91f441ab0e1df7c45e1c2c2';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apikey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data.articles) && data.articles.length > 0) {
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
  newscontainer.innerHTML = "";
  articles.forEach(article => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    const author = article.author ? article.author : "unknown author";
    const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
      : "Date not available";
    newsCard.innerHTML = `
      <h1>${article.title}</h1>
      <p>${article.description || "No description available."}</p>
      <p><strong>Author:</strong> ${author}</p>
      <p><strong>Published:</strong> ${date}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newscontainer.appendChild(newsCard);
  });
}

window.onload = () => {
  console.log("Window loaded  fetching default news");
  const defaultQuery = "technology"; // safer default
  fetchNews(defaultQuery);
};

function fetchCategoryNews(category) {
  const apiKey = 'e2b2fe87b91f441ab0e1df7c45e1c2c2';
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status === "ok") {
        displayArticles(data.articles);
      } else {
        console.error("API error:", data);
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}



const themeToggle = document.getElementById("theme-toggle");

// Load theme from localStorage if available
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ ";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️ ";
   document.getElementById("theme-toggle").classlist.add("light-mode");

  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙 ";
     document.getElementById("theme-toggle").classlist.add("ddark-mode");
  }
});


document.getElementById("saveSources").addEventListener("click",()=>{
  const checkboxes=document.querySelectorAll("#sources input[type='checkbox']");
  let selectedsource=[];
  checkboxes.forEach(checkbox => {
    if(checkbox.checked){
      selectedsource.push(checkbox.value);
    
    }
  });
    localStorage.setItem("favouritesources",JSON.stringify(selectedsource));
     alert("Sources saved!");
})


//fetch news from saved sources

function fetchnewsfromsavedsources(){

const sources=JSON.parse(localStorage.getItem("favouritesources")) || [];
// || []--> make sure we get a null array 

if(sources.length==0){
alert("NO SOURCES SELECTED");
return;
}
const apiKey = 'e2b2fe87b91f441ab0e1df7c45e1c2c2';
const url = `https://newsapi.org/v2/top-headlines?country=us&category=${sources.join(",")}&apiKey=${apiKey}`;


fetch(url)
.then(res=>res.JSON())
.then(data=>{
  if(data.articles.length===0){
    console.log("NO NEWS FOUND")

  }else{
    displayArticles(data.articles);
  }
})
.catch(err=>console.error("Error Fetching NEws",err));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchnewsfromsavedsources();
});




