const searchinput=document.getElementById("searchInput");
searchinput.addEventListener("keypress",function (e){
    if(e.key ==="Enter"){
         const query = searchinput.value.trim();//trim removes whitespaces form the both starting and ending
          if (query) {
      fetchNews(query);
      }
    }
});


fun