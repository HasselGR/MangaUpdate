import browser from 'webextension-polyfill'

var wrap = document.getElementById("newChapter");
var chapter = document.createElement("h1")

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
