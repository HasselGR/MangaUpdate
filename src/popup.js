import browser from 'webextension-polyfill'

var wrap = document.getElementById("newChapter");
var chapter = document.createElement("h2")
var button = document.getElementById("go")
let last = browser.storage.sync.get("lastChapter");


const executed = setInterval (()=>{
    if(wrap){
        clearInterval(executed)
        last.then((item) => {
            let name= document.createTextNode(item.lastChapter);
            chapter.appendChild(name);
            wrap.appendChild(chapter);
        })
    }
}, 100)


button.addEventListener("click", function(){
    let page = browser.storage.sync.get('website');
    page.then((data) => {
        var site = browser.tabs.create({
            index:0,
            url: data.website,
            active:true
        })
    })
})