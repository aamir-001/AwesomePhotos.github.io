
var client_id="dPFXJ0iwxzhBasAUmX4rbw1ucchSK4LOnIOgK2mO6mY";



var url="https://api.unsplash.com/photos?client_id="+client_id+"&per_page=30"

wrapper=document.getElementById("wrapper");
imageContainer=document.getElementsByClassName("imageContainer")[0];

if(window.localStorage.getItem("cachedResponse")!=null){

    showImages(JSON.parse(window.localStorage.getItem("cachedResponse")));
    preLoader=document.getElementById("preLoader");
    preLoader.style.display="none";
}

function refresh(){
    pageNo=Math.floor(Math.random() * 200)
    url="https://api.unsplash.com/photos?client_id="+client_id+"&per_page=30&page="+pageNo;
    getResponse(url)
}

function changeType(RadioInput){

    type=this.value;
    pageNo=Math.floor(Math.random() * 200)
    url="https://api.unsplash.com/photos?client_id="+client_id+"&per_page=30&page="+pageNo+"&order_by"+type;
    getResponse(url)
    

}

getResponse(url)

function getResponse(url){

    fetch(url)
    .then(data=>{
        return data.json()
    })
    .then(json=>{
        //console.log(json)
        
        wrapper.innerHTML='' //to remove old inages
        showImages(json)

        window.localStorage.setItem("cachedResponse",JSON.stringify(json)); // caching response
        
        //console.log(JSON.parse(window.localStorage.getItem("cachedResponse")))
        
        preLoader=document.getElementById("preLoader");
        preLoader.style.display="none";

    })
    .catch(error => {
        alert("problem loading new data")
        showImages(JSON.parse(window.localStorage.getItem("cachedResponse")));
    });

}


    function showImages(json){
        console.log("***")
        
        json.forEach(element => {

            //console.log(element)
            clone=imageContainer.cloneNode(true);
            
            clone.style.removeProperty('display');
            image=clone.getElementsByClassName("thumbnailimage")[0];
            image.setAttribute("src",element.urls.thumb)

            iLink=clone.getElementsByClassName("imageLink")[0];
            iLink.setAttribute("href",element.urls.full)

            authorName=clone.getElementsByClassName("authorName")[0];
            authorName.innerText=element.user.first_name;

            authorProfile=clone.getElementsByClassName("authorProfile")[0];
            authorProfile.setAttribute("href",element.user.social.portfolio_url);

            description=clone.getElementsByClassName("description")[0];
            if(element.description!=null){
                description.innerText=element.description
            }
            
            wrapper.appendChild(clone)
        });

        return
    }