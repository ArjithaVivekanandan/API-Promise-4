//Search Button and keyboard event handling

document.getElementById("search_submit").innerHTML="Search";
document.getElementById("search_text").addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    
    apiCall();
  }
});


//Error Handling
var Missing =document.createElement("h2")
Missing.setAttribute("class","text-danger");
Missing.innerHTML="Not Available!!";


//Api Search for Articles in Newyork Times
 async function apiCall()
 {
   content.innerHTML="";
  var search_str=document.getElementById("search_text").value;
  var data= await (await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search_str+"&api-key=6POmoe9CA21Gy7RhacgPSr7MXfjT5yFZ")).json();
  if(data.response.docs.length > 0)
  {
    console.log(data);
  return handleResponse(data);
 
  }
  else
  document.getElementById("content").append(Missing);  
 }

 function handleResponse(data) {
  
  try{
        
        data.response.docs.forEach((item)=>{
        
            
        var card = document.createElement("div");
        card.setAttribute("class","card");

        var head=document.createElement("h4");
        head.setAttribute("class","card-header text-danger");
        head.innerHTML=item.headline.main;

        var Snippet=document.createElement("h5");
        Snippet.setAttribute("class","card-title text-dark p-2");
        Snippet.innerHTML="<br>"+item.snippet;

        var datepb=document.createElement("h6");
        datepb.setAttribute("class","text-muted p-2");
        datepb.innerHTML=item.pub_date;

        var URL_Article=document.createElement("a");
        URL_Article.setAttribute("class","h6 p-2");
        URL_Article.setAttribute("target","_blank");
        URL_Article.setAttribute("href",item.web_url)
        URL_Article.innerHTML="Read More";

        var br=document.createElement("br");
        
        card.append(head,Snippet,datepb,URL_Article);
        document.getElementById("content").append(card,br);
        
        });
    }
 
  
  catch{
    var error_me=document.createElement("div");
    error_me.setAttribute("class","text-danger h2");
    error_me.innerHTML="Oooops..No Records Found!!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }
  
}
